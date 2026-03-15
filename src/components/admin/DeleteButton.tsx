'use client'

import { deletePost } from '@/app/actions/posts'

interface DeleteButtonProps {
  id: number
  category: string
  slug: string
  title: string
}

export default function DeleteButton({ id, category, slug, title }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm(`"${title}" 을 삭제할까요?`)) return
        await deletePost(id, category, slug)
      }}
      className="rounded px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
    >
      Delete
    </button>
  )
}
