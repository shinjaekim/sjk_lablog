import type { Post } from '@/lib/data/types'
import { CATEGORY_LABELS } from '@/lib/data/types'
import { formatDate } from '@/lib/utils/date'
import Badge from '@/components/ui/Badge'
import TagBadge from './TagBadge'
import Link from 'next/link'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { frontmatter, category, readingTime, wordCount } = post

  return (
    <header className="mb-8 space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <Link href="/" className="hover:text-[var(--color-text-primary)]">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-[var(--color-text-primary)]">
          {CATEGORY_LABELS[category]}
        </Link>
        <span>/</span>
        <span className="truncate text-[var(--color-text-primary)]">{frontmatter.title}</span>
      </nav>

      {/* Category + difficulty */}
      <div className="flex items-center gap-2">
        <Badge variant="category" category={category}>
          {CATEGORY_LABELS[category]}
        </Badge>
        {frontmatter.difficulty && (
          <Badge variant="default" className="capitalize">
            {frontmatter.difficulty}
          </Badge>
        )}
        {frontmatter.language && (
          <Badge variant="default">{frontmatter.language}</Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-3xl md:text-4xl">
        {frontmatter.title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg text-[var(--color-text-secondary)]">
        {frontmatter.excerpt}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span>·</span>
        <span>{readingTime} min read</span>
        <span>·</span>
        <span>{wordCount.toLocaleString()} words</span>
        {frontmatter.studyDuration && (
          <>
            <span>·</span>
            <span>{frontmatter.studyDuration}min studied</span>
          </>
        )}
      </div>

      {/* Tags */}
      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="border-t border-[var(--color-border)]" />
    </header>
  )
}
