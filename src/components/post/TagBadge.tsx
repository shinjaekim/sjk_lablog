import Link from 'next/link'
import { tagToSlug } from '@/lib/utils/slug'

interface TagBadgeProps {
  tag: string
  count?: number
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tagToSlug(tag)}`}
      className="inline-flex items-center gap-1 rounded-full bg-[var(--color-bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-accent)] hover:text-white"
    >
      #{tag}
      {count !== undefined && (
        <span className="opacity-70">{count}</span>
      )}
    </Link>
  )
}
