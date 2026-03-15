import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.computerScience,
  description: 'Computer science concepts, algorithms, and data structures.',
}

export default async function ComputerSciencePage() {
  const posts = await getAllPosts({ category: 'computerScience' })

  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">💻</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.computerScience}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} posts · Algorithms, data structures, and CS fundamentals.
        </p>
      </header>
      <PostList posts={posts} emptyMessage="No CS posts yet. Start writing!" />
    </div>
  )
}
