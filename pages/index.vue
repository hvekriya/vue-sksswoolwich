<template>
  <main id="content" role="main" class="min-h-screen">
    <!-- Hero only in critical path – no Firebase/CMS here -->
    <ImageSlider :fields="heroFields" />

    <!-- Below-the-fold content + data fetch in lazy chunk (Firebase, useCms, etc.) -->
    <LazyHomePageContent />
  </main>
</template>

<script setup lang="ts">
const payloadState = useState<{
  fields?: { slices: any[] }
  upcomingEvents?: any[]
  recentUploads?: any[]
  liveStreamUrl?: string | null
} | null>('home-page-payload', () => null)

const fallbackFields = {
  slices: [
    {
      slice_type: 'hero_section',
      primary: {
        image: {
          url: 'https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format',
          alt: 'Woolwich Temple',
        },
        title: [{ type: 'heading1', text: 'Welcome to Woolwich Temple', spans: [] }],
        description: [{ type: 'paragraph', text: 'Shree KS Swaminarayan Temple Woolwich.', spans: [] }],
      },
    },
  ],
}

const heroFields = computed(() => payloadState.value?.fields ?? fallbackFields)

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
