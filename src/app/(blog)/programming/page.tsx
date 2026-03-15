import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS, CATEGORY_EMOJI } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.programming,
}

export default async function ProgrammingPage() {
  const posts = await getAllPosts({ category: 'programming' })
  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">{CATEGORY_EMOJI.programming}</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.programming}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} posts · Java, JavaScript, Python, and more
        </p>
      </header>
      <PostList posts={posts} emptyMessage="No Programming posts yet." />
    </div>
  )
}
