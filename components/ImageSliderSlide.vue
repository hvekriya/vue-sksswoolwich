<template>
  <div class="relative flex min-h-[70svh] w-full flex-col justify-end lg:block lg:h-full lg:min-h-0">
    <img
      v-if="slide.image?.url"
      :src="slide.image.url"
      :alt="slide.image.alt || 'Temple Image'"
      :fetchpriority="isLcp ? 'high' : undefined"
      :loading="isLcp ? 'eager' : 'lazy'"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover object-top lg:object-center"
    />
    <div v-else class="absolute inset-0 bg-gray-900" />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15 lg:bg-gradient-to-r lg:from-black/35 lg:via-black/10 lg:to-transparent"
    />

    <div
      class="relative z-10 w-full px-4 pb-6 pt-28 lg:absolute lg:inset-0 lg:flex lg:items-start lg:px-8 lg:pb-16 lg:pt-[max(18rem,calc(env(safe-area-inset-top,0px)+13.5rem))]"
    >
      <div class="container mx-auto w-full">
        <div
          class="max-w-2xl rounded-3xl border border-white/25 bg-black/45 p-5 shadow-2xl backdrop-blur-md animate-fade-in-up dark:border-white/10 dark:bg-black/45 lg:bg-white/25 lg:p-12 lg:dark:bg-black/35"
        >
          <span
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-md lg:mb-6 lg:px-4 lg:py-1.5 lg:text-sm lg:tracking-wider"
          >
            <UIcon name="i-heroicons-sparkles" class="h-4 w-4 shrink-0" />
            {{ greeting }}
          </span>
          <div
            class="mb-4 text-xl font-serif font-bold leading-tight text-white lg:mb-6 lg:text-4xl"
          >
            <CmsRichText :field="slide.title" />
          </div>
          <div class="flex flex-wrap gap-3 lg:gap-4">
            <UButton
              size="lg"
              color="primary"
              label="Bhaktiras"
              to="https://www.bhaktiras.sksswoolwich.org"
              class="lg:px-5 lg:py-3 lg:text-base"
            />
            <UButton
              size="lg"
              variant="outline"
              color="white"
              label="Upcoming Events"
              to="/events"
              class="lg:px-5 lg:py-3 lg:text-base"
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
