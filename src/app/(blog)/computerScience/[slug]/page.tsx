import { notFound } from 'next/navigation'
import { getPostBySlug, getSlugsByCategory } from '@/lib/data'
import PostHeader from '@/components/post/PostHeader'
import MDXContent from '@/components/post/MDXContent'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugsByCategory('computerScience')).map((slug) => ({ slug }))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('computerScience', slug)
  if (!post) return {}
  return { title: post.frontmatter.title, description: post.frontmatter.excerpt }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('computerScience', slug)
  if (!post) notFound()
  return (
    <article>
      <PostHeader post={post} />
      <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-[var(--color-accent)]">
        <MDXContent source={post.rawContent} />
      </div>
    </article>
  )
}
