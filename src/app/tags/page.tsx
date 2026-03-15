import { getAllTags, getTagGraphData } from '@/lib/data'
import TagGraph from '@/components/graph/TagGraph'
import TagBadge from '@/components/post/TagBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Map',
  description: 'Visual map of all learning topics and their connections.',
}

export default async function TagsPage() {
  const [tags, graphData] = await Promise.all([getAllTags(), getTagGraphData()])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Knowledge Map</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          태그 간의 연결을 시각화한 지식 네트워크입니다. 노드를 클릭하면 해당 태그의 포스트를 볼 수 있습니다.
        </p>
      </header>

      {/* Network graph */}
      <section className="mb-10">
        <TagGraph data={graphData} />
        <p className="mt-2 text-center text-xs text-[var(--color-text-secondary)]">
          노드 크기 = 포스트 수 · 엣지 두께 = 함께 등장한 빈도
        </p>
      </section>

      {/* Tag grid */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
          All Tags ({tags.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge key={tag.name} tag={tag.name} count={tag.count} />
          ))}
        </div>
      </section>
    </div>
  )
}
