'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORY_GROUPS, CATEGORY_LABELS } from '@/lib/data/types'

const NAV_LINKS = [
  { href: '/tags', label: 'Knowledge Map' },
  { href: '/stats', label: 'Stats' },
  { href: '/about', label: 'About' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-4 shadow-lg">
          <div className="space-y-3">
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {group.label}
                </p>
                {group.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/${cat}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-[var(--color-bg-secondary)]"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-[var(--color-border)] pt-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-[var(--color-bg-secondary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
