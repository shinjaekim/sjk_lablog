'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import type { Category } from '@/lib/data/types'

function parseFormData(formData: FormData) {
  const tagsRaw = (formData.get('tags') as string) ?? ''
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return {
    slug: (formData.get('slug') as string).trim(),
    category: formData.get('category') as Category,
    title: (formData.get('title') as string).trim(),
    excerpt: (formData.get('excerpt') as string).trim(),
    content: (formData.get('content') as string).trim(),
    tags,
    difficulty: (formData.get('difficulty') as string) || null,
    languageNote: (formData.get('languageNote') as string) || null,
    studyDuration: formData.get('studyDuration')
      ? Number(formData.get('studyDuration'))
      : null,
    draft: formData.get('draft') === 'true',
    postDate: (formData.get('postDate') as string) || new Date().toISOString().slice(0, 10),
  }
}

function revalidatePost(category: string, slug: string) {
  revalidatePath('/')
  revalidatePath(`/${category}`)
  revalidatePath(`/${category}/${slug}`)
  revalidatePath('/tags')
  revalidatePath('/stats')
}

export async function createPost(formData: FormData) {
  const data = parseFormData(formData)

  await db.insert(posts).values({
    ...data,
    updatedAt: new Date(),
  })

  revalidatePost(data.category, data.slug)
  redirect('/admin')
}

export async function updatePost(id: number, formData: FormData) {
  const data = parseFormData(formData)

  await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))

  revalidatePost(data.category, data.slug)
  redirect('/admin')
}

export async function deletePost(id: number, category: string, slug: string) {
  await db.delete(posts).where(eq(posts.id, id))
  revalidatePost(category, slug)
  redirect('/admin')
}
