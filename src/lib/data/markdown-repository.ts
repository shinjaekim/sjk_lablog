import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
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
  PostFrontmatter,
} from './types'
import { CATEGORIES } from './types'
import { filenameToSlug, tagToSlug } from '../utils/slug'
import { calculateReadingTime, countWords } from '../utils/reading-time'
import { sortByDate } from '../utils/date'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ─── File system helpers ──────────────────────────────────────────────────────

function getFilesInCategory(category: Category): string[] {
  const dir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
}

function parseFile(category: Category, filename: string): Post | null {
  const filePath = path.join(CONTENT_DIR, category, filename)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const frontmatter = data as PostFrontmatter

  if (!frontmatter.title || !frontmatter.date) return null

  return {
    slug: filenameToSlug(filename),
    category,
    frontmatter: {
      ...frontmatter,
      category,
      tags: frontmatter.tags ?? [],
    },
    readingTime: calculateReadingTime(content),
    wordCount: countWords(content),
    filePath,
  }
}

// ─── Cached data loaders ──────────────────────────────────────────────────────

const loadAllPosts = cache(async (): Promise<Post[]> => {
  const posts: Post[] = []
  for (const category of CATEGORIES) {
    const files = getFilesInCategory(category)
    for (const file of files) {
      const post = parseFile(category, file)
      if (post) posts.push(post)
    }
  }
  return posts.sort((a, b) =>
    sortByDate(a.frontmatter.date, b.frontmatter.date),
  )
})

// ─── MarkdownRepository ───────────────────────────────────────────────────────

export class MarkdownRepository implements IPostRepository {
  async getAllPosts(options: PostQueryOptions = {}): Promise<Post[]> {
    let posts = await loadAllPosts()

    if (!options.includeDrafts) {
      posts = posts.filter((p) => !p.frontmatter.draft)
    }
    if (options.category) {
      posts = posts.filter((p) => p.category === options.category)
    }
    if (options.tag) {
      const tag = options.tag.toLowerCase()
      posts = posts.filter((p) =>
        p.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag),
      )
    }

    const sortBy = options.sortBy ?? 'date'
    const sortOrder = options.sortOrder ?? 'desc'
    posts = posts.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'date') cmp = sortByDate(a.frontmatter.date, b.frontmatter.date) * -1
      if (sortBy === 'title') cmp = a.frontmatter.title.localeCompare(b.frontmatter.title)
      if (sortBy === 'readingTime') cmp = a.readingTime - b.readingTime
      return sortOrder === 'desc' ? -cmp : cmp
    })
    // date desc is already default from loadAllPosts, but we re-sort for explicit options
    if (sortBy === 'date' && sortOrder === 'desc') {
      posts = posts.sort((a, b) =>
        sortByDate(a.frontmatter.date, b.frontmatter.date),
      )
    }

    const offset = options.offset ?? 0
    const limit = options.limit

    posts = posts.slice(offset)
    if (limit) posts = posts.slice(0, limit)

    return posts
  }

  async getPostBySlug(
    category: Category,
    slug: string,
  ): Promise<PostWithContent | null> {
    const files = getFilesInCategory(category)
    const file = files.find((f) => filenameToSlug(f) === slug)
    if (!file) return null

    const filePath = path.join(CONTENT_DIR, category, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const frontmatter = data as PostFrontmatter

    return {
      slug,
      category,
      frontmatter: {
        ...frontmatter,
        category,
        tags: frontmatter.tags ?? [],
      },
      readingTime: calculateReadingTime(content),
      wordCount: countWords(content),
      filePath,
      rawContent: content,
    }
  }

  async getSlugsByCategory(category: Category): Promise<string[]> {
    return getFilesInCategory(category).map(filenameToSlug)
  }

  async getAllTags(): Promise<Tag[]> {
    const posts = await loadAllPosts()
    const tagMap = new Map<string, { count: number; categories: Set<Category> }>()

    for (const post of posts) {
      if (post.frontmatter.draft) continue
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

  async getPostsByTag(
    tagName: string,
    options: PostQueryOptions = {},
  ): Promise<Post[]> {
    return this.getAllPosts({ ...options, tag: tagName })
  }

  async getTagGraphData(): Promise<GraphData> {
    const posts = (await loadAllPosts()).filter((p) => !p.frontmatter.draft)
    const tagMeta = new Map<
      string,
      { count: number; categories: Set<Category> }
    >()
    const coOccurrence = new Map<string, number>()

    for (const post of posts) {
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
      // Build co-occurrence pairs
      for (let i = 0; i < tags.length; i++) {
        for (let j = i + 1; j < tags.length; j++) {
          const key = [tags[i], tags[j]].sort().join('||')
          coOccurrence.set(key, (coOccurrence.get(key) ?? 0) + 1)
        }
      }
    }

    const nodes: GraphNode[] = Array.from(tagMeta.entries()).map(
      ([name, { count, categories }]) => ({
        id: name,
        label: name,
        count,
        categories: Array.from(categories),
        group: Array.from(categories)[0],
      }),
    )

    const links: GraphLink[] = Array.from(coOccurrence.entries()).map(
      ([key, weight]) => {
        const [source, target] = key.split('||')
        return { source, target, weight }
      },
    )

    return { nodes, links }
  }

  async getStudyRecords(): Promise<StudyRecord[]> {
    const posts = await loadAllPosts()
    return posts
      .filter((p) => !p.frontmatter.draft && p.frontmatter.studyDuration)
      .map((p) => ({
        date: p.frontmatter.date,
        category: p.category,
        slug: p.slug,
        durationMinutes: p.frontmatter.studyDuration!,
        wordCount: p.wordCount,
      }))
  }

  async getStatsSummary(): Promise<StatsSummary> {
    const posts = (await loadAllPosts()).filter((p) => !p.frontmatter.draft)
    const records = await this.getStudyRecords()
    const tags = await this.getAllTags()

    const totalStudyMinutes = records.reduce(
      (sum, r) => sum + r.durationMinutes,
      0,
    )
    const totalWordCount = posts.reduce((sum, p) => sum + p.wordCount, 0)

    // Study heatmap
    const studyByDate: Record<string, number> = {}
    for (const r of records) {
      studyByDate[r.date] = (studyByDate[r.date] ?? 0) + r.durationMinutes
    }

    // Streak calculation
    const dates = Object.keys(studyByDate).sort()
    let longestStreak = 0
    let currentStreak = 0
    let prevDate: Date | null = null

    for (const dateStr of dates) {
      const date = new Date(dateStr)
      if (prevDate) {
        const diff =
          (date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        if (diff === 1) {
          currentStreak++
        } else {
          currentStreak = 1
        }
      } else {
        currentStreak = 1
      }
      longestStreak = Math.max(longestStreak, currentStreak)
      prevDate = date
    }

    // Check if current streak is still active (last study was today or yesterday)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lastStudyDate = prevDate
    if (lastStudyDate) {
      const diffDays =
        (today.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24)
      if (diffDays > 1) currentStreak = 0
    }

    // Per-category stats
    const postsPerCategory: CategoryStats[] = CATEGORIES.map((category) => {
      const catPosts = posts.filter((p) => p.category === category)
      const catRecords = records.filter((r) => r.category === category)
      const catTags = new Set(catPosts.flatMap((p) => p.frontmatter.tags))
      return {
        category,
        postCount: catPosts.length,
        totalStudyMinutes: catRecords.reduce(
          (sum, r) => sum + r.durationMinutes,
          0,
        ),
        totalWordCount: catPosts.reduce((sum, p) => sum + p.wordCount, 0),
        uniqueTagCount: catTags.size,
      }
    })

    return {
      totalPosts: posts.length,
      totalStudyMinutes,
      totalWordCount,
      longestStreak,
      currentStreak,
      postsPerCategory,
      studyByDate,
      mostUsedTags: tags.slice(0, 20).map((t) => ({ tag: t.name, count: t.count })),
    }
  }
}
