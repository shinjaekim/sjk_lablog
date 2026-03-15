'use client'

import { useRef } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/data/types'

interface PostEditorProps {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    slug?: string
    category?: string
    title?: string
    excerpt?: string
    content?: string
    tags?: string[]
    difficulty?: string | null
    languageNote?: string | null
    studyDuration?: number | null
    draft?: boolean
    postDate?: string
  }
  submitLabel?: string
}

const inputCls =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] transition-colors'

const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1'

export default function PostEditor({
  action,
  defaultValues = {},
  submitLabel = 'Save Post',
}: PostEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Tab 키를 누르면 포커스 이동 대신 들여쓰기 삽입
  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const el = e.currentTarget
    const start = el.selectionStart
    const end = el.selectionEnd
    el.value = el.value.slice(0, start) + '  ' + el.value.slice(end)
    el.selectionStart = el.selectionEnd = start + 2
  }

  return (
    <form action={action} className="space-y-5">
      {/* Row 1: title */}
      <div>
        <label className={labelCls}>Title *</label>
        <input
          name="title"
          required
          defaultValue={defaultValues.title}
          placeholder="포스트 제목"
          className={inputCls}
        />
      </div>

      {/* Row 2: slug + category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Slug *</label>
          <input
            name="slug"
            required
            defaultValue={defaultValues.slug}
            placeholder="url-friendly-slug"
            pattern="[a-z0-9\-]+"
            title="소문자, 숫자, 하이픈만 사용"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Category *</label>
          <select name="category" required defaultValue={defaultValues.category} className={inputCls}>
            <option value="">선택</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: excerpt */}
      <div>
        <label className={labelCls}>Excerpt *</label>
        <input
          name="excerpt"
          required
          defaultValue={defaultValues.excerpt}
          placeholder="한 줄 요약"
          className={inputCls}
        />
      </div>

      {/* Row 4: tags + date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Tags</label>
          <input
            name="tags"
            defaultValue={defaultValues.tags?.join(', ')}
            placeholder="nextjs, react, typescript"
            className={inputCls}
          />
          <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">쉼표로 구분</p>
        </div>
        <div>
          <label className={labelCls}>Date *</label>
          <input
            name="postDate"
            type="date"
            required
            defaultValue={defaultValues.postDate ?? new Date().toISOString().slice(0, 10)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 5: difficulty + language + studyDuration */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Difficulty</label>
          <select name="difficulty" defaultValue={defaultValues.difficulty ?? ''} className={inputCls}>
            <option value="">-</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Language Note</label>
          <input
            name="languageNote"
            defaultValue={defaultValues.languageNote ?? ''}
            placeholder="English, Japanese…"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Study Duration (min)</label>
          <input
            name="studyDuration"
            type="number"
            min={0}
            defaultValue={defaultValues.studyDuration ?? ''}
            placeholder="45"
            className={inputCls}
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className={labelCls}>Content (Markdown) *</label>
        <textarea
          ref={textareaRef}
          name="content"
          required
          defaultValue={defaultValues.content}
          onKeyDown={handleTabKey}
          rows={24}
          placeholder="## 제목&#10;&#10;내용을 마크다운으로 작성하세요."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-[var(--color-accent)] transition-colors resize-y"
          spellCheck={false}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] cursor-pointer">
          <input type="hidden" name="draft" value="false" />
          <input
            type="checkbox"
            name="draft"
            value="true"
            defaultChecked={defaultValues.draft}
            className="accent-[var(--color-accent)]"
          />
          Draft (비공개)
        </label>
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-accent)] px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
