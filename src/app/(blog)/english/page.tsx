import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.english,
  description: 'English language learning notes and studies.',
}

export default async function EnglishPage() {
  const posts = await getAllPosts({ category: 'english' })

  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">🇬🇧</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.english}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} posts · English grammar, vocabulary, and usage notes.
        </p>
      </header>
      <PostList posts={posts} emptyMessage="No English posts yet. Start writing!" />
    </div>
  )
}
