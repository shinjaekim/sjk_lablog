import type { Post } from '@/lib/data/types'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
  emptyMessage?: string
}

export default function PostList({ posts, emptyMessage = 'No posts found.' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-text-secondary)]">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={`${post.category}/${post.slug}`} post={post} />
      ))}
    </div>
  )
}
