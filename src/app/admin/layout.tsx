import { logout } from '@/app/actions/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-3 flex items-center justify-between">
        <a href="/admin" className="text-sm font-semibold text-[var(--color-text-primary)]">
          ⚡ Admin
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            ← Blog
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  )
}
