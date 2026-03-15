// ─── Content Categories ───────────────────────────────────────────────────────

export const CATEGORIES = [
  'english',
  'spanish',
  'computerScience',
  'framework',
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABELS: Record<Category, string> = {
  english: 'English',
  spanish: 'Spanish',
  computerScience: 'Computer Science',
  framework: 'Framework',
}

// ─── Frontmatter (raw from gray-matter) ──────────────────────────────────────

export interface PostFrontmatter {
  title: string
  date: string // ISO 8601: "2024-01-15"
  category: Category
  tags: string[]
  excerpt: string
  draft?: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  language?: string
  studyDuration?: number // minutes
  references?: string[]
}

// ─── Post (runtime, enriched) ────────────────────────────────────────────────

export interface Post {
  slug: string
  category: Category
  frontmatter: PostFrontmatter
  readingTime: number
  filePath: string
  wordCount: number
}

export interface PostWithContent extends Post {
  rawContent: string
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

export interface Tag {
  name: string
  slug: string
  count: number
  categories: Category[]
}

// ─── Tag Network Graph ────────────────────────────────────────────────────────

export interface GraphNode {
  id: string
  label: string
  count: number
  categories: Category[]
  group: string
}

export interface GraphLink {
  source: string
  target: string
  weight: number
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

// ─── Study Records ───────────────────────────────────────────────────────────

export interface StudyRecord {
  date: string
  category: Category
  slug: string
  durationMinutes: number
  wordCount: number
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface CategoryStats {
  category: Category
  postCount: number
  totalStudyMinutes: number
  totalWordCount: number
  uniqueTagCount: number
}

export interface StatsSummary {
  totalPosts: number
  totalStudyMinutes: number
  totalWordCount: number
  longestStreak: number
  currentStreak: number
  postsPerCategory: CategoryStats[]
  studyByDate: Record<string, number>
  mostUsedTags: Array<{ tag: string; count: number }>
}

// ─── Repository Query Options ─────────────────────────────────────────────────

export interface PostQueryOptions {
  category?: Category
  tag?: string
  limit?: number
  offset?: number
  sortBy?: 'date' | 'title' | 'readingTime'
  sortOrder?: 'asc' | 'desc'
  includeDrafts?: boolean
}
