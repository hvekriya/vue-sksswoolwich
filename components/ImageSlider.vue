<template>
  <div class="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      :effect="'fade'"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      class="h-full w-full"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative h-full w-full">
          <!-- Slide Image -->
          <img 
            :src="slide.image.url" 
            :alt="slide.image.alt || 'Temple Image'" 
            class="absolute inset-0 h-full w-full object-cover"
          />
          
          <!-- Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          
          <!-- Content Overlay -->
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4 lg:px-8">
              <div class="max-w-2xl glass-effect p-8 lg:p-12 rounded-3xl animate-fade-in-up">
                <h2 class="text-golden-900 font-display text-lg lg:text-xl font-bold tracking-widest uppercase mb-4">
                  Welcome to Woolwich Temple
                </h2>
                <h1 class="text-white text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                  <prismic-rich-text :field="slide.title" />
                </h1>
                <p class="text-gray-200 text-lg mb-8 leading-relaxed">
                  <prismic-rich-text :field="slide.description" />
                </p>
                <div class="flex flex-wrap gap-4">
                  <UButton
                    size="xl"
                    color="primary"
                    label="Live Darshan"
                    icon="i-heroicons-play-circle"
                    to="/live"
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
      </SwiperSlide>
    </Swiper>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block">
      <UIcon name="i-heroicons-chevron-double-down" class="w-8 h-8 text-white/50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade, Pagination as SwiperPagination } from 'swiper/modules'

// Import Swiper styles in Nuxt are usually handled via build/css but can be manual
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const props = defineProps<{
  fields: any
}>()

// Extract slides from Prismic fields
const slides = computed(() => {
  const heroSlice = props.fields?.slices?.find((s: any) => s.slice_type === 'hero_slider' || s.slice_type === 'image_slider')
  return heroSlice?.items || []
})
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

:deep(.swiper-pagination-bullet) {
  @apply bg-white/50 w-3 h-3 transition-all duration-300;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-golden-500 w-8 rounded-full;
}
</style>
