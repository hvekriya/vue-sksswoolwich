<template>
  <div class="relative h-[50vh] lg:h-[65vh] w-full overflow-hidden rounded-[2rem]">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
      :slides-per-view="1"
      :loop="slides.length >= 2"
      :effect="'fade'"
      :autoplay="slides.length >= 2 ? { delay: 4500, disableOnInteraction: false } : false"
      :pagination="slides.length > 1 ? { clickable: true } : false"
      class="h-full w-full"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative h-full w-full">
          <img
            v-if="slide.image?.url"
            :src="slide.image.url"
            :alt="slide.image.alt || 'Wedding Hall'"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div v-else class="absolute inset-0 bg-gray-800" />

          <!-- Overlay: optional title/description from Prismic -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-10 text-white">
            <div class="max-w-2xl">
              <div v-if="slide.title?.length" class="text-2xl lg:text-4xl font-serif font-bold mb-2 leading-tight">
                <prismic-rich-text :field="slide.title" />
              </div>
              <div v-if="slide.description?.length" class="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-2">
                <prismic-rich-text :field="slide.description" />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade, Pagination as SwiperPagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const props = defineProps<{
  fields: any
}>()

const defaultSlide = () => ({
  image: { url: 'https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format', alt: 'Wedding Hall' },
  title: [],
  description: [],
})

const slides = computed(() => {
  const slices = props.fields?.slices || []
  // Hero / image slider (multi-slide with title/description)
  const sliderSlice = slices.find((s: any) => s.slice_type === 'hero_slider' || s.slice_type === 'image_slider')
  if (sliderSlice?.items?.length) return sliderSlice.items
  // Image Gallery slice – items are { image } (and optional caption/title)
  const gallerySlice = slices.find((s: any) => s.slice_type === 'image_gallery' || s.slice_type === 'image-gallery')
  if (gallerySlice?.items?.length) {
    return gallerySlice.items.map((item: any) => ({
      image: item.image || item.gallery_image || {},
      title: item.title || item.caption || [],
      description: item.description || [],
    }))
  }
  // Single hero section
  const heroSection = slices.find((s: any) => s.slice_type === 'hero_section')
  if (heroSection?.primary) {
    const p = heroSection.primary
    return [{ image: p.image || {}, title: p.title || [], description: p.description || [] }]
  }
  return [defaultSlide()]
})
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
  @apply bg-white/50 w-3 h-3 transition-all duration-300;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-golden-500 w-8 rounded-full;
}
</style>
