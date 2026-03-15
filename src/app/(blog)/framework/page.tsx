import { getAllPosts } from '@/lib/data'
import { CATEGORY_LABELS } from '@/lib/data/types'
import PostList from '@/components/post/PostList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: CATEGORY_LABELS.framework,
  description: 'Framework studies: Next.js, React, and more.',
}

export default async function FrameworkPage() {
  const posts = await getAllPosts({ category: 'framework' })

  return (
    <div>
      <header className="mb-8">
        <div className="mb-2 text-3xl">⚙️</div>
        <h1 className="text-2xl font-bold">{CATEGORY_LABELS.framework}</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} posts · Next.js, React, and framework deep dives.
        </p>
      </header>
      <PostList posts={posts} emptyMessage="No Framework posts yet. Start writing!" />
    </div>
  )
}
