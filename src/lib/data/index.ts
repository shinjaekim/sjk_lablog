import 'server-only'

// Phase 1: 마크다운 파일 기반
// import { MarkdownRepository } from './markdown-repository'
// const repository = new MarkdownRepository()

// Phase 2: Xata (Postgres) DB 기반
import { DatabaseRepository } from './database-repository'
const repository = new DatabaseRepository()

export const getAllPosts = repository.getAllPosts.bind(repository)
export const getPostBySlug = repository.getPostBySlug.bind(repository)
export const getSlugsByCategory = repository.getSlugsByCategory.bind(repository)
export const getAllTags = repository.getAllTags.bind(repository)
export const getPostsByTag = repository.getPostsByTag.bind(repository)
export const getTagGraphData = repository.getTagGraphData.bind(repository)
export const getStatsSummary = repository.getStatsSummary.bind(repository)
export const getStudyRecords = repository.getStudyRecords.bind(repository)
