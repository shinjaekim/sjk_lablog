/**
 * content/ 디렉토리의 마크다운 파일을 Xata(Postgres) DB로 마이그레이션
 * 실행: npm run db:seed
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { posts } from '../src/lib/db/schema'

const CATEGORIES = ['english', 'japanese', 'spanish', 'computerScience', 'programming'] as const
const CONTENT_DIR = path.join(process.cwd(), 'content')

async function seed() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set. Create a .env.local file.')

  const client = postgres(url, { ssl: 'require', max: 1 })
  const db = drizzle(client)

  let inserted = 0
  let skipped = 0

  for (const category of CATEGORIES) {
    const dir = path.join(CONTENT_DIR, category)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)

      const tags: string[] = Array.isArray(data.tags)
        ? data.tags.map(String)
        : typeof data.tags === 'string'
          ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : []

      const postDate: string =
        data.date
          ? new Date(data.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10)

      try {
        await db.insert(posts).values({
          slug,
          category,
          title: data.title ?? slug,
          excerpt: data.excerpt ?? '',
          content: content.trim(),
          tags,
          difficulty: data.difficulty ?? null,
          languageNote: data.languageNote ?? null,
          studyDuration: data.studyDuration ? Number(data.studyDuration) : null,
          draft: data.draft === true,
          postDate,
          updatedAt: new Date(),
        })
        console.log(`✓ ${category}/${slug}`)
        inserted++
      } catch (err: unknown) {
        if (err instanceof Error && err.message.includes('unique')) {
          console.log(`- skip (already exists): ${category}/${slug}`)
          skipped++
        } else {
          throw err
        }
      }
    }
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped.`)
  await client.end()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
