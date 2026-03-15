import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import PostEditor from '@/components/admin/PostEditor'
import { updatePost } from '@/app/actions/posts'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postId = Number(id)

  if (isNaN(postId)) notFound()

  const [post] = await db.select().from(posts).where(eq(posts.id, postId))
  if (!post) notFound()

  const action = updatePost.bind(null, postId)

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">Edit Post</h1>
      <PostEditor
        action={action}
        submitLabel="Update Post"
        defaultValues={{
          slug: post.slug,
          category: post.category,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags ?? [],
          difficulty: post.difficulty,
          languageNote: post.languageNote,
          studyDuration: post.studyDuration,
          draft: post.draft,
          postDate: post.postDate,
        }}
      />
    </div>
  )
}
