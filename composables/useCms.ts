/**
 * CMS composable – reads from Firebase Firestore (migrated from Prismic).
 * Returns documents in Prismic-like shape { id, uid, data, url } for compatibility
 * with existing components (e.g. prismic-rich-text).
 *
 * Firestore structure:
 * - cms_home/home – single home document
 * - events/{uid} – repeatable events
 * - our_temple/{uid} – repeatable our-temple pages
 * - articles/{uid} – repeatable articles (blog section skipped)
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type DocumentData,
} from 'firebase/firestore'
import type {
  CmsDocument,
  HomeData,
  EventData,
  OurTempleData,
  ArticleData,
} from '~/types/cms'
import { normalizeEventData, normalizeOurTempleData } from '~/lib/cms-normalize'
import { useFirestore } from 'vuefire'

const CMS_HOME_ID = 'home'

/** Map Firestore doc snapshot to Prismic-like document (id, uid, data, url) */
function toCmsDoc<T = DocumentData>(
  id: string,
  data: T & { uid?: string },
  basePath = ''
): CmsDocument<T> {
  const uid = (data && (data as { uid?: string }).uid) ?? id
  return {
    id,
    uid,
    data: data as T,
    url: basePath ? `${basePath}/${uid}` : undefined,
  }
}

export function useCms() {
  const db = useFirestore()

  /** Home (single document) */
  async function getHome(): Promise<CmsDocument<HomeData> | null> {
    const ref = doc(db, 'cms_home', CMS_HOME_ID)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    const d = snap.data() as HomeData & { uid?: string }
    return toCmsDoc<HomeData>(snap.id, d)
  }

  /** All events: latest edited first, then by event_date desc */
  async function getAllEvents(): Promise<CmsDocument<EventData>[]> {
    const ref = collection(db, 'events')
    const q = query(ref, orderBy('event_date', 'desc'))
    const snap = await getDocs(q)
    const withMeta = snap.docs.map((d) => {
      const raw = { ...d.data(), uid: d.id } as Record<string, unknown> & { uid: string }
      const data = normalizeEventData(raw)
      const updatedAt = (d as { updateTime?: { toMillis?: () => number } }).updateTime?.toMillis?.() ?? 0
      return { doc: toCmsDoc<EventData>(d.id, { ...data, uid: d.id }, '/events'), updatedAt }
    })
    withMeta.sort((a, b) => b.updatedAt - a.updatedAt)
    return withMeta.map((x) => x.doc)
  }

  /** Single event by uid */
  async function getEventByUid(uid: string): Promise<CmsDocument<EventData> | null> {
    const ref = doc(db, 'events', uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    const raw = { ...snap.data(), uid: snap.id } as Record<string, unknown> & { uid: string }
    const data = normalizeEventData(raw)
    return toCmsDoc<EventData>(snap.id, { ...data, uid: snap.id }, '/events')
  }

  /** All our-temple pages: latest edited first */
  async function getAllOurTemple(): Promise<CmsDocument<OurTempleData>[]> {
    const ref = collection(db, 'our_temple')
    const snap = await getDocs(ref)
    const withMeta = snap.docs.map((d) => {
      const raw = { ...d.data(), uid: d.id } as Record<string, unknown> & { uid: string }
      const data = normalizeOurTempleData(raw)
      const updatedAt = (d as { updateTime?: { toMillis?: () => number } }).updateTime?.toMillis?.() ?? 0
      return { doc: toCmsDoc<OurTempleData>(d.id, { ...data, uid: d.id }, '/our-temple'), updatedAt }
    })
    withMeta.sort((a, b) => b.updatedAt - a.updatedAt)
    return withMeta.map((x) => x.doc)
  }

  /** Single our-temple page by uid */
  async function getOurTempleByUid(uid: string): Promise<CmsDocument<OurTempleData> | null> {
    const ref = doc(db, 'our_temple', uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    const raw = { ...snap.data(), uid: snap.id } as Record<string, unknown> & { uid: string }
    const data = normalizeOurTempleData(raw)
    return toCmsDoc<OurTempleData>(snap.id, { ...data, uid: snap.id }, '/our-temple')
  }

  /** All articles (repeatable; blog section skipped) */
  async function getAllArticles(): Promise<CmsDocument<ArticleData>[]> {
    const ref = collection(db, 'articles')
    const snap = await getDocs(ref)
    return snap.docs.map((d) =>
      toCmsDoc<ArticleData>(d.id, { ...d.data(), uid: d.id } as ArticleData & { uid: string })
    )
  }

  /** Single article by uid */
  async function getArticleByUid(uid: string): Promise<CmsDocument<ArticleData> | null> {
    const ref = doc(db, 'articles', uid)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    const data = snap.data() as ArticleData
    return toCmsDoc<ArticleData>(snap.id, { ...data, uid: snap.id })
  }

  return {
    getHome,
    getAllEvents,
    getEventByUid,
    getAllOurTemple,
    getOurTempleByUid,
    getAllArticles,
    getArticleByUid,
  }
}
