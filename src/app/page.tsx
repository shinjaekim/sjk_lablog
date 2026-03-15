import Link from 'next/link'
import { getAllPosts, getStatsSummary } from '@/lib/data'
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/data/types'
import PostList from '@/components/post/PostList'

export default async function HomePage() {
  const [recentPosts, stats] = await Promise.all([
    getAllPosts({ limit: 6 }),
    getStatsSummary(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          Personal Learning Journal
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          sjk<span className="text-[var(--color-accent)]">_</span>lablog
        </h1>
        <p className="max-w-xl text-lg text-[var(--color-text-secondary)]">
          학습한 내용을 기록하고 생각을 구조화하는 실험 공간입니다.
          언어, 컴퓨터 과학, 프레임워크를 탐구합니다.
        </p>
        <div className="flex gap-3">
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Knowledge Map →
          </Link>
          <Link
            href="/stats"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
          >
            Study Stats
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Posts', value: stats.totalPosts },
          { label: 'Study Hours', value: Math.round(stats.totalStudyMinutes / 60) },
          { label: 'Current Streak', value: `${stats.currentStreak}d` },
          { label: 'Total Words', value: stats.totalWordCount.toLocaleString() },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-center"
          >
            <div className="text-2xl font-bold text-[var(--color-accent)]">{value}</div>
            <div className="mt-1 text-xs text-[var(--color-text-secondary)]">{label}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Categories
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const catStat = stats.postsPerCategory.find((s) => s.category === cat)
            const emoji = { english: '🇬🇧', spanish: '🇪🇸', computerScience: '💻', framework: '⚙️' }[cat]
            return (
              <Link
                key={cat}
                href={`/${cat}`}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 transition-all hover:border-[var(--color-accent)] hover:shadow-sm"
              >
                <div className="mb-2 text-2xl">{emoji}</div>
                <div className="text-sm font-medium group-hover:text-[var(--color-accent)]">
                  {CATEGORY_LABELS[cat]}
                </div>
                <div className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  {catStat?.postCount ?? 0} posts
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Recent Posts
          </h2>
          <Link href="/tags" className="text-xs text-[var(--color-accent)] hover:underline">
            Knowledge Map →
          </Link>
        </div>
        <PostList posts={recentPosts} emptyMessage="첫 번째 포스트를 작성해보세요!" />
      </section>
    </div>
  )
}
