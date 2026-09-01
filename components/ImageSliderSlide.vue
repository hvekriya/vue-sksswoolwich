<template>
  <div
    class="relative w-full"
    :class="contained ? 'h-full min-h-0' : 'min-h-[70svh] lg:h-full lg:min-h-0'"
  >
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
      class="z-10 flex items-end justify-start px-0 pt-28 pb-10 sm:pt-32 sm:pb-12"
      :class="
        contained
          ? 'absolute inset-0 lg:items-start lg:pt-56 lg:pb-16'
          : 'relative min-h-[70svh] lg:absolute lg:inset-0 lg:min-h-0 lg:items-start lg:pt-56 lg:pb-16'
      "
    >
      <div class="container mx-auto w-full px-4 lg:px-8">
        <div
          class="max-w-2xl rounded-3xl border border-white/25 bg-white/25 p-5 shadow-2xl backdrop-blur-md animate-fade-in-up dark:border-white/10 dark:bg-black/35 sm:p-8 lg:p-12"
        >
          <span
            class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/20 px-3 py-1.5 text-white backdrop-blur-md shadow-lg border border-white/20 mb-4 sm:text-sm sm:px-4 sm:mb-6"
          >
            <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
            {{ greeting }}
          </span>
          <div
            class="text-white text-xl sm:text-2xl lg:text-4xl font-serif font-bold mb-4 sm:mb-6 leading-tight"
          >
            <CmsRichText :field="slide.title" />
          </div>
          <div class="flex flex-wrap gap-3 sm:gap-4">
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
  contained?: boolean
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
