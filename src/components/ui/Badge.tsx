import type { Category } from '@/lib/data/types'
import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'category' | 'tag'
  category?: Category
  className?: string
}

const categoryColors: Record<Category, string> = {
  english: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  spanish: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  computerScience: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  framework: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
}

export default function Badge({ children, variant = 'default', category, className }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  const styles = {
    default: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
    category: category ? categoryColors[category] : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
    tag: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors cursor-pointer',
  }

  return (
    <span className={cn(base, styles[variant], className)}>
      {children}
    </span>
  )
}
