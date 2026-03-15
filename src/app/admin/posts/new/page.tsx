import PostEditor from '@/components/admin/PostEditor'
import { createPost } from '@/app/actions/posts'

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">New Post</h1>
      <PostEditor action={createPost} submitLabel="Create Post" />
    </div>
  )
}
