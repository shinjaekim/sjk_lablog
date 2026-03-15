/**
 * Converts a filename to a URL slug.
 * "nextjs-app-router.md" → "nextjs-app-router"
 * "2024-01-grammar-basics.mdx" → "grammar-basics" (optional date prefix stripped)
 */
export function filenameToSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-/, '')
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-')
}
