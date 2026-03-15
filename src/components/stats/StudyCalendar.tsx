'use client'

import { useMemo } from 'react'

interface StudyCalendarProps {
  studyByDate: Record<string, number>
}

function getIntensity(minutes: number, max: number): number {
  if (minutes === 0) return 0
  const ratio = minutes / max
  if (ratio < 0.25) return 1
  if (ratio < 0.5) return 2
  if (ratio < 0.75) return 3
  return 4
}

const INTENSITY_COLORS = [
  'bg-[var(--color-bg-secondary)]', // 0 - no study
  'bg-indigo-200 dark:bg-indigo-900', // 1 - light
  'bg-indigo-400 dark:bg-indigo-700', // 2 - medium
  'bg-indigo-600 dark:bg-indigo-500', // 3 - high
  'bg-indigo-800 dark:bg-indigo-300', // 4 - max
]

export default function StudyCalendar({ studyByDate }: StudyCalendarProps) {
  const { weeks, months } = useMemo(() => {
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    // Align to Sunday
    const start = new Date(oneYearAgo)
    start.setDate(start.getDate() - start.getDay())

    const days: { date: string; minutes: number }[] = []
    const cur = new Date(start)
    while (cur <= today) {
      const dateStr = cur.toISOString().slice(0, 10)
      days.push({ date: dateStr, minutes: studyByDate[dateStr] ?? 0 })
      cur.setDate(cur.getDate() + 1)
    }

    const maxMinutes = Math.max(...days.map((d) => d.minutes), 1)

    const weeks: { date: string; minutes: number; intensity: number }[][] = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        days.slice(i, i + 7).map((d) => ({
          ...d,
          intensity: getIntensity(d.minutes, maxMinutes),
        })),
      )
    }

    // Month labels
    const months: { label: string; col: number }[] = []
    let lastMonth = -1
    weeks.forEach((week, col) => {
      const m = new Date(week[0].date).getMonth()
      if (m !== lastMonth) {
        months.push({
          label: new Date(week[0].date).toLocaleDateString('ko-KR', { month: 'short' }),
          col,
        })
        lastMonth = m
      }
    })

    return { weeks, months }
  }, [studyByDate])

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="mb-1 flex" style={{ paddingLeft: '28px' }}>
          {weeks.map((_, i) => {
            const month = months.find((m) => m.col === i)
            return (
              <div key={i} className="w-3 flex-shrink-0 text-center">
                {month && (
                  <span className="text-[9px] text-[var(--color-text-secondary)]">
                    {month.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="mr-1 flex flex-col gap-0.5">
            {dayLabels.map((day, i) => (
              <div
                key={day}
                className="flex h-3 items-center text-[9px] text-[var(--color-text-secondary)]"
              >
                {i % 2 === 1 ? day.slice(0, 1) : ''}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0.5">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.minutes}min`}
                    className={`h-3 w-3 rounded-sm ${INTENSITY_COLORS[day.intensity]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center gap-1 justify-end text-xs text-[var(--color-text-secondary)]">
          <span>Less</span>
          {INTENSITY_COLORS.map((cls, i) => (
            <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
