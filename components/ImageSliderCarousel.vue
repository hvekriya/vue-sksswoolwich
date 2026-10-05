<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
    :slides-per-view="1"
    :loop="slides.length >= 2"
    effect="fade"
    :autoplay="slides.length >= 2 ? { delay: 5000, disableOnInteraction: false } : false"
    :pagination="slides.length > 1 ? { clickable: true } : false"
    class="h-auto min-h-[70svh] w-full lg:h-full lg:min-h-0"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <ImageSliderSlide :slide="slide" :greeting="greeting" :is-lcp="index === 0" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectFade as SwiperEffectFade,
  Pagination as SwiperPagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

defineProps<{
  slides: Array<{ image?: { url?: string; alt?: string }; title?: unknown }>;
  greeting: string;
}>();
</script>

<style scoped>
:deep(.swiper-wrapper),
:deep(.swiper-slide) {
  height: auto;
  min-height: 70svh;
}

@media (min-width: 1024px) {
  :deep(.swiper-wrapper),
  :deep(.swiper-slide) {
    height: 100%;
    min-height: 0;
  }
}

:deep(.swiper-pagination-bullet) {
  @apply bg-white/50 w-3 h-3 transition-all duration-300;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-golden-500 w-8 rounded-full;
}
</style>
