<template>
  <main id="content" role="main" class="min-h-screen">
    <!-- Hero in critical path – sourced from cms_home/home.body (hero_section slice) -->
    <ImageSlider :fields="heroFields" />

    <!-- Below-the-fold content + data fetch in lazy chunk (Firebase, useCms, etc.) -->
    <LazyHomePageContent />
  </main>
</template>

<script setup lang="ts">
import { normalizeEmbeddableVideoUrl } from '~/lib/youtube'

const payloadState = useState<{
  fields?: { slices: any[] }
  upcomingEvents?: any[]
  recentUploads?: any[]
  liveStreamUrl?: string | null
} | null>('home-page-payload', () => null)

const cms = useCms()

// Ensure hero is sourced from cms_home/home.body[0].primary.image (hero_section slice)
const { data: homeDoc, refresh: refreshHomeDoc } = await useAsyncData('home-hero', async () => {
  try {
    const doc = await cms.getHome().catch(() => null)
    if (!doc?.data?.body?.length) return null

    const slices = doc.data.body ?? []
    const rawLive =
      (doc.data as any)?.live_stream_url?.url ||
      (doc.data as any)?.live_stream_url ||
      ''
    const normalizedLive = normalizeEmbeddableVideoUrl(typeof rawLive === 'string' ? rawLive : '')

    return { slices, liveStreamUrl: normalizedLive.url || null }
  } catch {
    return null
  }
})

// If SSR couldn't fetch (common if Firestore isn't available server-side), retry on client.
onMounted(async () => {
  if (!homeDoc.value) await refreshHomeDoc()
})

watch(
  homeDoc,
  (v: { slices: any[]; liveStreamUrl: string | null } | null) => {
    if (!v) return
    payloadState.value = {
      ...(payloadState.value ?? {}),
      fields: { slices: v.slices },
      liveStreamUrl: v.liveStreamUrl,
    }
  },
  { immediate: true }
)

const heroFields = computed(() => payloadState.value?.fields ?? { slices: [] })

useSeoMeta({
  title: 'Home | Woolwich Temple',
  description: 'Welcome to Shree Swaminarayan Mandir Woolwich. Join us for Live Darshan, events, and spiritual satsang.',
  ogImage: 'https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format',
})
</script>

<style scoped>
section {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
