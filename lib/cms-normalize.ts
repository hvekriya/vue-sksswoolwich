/**
 * Normalizes Firestore documents to Prismic-like shape.
 * Accepts both "flat" (admin-friendly) and already-nested (migrated) data
 * so the frontend always receives the same shape.
 */

import type { EventData, OurTempleData, RichTextBlock, CmsImage } from '~/types/cms'

function toRichText(text: string | undefined, type = 'paragraph'): RichTextBlock[] {
  if (text == null || text === '') return []
  const trimmed = text.trim()
  if (!trimmed) return []
  return [{ type, text: trimmed, spans: [] }]
}

/** Split by double newlines into multiple paragraphs */
function toRichTextMultiParagraph(text: string | undefined): RichTextBlock[] {
  if (text == null || text === '') return []
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  if (paras.length === 0) return []
  return paras.map((p) => ({ type: 'paragraph' as const, text: p, spans: [] }))
}

function isRichTextArray(value: unknown): value is RichTextBlock[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'type' in value[0] && 'text' in value[0]
}

/** Normalize event_title: string → RichTextBlock[] or keep existing array */
function normalizeEventTitle(raw: unknown): RichTextBlock[] {
  if (typeof raw === 'string') return toRichText(raw, 'heading1')
  if (isRichTextArray(raw)) return raw
  return []
}

/** Extract text and link spans from an element (for Prismic link spans) */
function extractTextAndSpans(el: Element): { text: string; spans: Array<{ start: number; end: number; type: string; data?: { url: string } }> } {
  let text = ''
  const spans: Array<{ start: number; end: number; type: string; data?: { url: string } }> = []
  function walk(n: Node) {
    if (n.nodeType === Node.TEXT_NODE) {
      const t = (n.textContent || '')
      text += t
      return
    }
    if (n.nodeType === Node.ELEMENT_NODE) {
      const e = n as Element
      if (e.tagName.toLowerCase() === 'a') {
        const href = e.getAttribute('href') || ''
        const start = text.length
        e.childNodes.forEach(walk)
        const end = text.length
        if (start < end && href) spans.push({ start, end, type: 'link', data: { url: href } })
        return
      }
    }
    n.childNodes.forEach(walk)
  }
  el.childNodes.forEach(walk)
  return { text: text.trim(), spans }
}

/** Convert simple HTML (from TipTap/rich editor) to Prismic-like blocks. Safe in SSR (no DOMParser). Exported for admin home save. */
export function htmlToBlocks(html: string): RichTextBlock[] {
  if (typeof html !== 'string' || !html.trim()) return []
  if (typeof DOMParser === 'undefined') {
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    return text ? [{ type: 'paragraph', text, spans: [] }] : []
  }
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const blocks: RichTextBlock[] = []
    const walk = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element
        const tag = el.tagName.toLowerCase()
        const { text, spans } = extractTextAndSpans(el)
        if (!text) return
        if (tag === 'p') blocks.push({ type: 'paragraph', text, spans })
        else if (tag === 'h1') blocks.push({ type: 'heading1', text, spans })
        else if (tag === 'h2') blocks.push({ type: 'heading2', text, spans })
        else if (tag === 'h3') blocks.push({ type: 'heading3', text, spans })
        else if (tag === 'h4') blocks.push({ type: 'heading4', text, spans })
        else if (tag === 'li') blocks.push({ type: 'paragraph', text: `• ${text}`, spans })
        else Array.from(el.childNodes).forEach(walk)
      }
    }
    doc.body?.childNodes.forEach(walk)
    return blocks.length ? blocks : [{ type: 'paragraph', text: doc.body?.textContent?.trim() || '', spans: [] }]
  } catch {
    return toRichTextMultiParagraph(html.replace(/<[^>]+>/g, ' '))
  }
}

function normalizeRichText(raw: unknown, multiParagraph = false): RichTextBlock[] {
  if (typeof raw === 'string') {
    if (raw.trim().startsWith('<') && raw.includes('</')) return htmlToBlocks(raw)
    return multiParagraph ? toRichTextMultiParagraph(raw) : toRichText(raw)
  }
  if (isRichTextArray(raw)) return raw
  return []
}

function normalizeImage(raw: unknown, urlKey?: string, altKey?: string): CmsImage | undefined {
  if (!raw) return undefined
  if (typeof raw === 'object' && 'url' in (raw as object)) return raw as CmsImage
  if (urlKey && typeof (raw as Record<string, unknown>)[urlKey] === 'string') {
    return {
      url: (raw as Record<string, unknown>)[urlKey] as string,
      alt: (raw as Record<string, unknown>)[altKey || 'alt'] as string | undefined,
    }
  }
  return undefined
}

/** Raw Firestore event doc (flat or nested) → EventData */
export function normalizeEventData(raw: Record<string, unknown> & { uid?: string }): EventData {
  const poster = normalizeImage(raw.poster) ?? (raw.poster_url ? { url: raw.poster_url as string, alt: raw.poster_alt as string } : undefined)
  const poster_2 = normalizeImage(raw.poster_2) ?? (raw.poster_2_url ? { url: raw.poster_2_url as string, alt: raw.poster_2_alt as string } : undefined)
  return {
    event_title: normalizeEventTitle(raw.event_title),
    event_date: (raw.event_date as string) ?? '',
    event_location: raw.event_location as string | undefined,
    event_description: normalizeRichText(raw.event_description, true),
    event_description_short: normalizeRichText(raw.event_description_short),
    poster,
    poster_2,
    flickr_photoset_id: (raw.flickr_photoset_id ?? raw.flicker_album_id) as string | undefined,
  }
}

/** Raw Firestore our_temple doc (flat or nested) → OurTempleData */
export function normalizeOurTempleData(raw: Record<string, unknown> & { uid?: string }): OurTempleData {
  const cover_image = normalizeImage(raw.cover_image) ?? (raw.cover_image_url ? { url: raw.cover_image_url as string, alt: raw.cover_image_alt as string } : undefined)
  const icon = normalizeImage(raw.icon) ?? (raw.icon_url ? { url: raw.icon_url as string, alt: raw.icon_alt as string } : undefined)
  const cta_text = normalizeRichText(raw.cta_text)
  const cta_link =
    (raw.cta_link as { url?: string } | undefined) ??
    (raw.cta_link_url ? { url: raw.cta_link_url as string } : undefined)
  return {
    title: normalizeEventTitle(raw.title),
    content: normalizeRichText(raw.content, true),
    cover_image,
    icon,
    cta_link,
    cta_text: cta_text.length ? cta_text : undefined,
    body: raw.body as OurTempleData['body'],
  }
}
