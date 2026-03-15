import 'server-only'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

// postgres.js — 서버리스 환경에서는 max:1로 연결 수 제한
const client = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  max: 1,
})

export const db = drizzle(client, { schema })
