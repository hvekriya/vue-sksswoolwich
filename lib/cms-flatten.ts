/**
 * Flatten Prismic-like CMS data for admin forms (reverse of normalize).
 */

import type { EventData, OurTempleData, RichTextBlock, HomeData, HomeSlice } from '~/types/cms'
import type { EventDataFlat, OurTempleDataFlat } from '~/types/cms'

/** Flat form state for home page CMS */
export interface HomeDataFlat {
  hero_image_url: string
  hero_image_alt: string
  hero_title: string
  hero_description: string
  alert_message: string
  live_stream_url: string
}

function richTextToPlain(blocks: RichTextBlock[] | undefined): string {
  if (!blocks?.length) return ''
  return blocks.map((b) => b.text).join('\n\n')
}

/** Convert Prismic-like blocks to HTML for the rich text editor */
function blocksToHtml(blocks: RichTextBlock[] | undefined): string {
  if (!blocks?.length) return ''
  return blocks
    .map((b) => {
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      const text = esc(b.text)
      switch (b.type) {
        case 'heading1': return `<h1>${text}</h1>`
        case 'heading2': return `<h2>${text}</h2>`
        case 'heading3': return `<h3>${text}</h3>`
        case 'heading4': return `<h4>${text}</h4>`
        default: return `<p>${text}</p>`
      }
    })
    .join('')
}

function richTextToHtml(raw: unknown): string {
  if (typeof raw === 'string' && raw.trim().startsWith('<') && raw.includes('</')) return raw
  if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'object' && 'type' in raw[0] && 'text' in raw[0])
    return blocksToHtml(raw as RichTextBlock[])
  if (typeof raw === 'string') return raw
  return ''
}

function getImageUrl(slice: HomeSlice): string {
  const p = slice.primary
  if (p?.image && typeof p.image === 'object' && 'url' in p.image) return (p.image as { url?: string }).url ?? ''
  const first = slice.items?.[0]
  if (first?.image && typeof first.image === 'object' && 'url' in first.image) return (first.image as { url?: string }).url ?? ''
  return ''
}

function getImageAlt(slice: HomeSlice): string {
  const p = slice.primary
  if (p?.image && typeof p.image === 'object' && 'alt' in p.image) return (p.image as { alt?: string }).alt ?? ''
  const first = slice.items?.[0]
  if (first?.image && typeof first.image === 'object' && 'alt' in first.image) return (first.image as { alt?: string }).alt ?? ''
  return ''
}

/** Extract flat form values from home document (body + live_stream_url). */
export function homeDataToFlat(data: HomeData): HomeDataFlat {
  const body = data.body ?? []
  const liveUrl = typeof data.live_stream_url === 'string'
    ? data.live_stream_url
    : (data.live_stream_url as { url?: string } | undefined)?.url ?? ''

  let hero_image_url = ''
  let hero_image_alt = ''
  let hero_title = ''
  let hero_description = ''
  const heroSection = body.find((s) => s.slice_type === 'hero_section')
  const heroSlider = body.find((s) => s.slice_type === 'hero_slider' || s.slice_type === 'image_slider')
  const heroSource = heroSection ?? heroSlider
  if (heroSource) {
    hero_image_url = getImageUrl(heroSource)
    hero_image_alt = getImageAlt(heroSource)
    const p = heroSource.primary ?? heroSource.items?.[0]
    if (p) {
      hero_title = richTextToHtml(p.title ?? p.image_caption ?? p.image_captions)
      hero_description = richTextToHtml(p.description)
    }
  }

  let alert_message = ''
  const alertSlice = body.find((s) => s.slice_label === 'alert' || s.slice_type === 'alert')
  if (alertSlice?.primary?.alert_message) alert_message = richTextToHtml(alertSlice.primary.alert_message)

  let fromVideo = liveUrl
  if (!fromVideo && body.length) {
    const videoSlice = body.find((s: HomeSlice) => s.slice_type === 'video' && (s.primary as any)?.live_stream_enabled)
    const link = (videoSlice?.primary as { live_stream_link?: { url?: string } })?.live_stream_link
    if (link?.url) fromVideo = link.url
  }

  return {
    hero_image_url,
    hero_image_alt,
    hero_title,
    hero_description,
    alert_message,
    live_stream_url: liveUrl || fromVideo,
  }
}

export function eventDataToFlat(data: EventData, uid: string): EventDataFlat {
  return {
    uid,
    event_title: data.event_title?.[0]?.text ?? '',
    event_date: data.event_date ?? '',
    event_location: data.event_location ?? '',
    event_description: blocksToHtml(data.event_description) || richTextToPlain(data.event_description),
    event_description_short: richTextToPlain(data.event_description_short),
    poster_url: data.poster?.url ?? '',
    poster_alt: data.poster?.alt ?? '',
    poster_2_url: data.poster_2?.url ?? '',
    poster_2_alt: data.poster_2?.alt ?? '',
    flickr_photoset_id: data.flickr_photoset_id ?? '',
  }
}

export function ourTempleDataToFlat(data: OurTempleData, uid: string): OurTempleDataFlat {
  return {
    uid,
    title: data.title?.[0]?.text ?? '',
    content: blocksToHtml(data.content) || richTextToPlain(data.content),
    cover_image_url: data.cover_image?.url ?? '',
    cover_image_alt: data.cover_image?.alt ?? '',
    icon_url: data.icon?.url ?? '',
    icon_alt: data.icon?.alt ?? '',
    cta_link_url: data.cta_link?.url ?? '',
    cta_text: data.cta_text?.[0]?.text ?? '',
  }
}
