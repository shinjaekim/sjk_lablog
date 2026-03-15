import type {
  Post,
  PostWithContent,
  PostQueryOptions,
  Tag,
  GraphData,
  StudyRecord,
  StatsSummary,
  Category,
} from './types'

/**
 * IPostRepository is the ONLY interface the application uses to access data.
 * To migrate to a database: create a new implementation and update lib/data/index.ts.
 */
export interface IPostRepository {
  getAllPosts(options?: PostQueryOptions): Promise<Post[]>
  getPostBySlug(category: Category, slug: string): Promise<PostWithContent | null>
  getSlugsByCategory(category: Category): Promise<string[]>
  getAllTags(): Promise<Tag[]>
  getPostsByTag(tagName: string, options?: PostQueryOptions): Promise<Post[]>
  getTagGraphData(): Promise<GraphData>
  getStatsSummary(): Promise<StatsSummary>
  getStudyRecords(): Promise<StudyRecord[]>
}
