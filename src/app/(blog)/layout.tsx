import Link from 'next/link'
import { getAllTags } from '@/lib/data'
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/data/types'
import TagBadge from '@/components/post/TagBadge'

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getAllTags()
  const topTags = tags.slice(0, 20)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex gap-8 lg:grid lg:grid-cols-[1fr_260px]">
        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Category nav */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Categories
              </h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/${cat}`}
                    className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: `var(--cat-${cat})` }} />
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Tag cloud */}
            {topTags.length > 0 && (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {topTags.map((tag) => (
                    <TagBadge key={tag.name} tag={tag.name} count={tag.count} />
                  ))}
                </div>
                <Link
                  href="/tags"
                  className="mt-3 block text-xs text-[var(--color-accent)] hover:underline"
                >
                  View knowledge map →
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
