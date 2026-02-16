<template>
  <div class="live-darshan-page min-h-screen text-white">
    <!-- Immersive Header -->
    <header class="relative py-12 lg:py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-golden-500/10 rounded-full blur-[160px]"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] bg-temple-red-500/10 rounded-full blur-[160px]"
        ></div>
      </div>

      <UContainer class="relative z-10 text-center">
        <div
          class="inline-flex items-center space-x-3 bg-red-600/20 text-red-500 px-4 py-2 rounded-full mb-8 border border-red-500/30"
        >
          <span class="relative flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-900 opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <span class="text-xs font-bold tracking-[0.2em] uppercase"
            >Live from the Mandir</span
          >
        </div>
        <h1 class="text-5xl lg:text-7xl font-serif font-bold mb-6">
          Daily <span class="text-golden-900">Live Katha</span>
        </h1>
        <p
          class="text-gray-900 dark:text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          Bringing the divine atmosphere of the Mandir into your home. Join us for daily
          rituals, Aarti, and spiritual discourses.
        </p>
      </UContainer>
    </header>

    <!-- Main Content -->
    <UContainer class="pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Live Video Section -->
        <div class="lg:col-span-8">
          <UCard
            class="glass-effect rounded-[3rem] border-white/10 overflow-hidden shadow-2xl bg-black/60 p-0"
          >
            <div class="relative aspect-video">
              <iframe
                width="100%"
                height="100%"
                :src="liveStreamUrl"
                title="Live Darshan Stream"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="hover:brightness-110 transition-all duration-500"
              ></iframe>
            </div>
          </UCard>

          <div class="mt-8 flex flex-wrap gap-4 items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-users" class="text-gray-500" />
                <span class="text-sm font-medium text-gray-300">Live Community</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="text-gray-500" />
                <span class="text-sm font-medium text-gray-300">Active Chat</span>
              </div>
            </div>

            <div class="flex gap-4">
              <UButton
                to="https://www.youtube.com/channel/UC8T_9l66vKq-k7Nre6PToFA"
                target="_blank"
                color="white"
                variant="soft"
                icon="i-simple-icons-youtube"
                label="Subscribe on YouTube"
                class="rounded-full"
              />
            </div>
          </div>
        </div>

        <!-- Schedule & Info -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Timings Card -->
          <div
            class="p-8 bg-golden-500/5 border border-golden-500/10 rounded-[2.5rem] backdrop-blur-md shadow-xl"
          >
            <h3
              class="text-2xl font-serif font-bold text-golden-900 dark:text-gray-400 mb-2 flex items-center gap-3"
            >
              <UIcon name="i-heroicons-clock" />
              Daily Schedule
            </h3>
            <div class="w-12 h-1 bg-golden-500/30 rounded-full mb-8"></div>

            <div class="space-y-6">
              <div
                v-for="(time, index) in schedule"
                :key="index"
                class="flex justify-between items-center group/item border-b border-white/5 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <h4
                    class="font-bold text-white group-hover/item:text-golden-900 transition-colors"
                  >
                    {{ time.event }}
                  </h4>
                  <p class="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    {{ time.type }}
                  </p>
                </div>
                <div class="text-right">
                  <span
                    class="font-mono text-golden-900 dark:text-gray-400 font-bold bg-golden-500/10 px-3 py-1 rounded-lg border border-golden-500/20"
                    >{{ time.start }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Social Share -->
          <div class="p-8 glass-effect rounded-[2.5rem] border-white/10">
            <h4 class="font-bold text-white dark:text-gray-400 mb-4">Share Darshan</h4>
            <p class="text-sm text-gray-900 dark:text-gray-400 mb-6">
              Invite your family and friends to join the live stream.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <UButton
                color="blue"
                variant="soft"
                icon="i-simple-icons-facebook"
                label="Facebook"
                class="rounded-xl"
              />
              <UButton
                color="green"
                variant="soft"
                icon="i-simple-icons-whatsapp"
                label="WhatsApp"
                class="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();

const defaultStreamUrl =
  "https://www.youtube.com/embed/live_stream?channel=UC8T_9l66vKq-k7Nre6PToFA";

const { data } = await useAsyncData("live-stream-url", async () => {
  try {
    if (import.meta.server) return defaultStreamUrl;
    const doc = await cms.getHome().catch(() => null);
    if (!doc) return defaultStreamUrl;

    let url = doc.data?.live_stream_url?.url || doc.data?.live_stream_url || null;

    if (!url && doc.data?.body?.length) {
      const videoSlice = doc.data.body.find(
        (s: any) => s.slice_type === "video" && s.primary?.live_stream_enabled === true
      );
      const link = videoSlice?.primary?.live_stream_link;
      if (link?.url) url = link.url;
    }

    return url || defaultStreamUrl;
  } catch {
    return defaultStreamUrl;
  }
});

const liveStreamUrl = computed(() => data.value ?? defaultStreamUrl);

const schedule = [
  { event: "Morning Aarti", start: "06:15 AM", type: "Daily" },
  { event: "Morning Darshan", start: "07:30 AM", type: "Daily" },
  { event: "Evening Aarti", start: "07:00 PM", type: "Daily" },
  { event: "Evening Thal", start: "07:30 PM", type: "Daily" },
  { event: "Satsang Sabha", start: "04:00 PM", type: "Sundays" },
];

useHead({
  title: "Live Darshan | Woolwich Temple",
  meta: [
    {
      name: "description",
      content:
        "Join us live for daily rituals, Aarti, and spiritual discourses from Shree Swaminarayan Mandir Woolwich.",
    },
  ],
});
</script>
