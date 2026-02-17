/**
 * Admin composable for writing CMS content to Firestore.
 * Uses a flat, form-friendly shape (strings) so the admin UI is simple.
 * useCms() normalizes these when reading so the frontend still gets Prismic-like data.
 */

import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { EventDataFlat, OurTempleDataFlat } from '~/types/cms'
import { useFirestore } from 'vuefire'

const CMS_HOME_ID = 'home'

function stripUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripUndefined)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue
      out[k] = stripUndefined(v)
    }
    return out
  }
  return value
}

/** Flatten event for Firestore: store strings and simple image fields */
export function eventFlatToFirestore(data: EventDataFlat): Record<string, unknown> {
  return {
    uid: data.uid,
    event_title: data.event_title ?? '',
    event_date: data.event_date ?? '',
    event_location: data.event_location ?? '',
    event_description: data.event_description ?? '',
    event_description_short: data.event_description_short ?? '',
    poster_url: data.poster_url ?? '',
    poster_alt: data.poster_alt ?? '',
    poster_2_url: data.poster_2_url ?? '',
    poster_2_alt: data.poster_2_alt ?? '',
    flickr_photoset_id: data.flickr_photoset_id ?? '',
  }
}

/** Flatten our-temple for Firestore */
export function ourTempleFlatToFirestore(data: OurTempleDataFlat): Record<string, unknown> {
  return {
    uid: data.uid,
    title: data.title ?? '',
    content: data.content ?? '',
    cover_image_url: data.cover_image_url ?? '',
    cover_image_alt: data.cover_image_alt ?? '',
    icon_url: data.icon_url ?? '',
    icon_alt: data.icon_alt ?? '',
    cta_link_url: data.cta_link_url ?? '',
    cta_text: data.cta_text ?? '',
  }
}

export function useCmsAdmin() {
  const db = useFirestore()

  /** Create or update an event. uid = document id (e.g. slug). */
  async function saveEvent(uid: string, data: EventDataFlat): Promise<void> {
    const ref = doc(db, 'events', uid)
    await setDoc(ref, { ...eventFlatToFirestore({ ...data, uid }), uid })
  }

  /** Create or update an our-temple page. */
  async function saveOurTemple(uid: string, data: OurTempleDataFlat): Promise<void> {
    const ref = doc(db, 'our_temple', uid)
    await setDoc(ref, { ...ourTempleFlatToFirestore({ ...data, uid }), uid })
  }

  /** Update home document (partial: body and/or live_stream_url). */
  async function saveHome(data: { body?: unknown[]; live_stream_url?: string }): Promise<void> {
    const ref = doc(db, 'cms_home', CMS_HOME_ID)
    const current = (await getDoc(ref)).data() ?? {}
    // Firestore rejects `undefined` anywhere in the object tree
    await setDoc(ref, stripUndefined({ ...current, ...data }) as Record<string, unknown>)
  }

  return {
    saveEvent,
    saveOurTemple,
    saveHome,
  }
}
