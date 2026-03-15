import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="text-sm text-[var(--color-text-secondary)]">
          © {year}{' '}
          <span className="font-semibold text-[var(--color-accent)]">sjk_lablog</span>
          {' '}— Personal Learning Journal
        </div>
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
          <Link href="/tags" className="hover:text-[var(--color-text-primary)]">
            Knowledge Map
          </Link>
          <Link href="/stats" className="hover:text-[var(--color-text-primary)]">
            Stats
          </Link>
          <Link href="/about" className="hover:text-[var(--color-text-primary)]">
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
