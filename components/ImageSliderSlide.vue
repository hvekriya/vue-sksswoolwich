<template>
  <div class="relative h-full w-full">
    <img
      v-if="slide.image?.url"
      :src="slide.image.url"
      :alt="slide.image.alt || 'Temple Image'"
      :fetchpriority="isLcp ? 'high' : undefined"
      :loading="isLcp ? 'eager' : 'lazy'"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div v-else class="absolute inset-0 bg-gray-900" />

    <div
      class="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent lg:from-black/25"
    />

    <div
      class="absolute inset-0 flex items-start justify-start pb-10 pt-[max(16rem,calc(env(safe-area-inset-top,0px)+12rem))] lg:pb-16 lg:pt-[max(18rem,calc(env(safe-area-inset-top,0px)+13.5rem))]"
    >
      <div class="container mx-auto w-full px-4 lg:px-8">
        <div
          class="max-w-2xl rounded-3xl border border-white/25 bg-white/25 p-8 shadow-2xl backdrop-blur-md animate-fade-in-up dark:border-white/10 dark:bg-black/35 lg:p-12"
        >
          <span
            class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider rounded-full bg-white/20 px-4 py-1.5 text-white backdrop-blur-md shadow-lg border border-white/20 mb-6"
          >
            <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
            {{ greeting }}
          </span>
          <div
            class="text-white text-2xl lg:text-4xl font-serif font-bold mb-6 leading-tight"
          >
            <CmsRichText :field="slide.title" />
          </div>
          <div class="flex flex-wrap gap-4">
            <UButton
              size="xl"
              color="primary"
              label="Bhaktiras"
              to="https://www.bhaktiras.sksswoolwich.org"
            />
            <UButton
              size="xl"
              variant="outline"
              color="white"
              label="Upcoming Events"
              to="/events"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  slide: {
    image?: { url?: string; alt?: string }
    title?: unknown
  }
  greeting: string
  isLcp?: boolean
}>()
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
