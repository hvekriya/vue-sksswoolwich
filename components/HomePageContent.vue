<template>
  <UContainer class="py-12">
    <div class="mb-8">
      <LazyCommonAlert :fields="fields" />
    </div>

    <section
      class="grid grid-cols-1 gap-8 mb-16 items-stretch transition-all duration-500"
      :class="[isLive ? 'lg:grid-cols-3' : 'lg:grid-cols-2']"
    >
      <div v-if="isLive" class="w-full h-[600px]">
        <LazyLiveStream :fields="fields" class="h-full" />
      </div>

      <div class="w-full h-[600px] flex flex-col">
        <div class="flex-1 min-h-0">
          <UCard
            class="glass-effect border-golden-500/20 h-full flex flex-col"
            :ui="{
              body: { padding: 'p-0 overflow-hidden flex flex-col flex-1' },
              header: { base: 'bg-golden-500/5' },
            }"
          >
            <template #header>
              <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-megaphone" class="w-5 h-5 text-temple-red-500" />
                <h3 class="font-serif font-bold text-temple-red-500 dark:text-gray-400">Announcements</h3>
              </div>
            </template>
            <div class="flex-1 overflow-y-auto custom-scrollbar">
              <ClientOnly>
                <LazyAnnouncementList />
                <template #fallback>
                  <div class="flex items-center justify-center h-48">
                    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-golden-500" />
                  </div>
                </template>
              </ClientOnly>
            </div>
          </UCard>
        </div>
      </div>

      <div class="w-full h-[600px]">
        <LazyOpeningTimes />
      </div>
    </section>

    <section class="mb-24">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-4xl font-serif font-bold text-gray-400 mb-2">Upcoming Events</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-golden-500 to-temple-red-500 rounded-full"></div>
        </div>
        <UButton
          to="/events"
          size="lg"
          label="See All Events"
          icon="i-heroicons-calendar-days"
          class="rounded-full shadow-lg shadow-golden-500/20"
        />
      </div>
      <ClientOnly>
        <Suspense>
          <template #default>
            <LazyUpcomingEvents :upcoming-events="upcomingEvents" />
          </template>
          <template #fallback>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <USkeleton v-for="i in 3" :key="i" class="h-96 w-full rounded-3xl" />
            </div>
          </template>
        </Suspense>
        <template #fallback>
          <div class="upcoming-events-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <USkeleton v-for="i in 3" :key="i" class="h-96 w-full rounded-3xl" />
          </div>
        </template>
      </ClientOnly>
    </section>

    <section
      class="relative overflow-hidden p-8 lg:p-12 rounded-[3rem] bg-gray-900 text-white group"
    >
      <div class="absolute top-0 right-0 w-64 h-64 bg-golden-500/10 blur-[100px] rounded-full"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-temple-red-500/10 blur-[100px] rounded-full"></div>
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div class="max-w-xl">
          <h2 class="text-4xl font-serif font-bold mb-4 text-gray-400">Photostream</h2>
          <p class="text-gray-300 text-lg leading-relaxed">
            Explore daily Darshan and recent events through our lens.
          </p>
        </div>
        <UButton
          to="/events/past"
          size="xl"
          variant="outline"
          color="golden"
          label="View Past Gallery"
          trailing-icon="i-heroicons-arrow-right"
          class="rounded-full px-8"
        />
      </div>
      <Suspense>
        <template #default>
          <LazyRecentUploads :recent-uploads="recentUploads" />
        </template>
        <template #fallback>
          <div class="flex space-x-4">
            <USkeleton v-for="i in 5" :key="i" class="h-40 w-40 rounded-2xl flex-shrink-0" />
          </div>
        </template>
      </Suspense>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
import { useFilters } from '~/composables/useFilters'
import { normalizeEmbeddableVideoUrl } from '~/lib/youtube'

const payloadState = useState<ReturnType<typeof fallbackPayload> | null>('home-page-payload', () => null)

function fallbackPayload() {
  return {
    upcomingEvents: [] as any[],
    recentUploads: [] as any[],
    liveStreamUrl: null as string | null,
    fields: {
      slices: [
        {
          slice_type: 'hero_section',
          primary: {
            image: {
              url: '',
              alt: '',
            },
            title: [],
            description: [],
          },
        },
      ],
    },
  }
}

const { data, refresh } = await useAsyncData('home-page-data', async () => {
  const cms = useCms()
  const { isSameOrAfter } = useFilters()
  try {
    // If the page already fetched home slices for the hero, reuse them to avoid a second Firestore call.
    const existingSlices = payloadState.value?.fields?.slices
    const hasRealHero = !!existingSlices?.some(
      (s: any) => s?.slice_type === 'hero_section' && s?.primary?.image?.url
    )
    const [document, eventsFromCms] = await Promise.all([
      hasRealHero ? Promise.resolve(null) : cms.getHome().catch(() => null),
      cms.getAllEvents().catch(() => []),
    ])

    const today = new Date().toISOString().split('T')[0]
    const upcomingEvents = eventsFromCms
      .filter((e: any) => isSameOrAfter(e.data.event_date, today))
      .sort((a: any, b: any) => new Date(a.data.event_date).getTime() - new Date(b.data.event_date).getTime())
      .slice(0, 6)
    let recentUploads: any[] = []
    try {
      const { fetchRecentPhotos } = useFlickr()
      recentUploads = await fetchRecentPhotos(14)
    } catch {}
    // If we don't have a fresh home document (e.g. we reused hero slices), still return events and recent uploads.
    if (!document) {
      const liveFromState = payloadState.value?.liveStreamUrl ?? null
      const slicesForFields =
        hasRealHero && existingSlices?.length ? existingSlices : fallbackPayload().fields.slices

      return {
        upcomingEvents,
        recentUploads,
        liveStreamUrl: liveFromState,
        fields: { slices: slicesForFields },
      }
    }

    // We have a document: compute live stream URL and slices from it.
    const liveField = document.data?.live_stream_url as string | { url?: string } | undefined
    let liveStreamUrl = typeof liveField === 'string' ? liveField : liveField?.url || null
    if (!liveStreamUrl && document.data?.body?.length) {
      const videoSlice = document.data.body.find((s: any) => s.slice_type === 'video' && s.primary?.live_stream_enabled)
      const link = (videoSlice?.primary as { live_stream_link?: { url?: string } } | undefined)?.live_stream_link
      if (link?.url) liveStreamUrl = link.url
    }

    const normalized = normalizeEmbeddableVideoUrl(typeof liveStreamUrl === 'string' ? liveStreamUrl : '')

    return {
      upcomingEvents,
      recentUploads,
      liveStreamUrl: normalized.url || null,
      fields: { slices: document.data.body ?? [] },
    }
  } catch (e) {
    return fallbackPayload()
  }
})

watch(
  data,
  (v: any) => {
    if (v) payloadState.value = v
  },
  { immediate: true }
)

const payload = computed(() => payloadState.value ?? fallbackPayload())
const fields = computed(() => payload.value.fields)
const upcomingEvents = computed(() => payload.value.upcomingEvents ?? [])
const isLive = computed(() => !!payload.value.liveStreamUrl)
const flickrPhotoList = ref<any[]>([])
const recentUploads = computed(() => payload.value.recentUploads?.length ? payload.value.recentUploads : flickrPhotoList.value)

onMounted(async () => {
  // If SSR returned fallback data, refresh on client to get Firebase CMS data.
  const heroUrl =
    payloadState.value?.fields?.slices?.find((s: any) => s?.slice_type === 'hero_section')?.primary
      ?.image?.url || ''
  if (!heroUrl) {
    try {
      await refresh()
    } catch {}
  }
  if (!payload.value.recentUploads?.length) {
    try {
      const { fetchRecentPhotos } = useFlickr()
      flickrPhotoList.value = await fetchRecentPhotos(14)
    } catch {}
  }
})
</script>

<style scoped>
.announcement-card :deep(.announcements-list) {
  @apply h-full overflow-y-auto px-4;
}
</style>
