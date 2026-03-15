import Link from 'next/link'
import { CATEGORY_GROUPS, CATEGORY_LABELS } from '@/lib/data/types'
import ThemeToggle from '@/components/ui/ThemeToggle'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '/tags', label: 'Knowledge Map' },
  { href: '/stats', label: 'Stats' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-lg tracking-tight">
          <span className="text-[var(--color-accent)]">sjk</span>
          <span className="text-[var(--color-text-secondary)]">_</span>
          <span>lablog</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {CATEGORY_GROUPS.map((group) => (
            <div key={group.label} className="flex items-center">
              <span className="px-2 text-xs font-semibold text-[var(--color-text-secondary)] opacity-50">
                {group.label}
              </span>
              {group.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/${cat}`}
                  className="rounded-md px-2.5 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {CATEGORY_LABELS[cat]}
                </Link>
              ))}
              <div className="mx-1 h-4 w-px bg-[var(--color-border)]" />
            </div>
          ))}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
