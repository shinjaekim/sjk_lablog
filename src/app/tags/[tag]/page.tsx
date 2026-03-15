import { getPostsByTag, getAllTags } from '@/lib/data'
import PostList from '@/components/post/PostList'
import { tagToSlug } from '@/lib/utils/slug'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((t) => ({ tag: tagToSlug(t.name) }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return { title: `#${tag}`, description: `Posts tagged with #${tag}` }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = await getPostsByTag(tag)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-[var(--color-accent)]">#</span>{tag}
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {posts.length} post{posts.length !== 1 ? 's' : ''} tagged with #{tag}
        </p>
      </header>
      <PostList posts={posts} emptyMessage={`No posts tagged with #${tag} yet.`} />
    </div>
  )
}
