'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import type { GraphData } from '@/lib/data/types'
import { tagToSlug } from '@/lib/utils/slug'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

const CATEGORY_COLORS: Record<string, string> = {
  english: '#3b82f6',
  spanish: '#f59e0b',
  computerScience: '#10b981',
  framework: '#8b5cf6',
  default: '#6366f1',
}

interface TagGraphProps {
  data: GraphData
}

export default function TagGraph({ data }: TagGraphProps) {
  const router = useRouter()

  if (data.nodes.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
        태그가 아직 없습니다. 포스트를 작성하면 지식 맵이 생성됩니다.
      </div>
    )
  }

  const graphData = {
    nodes: data.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      count: n.count,
      group: n.group,
      val: Math.max(3, n.count * 3),
      color: CATEGORY_COLORS[n.group] ?? CATEGORY_COLORS.default,
    })),
    links: data.links.map((l) => ({
      source: l.source,
      target: l.target,
      value: l.weight,
    })),
  }

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <ForceGraph2D
        graphData={graphData as any}
        nodeLabel={(node: any) => `${node.label} (${node.count})`}
        nodeColor={(node: any) => node.color}
        nodeVal={(node: any) => node.val}
        linkWidth={(link: any) => Math.max(0.5, (link.value ?? 1) * 0.5)}
        linkColor={() => 'rgba(100,100,100,0.3)'}
        onNodeClick={(node: any) => {
          if (node.id) router.push(`/tags/${tagToSlug(String(node.id))}`)
        }}
        backgroundColor="transparent"
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const x = node.x ?? 0
          const y = node.y ?? 0
          const r = Math.sqrt(node.val) * 1.5
          ctx.beginPath()
          ctx.arc(x, y, r, 0, 2 * Math.PI)
          ctx.fillStyle = node.color ?? CATEGORY_COLORS.default
          ctx.fill()

          if (r > 5 && globalScale > 0.5) {
            const fontSize = Math.max(8, 11 / globalScale)
            ctx.font = `${fontSize}px Inter, sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(String(node.label), x, y)
          }
        }}
      />
    </div>
  )
}
