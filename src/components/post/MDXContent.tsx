import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import Link from 'next/link'
import Image from 'next/image'

const components = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return <Link href={href} {...props}>{children}</Link>
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  },
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== 'string') return null
    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={800}
        height={400}
        className="rounded-lg"
      />
    )
  },
  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'tip'
    children: React.ReactNode
  }) => {
    const styles = {
      info: 'border-blue-400 bg-blue-50 dark:bg-blue-950/30',
      warning: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30',
      tip: 'border-green-400 bg-green-50 dark:bg-green-950/30',
    }
    return (
      <div className={`border-l-4 p-4 my-4 rounded-r ${styles[type]}`}>
        {children}
      </div>
    )
  },
}

interface MDXContentProps {
  source: string
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrettyCode, { theme: 'github-dark' }],
          ],
        },
      }}
    />
  )
}
