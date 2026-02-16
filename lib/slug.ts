/**
 * Generate URL slug from title: lowercase, spaces to hyphens, strip invalid chars.
 */
export function titleToSlug(title: string): string {
  if (typeof title !== 'string' || !title.trim()) return ''
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
