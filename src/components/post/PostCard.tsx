import Link from 'next/link'
import type { Post } from '@/lib/data/types'
import { CATEGORY_LABELS } from '@/lib/data/types'
import { formatDate } from '@/lib/utils/date'
import Badge from '@/components/ui/Badge'
import TagBadge from './TagBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { frontmatter, slug, category, readingTime } = post
  const href = `/${category}/${slug}`

  return (
    <article className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="category" category={category}>
          {CATEGORY_LABELS[category]}
        </Badge>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
          {frontmatter.difficulty && (
            <span className="capitalize">{frontmatter.difficulty}</span>
          )}
          <span>·</span>
          <span>{readingTime}min read</span>
        </div>
      </div>

      <Link href={href}>
        <h2 className="mb-2 text-base font-semibold leading-snug text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
          {frontmatter.title}
        </h2>
      </Link>

      <p className="mb-4 line-clamp-2 text-sm text-[var(--color-text-secondary)]">
        {frontmatter.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {frontmatter.tags.length > 3 && (
            <span className="text-xs text-[var(--color-text-secondary)]">
              +{frontmatter.tags.length - 3}
            </span>
          )}
        </div>
        <time className="text-xs text-[var(--color-text-secondary)]" dateTime={frontmatter.date}>
          {formatDate(frontmatter.date)}
        </time>
      </div>
    </article>
  )
}
