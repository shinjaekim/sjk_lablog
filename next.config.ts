import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // MDX rendering is handled by next-mdx-remote/rsc in components
  // Images from external sources can be added here if needed
}

export default nextConfig
