import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  date,
  timestamp,
} from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id:            serial('id').primaryKey(),
  slug:          varchar('slug', { length: 255 }).notNull().unique(),
  category:      varchar('category', { length: 100 }).notNull(),
  title:         varchar('title', { length: 500 }).notNull(),
  excerpt:       text('excerpt').notNull().default(''),
  content:       text('content').notNull().default(''),
  // Postgres text[] — 태그 배열
  tags:          text('tags').array().notNull().default([]),
  difficulty:    varchar('difficulty', { length: 50 }),
  languageNote:  varchar('language_note', { length: 100 }),
  studyDuration: integer('study_duration'),
  draft:         boolean('draft').notNull().default(false),
  postDate:      date('post_date').notNull(),
  createdAt:     timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:     timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export type PostRow = typeof posts.$inferSelect
export type NewPostRow = typeof posts.$inferInsert
