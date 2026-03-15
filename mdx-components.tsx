import type { MDXComponents } from 'mdx/types'

// This file is required for @next/mdx but we use next-mdx-remote/rsc for rendering.
// Custom components are configured in src/components/post/MDXContent.tsx.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components }
}
