export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateStr: string): string {
  return dateStr.slice(0, 10)
}

export function sortByDate(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime()
}
