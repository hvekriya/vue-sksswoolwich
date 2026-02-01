<template>
  <main id="content" role="main" class="min-h-screen">
    <!-- Hero Section -->
    <ImageSlider :fields="fields" />

    <UContainer class="py-12">
      <!-- Alert Section (Separate Row) -->
      <div class="mb-8">
        <CommonAlert :fields="fields" />
      </div>

      <!-- Dynamic Main Section: items-stretch matches heights -->
      <section
        class="grid grid-cols-1 gap-8 mb-16 items-stretch transition-all duration-500"
        :class="[isLive ? 'lg:grid-cols-3' : 'lg:grid-cols-2']"
      >
        <!-- col 1: Live Stream (Conditional) -->
        <div v-if="isLive" class="w-full h-[600px]">
          <LiveStream :fields="fields" class="h-full" />
        </div>

        <!-- col 2: Announcements -->
        <div class="w-full h-[600px] flex flex-col">
          <!-- Announcement Card stretching to full height -->
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
                  <UIcon
                    name="i-heroicons-megaphone"
                    class="w-5 h-5 text-temple-red-500"
                  />
                  <h3 class="font-serif font-bold text-gray-400">Announcements</h3>
                </div>
              </template>

              <div class="flex-1 overflow-y-auto custom-scrollbar">
                <AnnouncementList />
              </div>
            </UCard>
          </div>
        </div>

        <!-- col 3: Opening Times -->
        <div class="w-full h-[600px]">
          <OpeningTimes />
        </div>
      </section>

      <!-- Upcoming Events -->
      <section class="mb-24">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-4xl font-serif font-bold text-gray-400 mb-2">
              Upcoming Events
            </h2>
            <div
              class="w-24 h-1 bg-gradient-to-r from-golden-500 to-temple-red-500 rounded-full"
            ></div>
          </div>
          <UButton
            to="/events"
            size="lg"
            label="See All Events"
            icon="i-heroicons-calendar-days"
            class="rounded-full shadow-lg shadow-golden-500/20"
          />
        </div>

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
      </section>

      <!-- Photostream Section -->
      <section
        class="relative overflow-hidden p-8 lg:p-12 rounded-[3rem] bg-gray-900 text-white group"
      >
        <!-- Abstract Background -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-golden-500/10 blur-[100px] rounded-full"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-temple-red-500/10 blur-[100px] rounded-full"
        ></div>

        <div
          class="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div class="max-w-xl">
            <h2 class="text-4xl font-serif font-bold mb-4 text-golden-900">
              Photostream
            </h2>
            <p class="text-gray-300 text-lg leading-relaxed">
              Explore daily Darshan and recent events through our lens. Can you spot
              yourself in the celebrations?
            </p>
          </div>
          <div>
            <!-- <UBadge color="temple-red" variant="soft" label="Venues & Hire" class="mb-4 rounded-full px-4" /> -->
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
        </div>

        <Suspense>
          <template #default>
            <LazyRecentUploads :recent-uploads="recentUploads" />
          </template>
          <template #fallback>
            <div class="flex space-x-4">
              <USkeleton
                v-for="i in 5"
                :key="i"
                class="h-40 w-40 rounded-2xl flex-shrink-0"
              />
            </div>
          </template>
        </Suspense>
      </section>
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import { useFilters } from "~/composables/useFilters";
const { client } = usePrismic();
const { isSameOrAfter } = useFilters();
const config = useRuntimeConfig();

// Fallback data – always return this from the fetcher on error so no Nuxt error is serialized (avoids composable-on-revive)
const fallbackPayload = () => ({
  upcomingEvents: [],
  recentUploads: [],
  liveStreamUrl: null,
  fields: {
    slices: [
      {
        slice_type: "hero_section",
        primary: {
          title: [{ type: "heading1", text: "Welcome to Woolwich Temple", spans: [] }],
          description: [
            {
              type: "paragraph",
              text: "Prismic content is currently unavailable. This is a placeholder.",
              spans: [],
            },
          ],
        },
      },
    ],
  },
});

// SEO Data
useSeoMeta({
  title: "Home | Woolwich Temple",
  description:
    "Welcome to Shree Swaminarayan Mandir Woolwich. Join us for Live Darshan, events, and spiritual satsang.",
  ogImage:
    "https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format",
});

const { data } = await useAsyncData("home-page-data", async () => {
  try {
    if (!client) {
      // On client hydration Prismic plugin may not be ready yet; use server payload so initial render shows content
      if (import.meta.client) {
        const cached = useNuxtApp().payload?.data?.["home-page-data"];
        if (cached) return cached;
      }
      if (import.meta.dev)
        console.warn("Prismic client unavailable. Using fallback data.");
      return fallbackPayload();
    }

    const [document, eventsFromPrismic] = await Promise.all([
      client?.getSingle?.("home").catch(() => null) ?? null,
      client?.getAllByType?.("events").catch(() => []) ?? [],
    ]);

    if (!document) {
      // On client hydration use server payload if we have it (avoid overwriting with fallback)
      if (import.meta.client) {
        const cached = useNuxtApp().payload?.data?.["home-page-data"];
        if (cached) return cached;
      }
      if (import.meta.dev)
        console.warn("Prismic Home document not found. Using fallback data.");
      return fallbackPayload();
    }

    const today = new Date().toISOString().split("T")[0];
    const upcomingEvents = eventsFromPrismic
      .filter((event: any) => isSameOrAfter(event.data.event_date, today))
      .sort(
        (a: any, b: any) =>
          new Date(a.data.event_date).getTime() - new Date(b.data.event_date).getTime()
      )
      .slice(0, 6);

    const flickrConfig = {
      api_key: config.public.flickrApiKey,
      user_id: config.public.flickrUserId,
      format: "json",
      nojsoncallback: "1",
    };
    const flickrUrl = config.public.flickrUrl;
    const unixTimeStamp = Math.floor(Date.now() / 1000) - 86400 * 5;

    let recentUploads: any[] = [];
    try {
      const recentPhotos = await $fetch<any>(flickrUrl, {
        params: {
          ...flickrConfig,
          method: "flickr.photos.search",
          min_date_upload: unixTimeStamp,
          per_page: 14,
          extras: "url_n,url_o,tags",
        },
      });
      recentUploads = recentPhotos?.photos?.photo ?? [];
    } catch {
      // Flickr optional; keep Prismic data
    }

    const liveStreamUrl =
      document.data?.live_stream_url?.url || document.data?.live_stream_url || null;

    return {
      upcomingEvents,
      recentUploads,
      liveStreamUrl,
      fields: {
        slices: document.data.body,
      },
    };
  } catch (e) {
    if (import.meta.dev) console.warn("Home page data error, using fallback:", e);
    return fallbackPayload();
  }
});

// Reactive payload so client sees data when it updates
const payload = computed(() => (data.value ?? fallbackPayload()) as any);
const upcomingEvents = computed(() => payload.value.upcomingEvents ?? []);
const recentUploads = computed(() => payload.value.recentUploads ?? []);
const fields = computed(() => payload.value.fields);
const liveStreamUrl = computed(() => payload.value.liveStreamUrl ?? null);
const isLive = computed(() => !!liveStreamUrl.value);

// On initial client load Prismic plugin may not be ready; refetch once mounted so content loads
onMounted(() => {
  if (!import.meta.client) return;
  const firstDesc =
    payload.value.fields?.slices?.[0]?.primary?.description?.[0]?.text ?? "";
  if (firstDesc.includes("Prismic content is currently unavailable")) {
    refreshNuxtData("home-page-data");
  }
});
</script>

<style scoped>
.announcement-card :deep(.announcements-list) {
  @apply h-full overflow-y-auto px-4;
}

/* Custom fade animations for smooth entry */
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

section {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
