import { login } from '@/app/actions/auth'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-secondary)]">
      <div className="w-full max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-8 shadow-sm">
        <h1 className="mb-6 text-center text-lg font-semibold text-[var(--color-text-primary)]">
          Admin Login
        </h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Login
          </button>
        </form>
        {/* error indicator rendered client-side via URL param */}
      </div>
    </div>
  )
}
