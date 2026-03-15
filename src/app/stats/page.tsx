import { getStatsSummary } from '@/lib/data'
import { CATEGORY_LABELS } from '@/lib/data/types'
import StudyCalendar from '@/components/stats/StudyCalendar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Study Stats',
  description: 'Personal learning statistics and study record tracker.',
}

export default async function StatsPage() {
  const stats = await getStatsSummary()

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, unit: 'posts' },
    { label: 'Study Time', value: Math.round(stats.totalStudyMinutes / 60), unit: 'hours' },
    { label: 'Current Streak', value: stats.currentStreak, unit: 'days' },
    { label: 'Longest Streak', value: stats.longestStreak, unit: 'days' },
    { label: 'Unique Tags', value: stats.mostUsedTags.length, unit: 'tags' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Study Statistics</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          학습 기록과 성장 추이를 확인합니다.
        </p>
      </header>

      {/* Overview cards */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {statCards.map(({ label, value, unit }) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
          >
            <div className="text-3xl font-bold text-[var(--color-accent)]">{value}</div>
            <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{unit}</div>
            <div className="mt-2 text-sm font-medium">{label}</div>
          </div>
        ))}
      </section>

      {/* Study calendar */}
      <section className="mb-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Study Activity
        </h2>
        <StudyCalendar studyByDate={stats.studyByDate} />
      </section>

      {/* Category breakdown */}
      <section className="mb-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          Category Breakdown
        </h2>
        <div className="space-y-3">
          {stats.postsPerCategory.map(({ category, postCount, totalStudyMinutes }) => {
            const maxPosts = Math.max(...stats.postsPerCategory.map((c) => c.postCount), 1)
            const pct = Math.round((postCount / maxPosts) * 100)
            return (
              <div key={category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{CATEGORY_LABELS[category]}</span>
                  <span className="text-[var(--color-text-secondary)]">
                    {postCount} posts · {Math.round(totalStudyMinutes / 60)}h
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Top tags */}
      {stats.mostUsedTags.length > 0 && (
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Most Used Tags
          </h2>
          <div className="space-y-2">
            {stats.mostUsedTags.slice(0, 10).map(({ tag, count }) => {
              const max = stats.mostUsedTags[0].count
              const pct = Math.round((count / max) * 100)
              return (
                <div key={tag} className="flex items-center gap-3">
                  <span className="w-28 truncate text-sm font-mono text-[var(--color-accent)]">
                    #{tag}
                  </span>
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs text-[var(--color-text-secondary)]">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
