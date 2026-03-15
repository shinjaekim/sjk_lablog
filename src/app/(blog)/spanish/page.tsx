import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.spanish,
  description: 'Spanish language learning notes and studies.',
}

export default async function SpanishPage() {
  const posts = await getAllPosts({ category: 'spanish' })

  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">🇪🇸</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.spanish}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} posts · Spanish grammar, vocabulary, and usage notes.
        </p>
      </header>
      <PostList posts={posts} emptyMessage="No Spanish posts yet. Start writing!" />
    </div>
  )
}
