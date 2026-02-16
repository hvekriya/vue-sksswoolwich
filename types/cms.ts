/**
 * CMS types for Firebase Firestore (migrated from Prismic).
 * Kept compatible with Prismic-shaped responses so existing components
 * (e.g. prismic-rich-text) can be reused.
 */

/** Prismic-style rich text block (paragraph, heading1, etc.) */
export interface RichTextBlock {
  type: string
  text: string
  spans?: Array<{ start: number; end: number; type: string; data?: unknown }>
}

/** Prismic-style image field */
export interface CmsImage {
  url: string
  alt?: string
}

/** Prismic-style link field */
export interface CmsLink {
  url: string
  link_type?: string
}

/** Slice in home body (hero_section, alert, video, hero_slider, etc.) */
export interface HomeSlice {
  slice_type: string
  slice_label?: string
  primary?: Record<string, unknown>
  items?: Array<Record<string, unknown>>
}

/** Home document (single) – stored in Firestore at cms_home/home */
export interface HomeData {
  body?: HomeSlice[]
  live_stream_url?: string | { url?: string }
}

/** Event document – stored in Firestore collection "events", doc id = uid */
export interface EventData {
  event_title: RichTextBlock[]
  event_date: string
  event_location?: string
  event_description: RichTextBlock[]
  event_description_short?: RichTextBlock[]
  poster?: CmsImage
  poster_2?: CmsImage
  flickr_photoset_id?: string
}

/** Our-temple document – stored in Firestore collection "our_temple", doc id = uid */
export interface OurTempleData {
  title: RichTextBlock[]
  content: RichTextBlock[]
  cover_image?: CmsImage
  icon?: CmsImage
  cta_link?: CmsLink
  cta_text?: RichTextBlock[]
  body?: HomeSlice[]
}

/** Article document – stored in Firestore collection "articles", doc id = uid (skip blog) */
export interface ArticleData {
  title: RichTextBlock[]
  content?: RichTextBlock[]
  cover?: CmsImage
  excerpt?: string
}

/** Prismic-like document wrapper (id, uid, data, url) for compatibility */
export interface CmsDocument<T = Record<string, unknown>> {
  id: string
  uid: string
  data: T
  url?: string
}

export type CmsHomeDocument = CmsDocument<HomeData>
export type CmsEventDocument = CmsDocument<EventData>
export type CmsOurTempleDocument = CmsDocument<OurTempleData>
export type CmsArticleDocument = CmsDocument<ArticleData>

/** Flat shape for easy admin editing – strings instead of rich text arrays */
export interface EventDataFlat {
  uid?: string
  event_title?: string
  event_date: string
  event_location?: string
  event_description?: string
  event_description_short?: string
  poster_url?: string
  poster_alt?: string
  poster_2_url?: string
  poster_2_alt?: string
  flickr_photoset_id?: string
}

export interface OurTempleDataFlat {
  uid?: string
  title?: string
  content?: string
  cover_image_url?: string
  cover_image_alt?: string
  icon_url?: string
  icon_alt?: string
  cta_link_url?: string
  cta_text?: string
}
