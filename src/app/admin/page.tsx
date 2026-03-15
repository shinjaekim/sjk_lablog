import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { CATEGORY_LABELS } from '@/lib/data/types'
import type { Category } from '@/lib/data/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const allPosts = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      category: posts.category,
      title: posts.title,
      draft: posts.draft,
      postDate: posts.postDate,
    })
    .from(posts)
    .orderBy(desc(posts.postDate))

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">Posts</h1>
        <a
          href="/admin/posts/new"
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          + New Post
        </a>
      </div>

      {allPosts.length === 0 ? (
        <p className="text-sm text-[var(--color-text-secondary)]">포스트가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {CATEGORY_LABELS[post.category as Category]}
                  </span>
                  {post.draft && (
                    <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {post.title}
                </p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">
                  {post.postDate} · /{post.category}/{post.slug}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-2 shrink-0">
                <a
                  href={`/admin/posts/${post.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  Edit
                </a>
                <DeleteButton
                  id={post.id}
                  category={post.category}
                  slug={post.slug}
                  title={post.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
