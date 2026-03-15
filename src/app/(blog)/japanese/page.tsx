import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS, CATEGORY_EMOJI } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.japanese,
}

export default async function JapanesePage() {
  const posts = await getAllPosts({ category: 'japanese' })
  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">{CATEGORY_EMOJI.japanese}</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.japanese}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">{posts.length} posts</p>
      </header>
      <PostList posts={posts} emptyMessage="No Japanese posts yet." />
    </div>
  )
}
