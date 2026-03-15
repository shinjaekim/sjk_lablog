import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About sjk_lablog — a personal learning journal.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">
        About <span className="text-[var(--color-accent)]">sjk_lablog</span>
      </h1>

      <div className="prose prose-zinc max-w-none dark:prose-invert space-y-4 text-[var(--color-text-secondary)]">
        <p>
          <strong className="text-[var(--color-text-primary)]">sjk_lablog</strong>은
          개인 학습을 기록하고 생각을 구조화하기 위한 실험적 블로그입니다.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">다루는 주제</h2>
        <ul className="space-y-1">
          <li>🇬🇧 <Link href="/english" className="text-[var(--color-accent)] hover:underline">English</Link> — 영어 학습 노트</li>
          <li>🇪🇸 <Link href="/spanish" className="text-[var(--color-accent)] hover:underline">Spanish</Link> — 스페인어 학습 노트</li>
          <li>💻 <Link href="/computerScience" className="text-[var(--color-accent)] hover:underline">Computer Science</Link> — 알고리즘, 자료구조, CS 기초</li>
          <li>⚙️ <Link href="/framework" className="text-[var(--color-accent)] hover:underline">Framework</Link> — Next.js, React 등 프레임워크</li>
        </ul>

        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">기술 스택</h2>
        <ul className="space-y-1 text-sm">
          <li>Next.js 15 App Router + TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>MDX (Markdown + JSX)</li>
          <li>Vercel Analytics + Speed Insights</li>
          <li>Force-Graph (Knowledge Map)</li>
        </ul>

        <p className="text-sm">
          <Link href="/tags" className="text-[var(--color-accent)] hover:underline">Knowledge Map</Link>에서
          태그 간의 연결 관계를 시각적으로 확인할 수 있습니다.
        </p>
      </div>
    </div>
  )
}
