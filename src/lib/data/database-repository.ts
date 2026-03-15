import 'server-only'
import { eq, desc, sql, and } from 'drizzle-orm'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import type { IPostRepository } from './repository'
import type {
  Post,
  PostWithContent,
  PostQueryOptions,
  Tag,
  GraphData,
  GraphNode,
  GraphLink,
  StudyRecord,
  StatsSummary,
  CategoryStats,
  Category,
} from './types'
import { CATEGORIES } from './types'
import { tagToSlug } from '@/lib/utils/slug'
import { calculateReadingTime, countWords } from '@/lib/utils/reading-time'

// DB row → Post 변환
function rowToPost(row: typeof posts.$inferSelect): Post {
  return {
    slug: row.slug,
    category: row.category as Category,
    frontmatter: {
      title: row.title,
      date: row.postDate,
      category: row.category as Category,
      tags: row.tags ?? [],
      excerpt: row.excerpt,
      draft: row.draft,
      difficulty: row.difficulty as Post['frontmatter']['difficulty'],
      language: row.languageNote ?? undefined,
      studyDuration: row.studyDuration ?? undefined,
    },
    readingTime: calculateReadingTime(row.content),
    wordCount: countWords(row.content),
    filePath: '',
  }
}

function rowToPostWithContent(row: typeof posts.$inferSelect): PostWithContent {
  return { ...rowToPost(row), rawContent: row.content }
}

export class DatabaseRepository implements IPostRepository {
  async getAllPosts(options: PostQueryOptions = {}): Promise<Post[]> {
    const conditions = []

    if (!options.includeDrafts) {
      conditions.push(eq(posts.draft, false))
    }
    if (options.category) {
      conditions.push(eq(posts.category, options.category))
    }
    if (options.tag) {
      // Postgres array contains operator
      conditions.push(sql`${posts.tags} @> ARRAY[${options.tag}]::text[]`)
    }

    const rows = await db
      .select()
      .from(posts)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(posts.postDate))

    let result = rows.map(rowToPost)

    if (options.offset) result = result.slice(options.offset)
    if (options.limit) result = result.slice(0, options.limit)

    return result
  }

  async getPostBySlug(category: Category, slug: string): Promise<PostWithContent | null> {
    const rows = await db
      .select()
      .from(posts)
      .where(and(eq(posts.category, category), eq(posts.slug, slug)))
      .limit(1)

    return rows[0] ? rowToPostWithContent(rows[0]) : null
  }

  async getSlugsByCategory(category: Category): Promise<string[]> {
    const rows = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(and(eq(posts.category, category), eq(posts.draft, false)))

    return rows.map((r) => r.slug)
  }

  async getAllTags(): Promise<Tag[]> {
    const allPosts = await this.getAllPosts()
    const tagMap = new Map<string, { count: number; categories: Set<Category> }>()

    for (const post of allPosts) {
      for (const tag of post.frontmatter.tags) {
        const existing = tagMap.get(tag)
        if (existing) {
          existing.count++
          existing.categories.add(post.category)
        } else {
          tagMap.set(tag, { count: 1, categories: new Set([post.category]) })
        }
      }
    }

    return Array.from(tagMap.entries())
      .map(([name, { count, categories }]) => ({
        name,
        slug: tagToSlug(name),
        count,
        categories: Array.from(categories),
      }))
      .sort((a, b) => b.count - a.count)
  }

  async getPostsByTag(tagName: string, options: PostQueryOptions = {}): Promise<Post[]> {
    return this.getAllPosts({ ...options, tag: tagName })
  }

  async getTagGraphData(): Promise<GraphData> {
    const allPosts = await this.getAllPosts()
    const tagMeta = new Map<string, { count: number; categories: Set<Category> }>()
    const coOccurrence = new Map<string, number>()

    for (const post of allPosts) {
      const tags = post.frontmatter.tags
      for (const tag of tags) {
        const existing = tagMeta.get(tag)
        if (existing) {
          existing.count++
          existing.categories.add(post.category)
        } else {
          tagMeta.set(tag, { count: 1, categories: new Set([post.category]) })
        }
      }
      for (let i = 0; i < tags.length; i++) {
        for (let j = i + 1; j < tags.length; j++) {
          const key = [tags[i], tags[j]].sort().join('||')
          coOccurrence.set(key, (coOccurrence.get(key) ?? 0) + 1)
        }
      }
    }

    const nodes: GraphNode[] = Array.from(tagMeta.entries()).map(([name, { count, categories }]) => ({
      id: name,
      label: name,
      count,
      categories: Array.from(categories),
      group: Array.from(categories)[0],
    }))

    const links: GraphLink[] = Array.from(coOccurrence.entries()).map(([key, weight]) => {
      const [source, target] = key.split('||')
      return { source, target, weight }
    })

    return { nodes, links }
  }

  async getStudyRecords(): Promise<StudyRecord[]> {
    const allPosts = await this.getAllPosts()
    return allPosts
      .filter((p) => p.frontmatter.studyDuration)
      .map((p) => ({
        date: p.frontmatter.date,
        category: p.category,
        slug: p.slug,
        durationMinutes: p.frontmatter.studyDuration!,
        wordCount: p.wordCount,
      }))
  }

  async getStatsSummary(): Promise<StatsSummary> {
    const allPosts = await this.getAllPosts()
    const records = await this.getStudyRecords()
    const tags = await this.getAllTags()

    const totalStudyMinutes = records.reduce((sum, r) => sum + r.durationMinutes, 0)

    const studyByDate: Record<string, number> = {}
    for (const r of records) {
      studyByDate[r.date] = (studyByDate[r.date] ?? 0) + r.durationMinutes
    }

    // 연속 학습일 계산
    const dates = Object.keys(studyByDate).sort()
    let longestStreak = 0
    let currentStreak = 0
    let prevDate: Date | null = null

    for (const dateStr of dates) {
      const date = new Date(dateStr)
      if (prevDate) {
        const diff = (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        currentStreak = diff === 1 ? currentStreak + 1 : 1
      } else {
        currentStreak = 1
      }
      longestStreak = Math.max(longestStreak, currentStreak)
      prevDate = date
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (prevDate) {
      const diffDays = (today.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      if (diffDays > 1) currentStreak = 0
    }

    const postsPerCategory: CategoryStats[] = CATEGORIES.map((category) => {
      const catPosts = allPosts.filter((p) => p.category === category)
      const catRecords = records.filter((r) => r.category === category)
      const catTags = new Set(catPosts.flatMap((p) => p.frontmatter.tags))
      return {
        category,
        postCount: catPosts.length,
        totalStudyMinutes: catRecords.reduce((sum, r) => sum + r.durationMinutes, 0),
        totalWordCount: catPosts.reduce((sum, p) => sum + p.wordCount, 0),
        uniqueTagCount: catTags.size,
      }
    })

    return {
      totalPosts: allPosts.length,
      totalStudyMinutes,
      longestStreak,
      currentStreak,
      postsPerCategory,
      studyByDate,
      mostUsedTags: tags.slice(0, 20).map((t) => ({ tag: t.name, count: t.count })),
    }
  }
}
