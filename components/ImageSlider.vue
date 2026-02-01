<template>
  <div class="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
      :slides-per-view="1"
      :loop="slides.length >= 2"
      :effect="'fade'"
      :autoplay="
        slides.length >= 2 ? { delay: 5000, disableOnInteraction: false } : false
      "
      :pagination="slides.length > 1 ? { clickable: true } : false"
      class="h-full w-full"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative h-full w-full">
          <!-- Slide Image -->
          <img
            v-if="slide.image?.url"
            :src="slide.image.url"
            :alt="slide.image.alt || 'Temple Image'"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div v-else class="absolute inset-0 bg-gray-900" />

          <!-- Overlay Gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
          ></div>

          <!-- Content Overlay -->
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4 lg:px-8">
              <div
                class="max-w-2xl glass-effect p-8 lg:p-12 rounded-3xl animate-fade-in-up"
              >
                <!-- Wrapper div only: let PrismicRichText render block type (h1/p/etc) so SSR and client match -->
                <div
                  class="text-white text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
                >
                  <prismic-rich-text :field="slide.title" />
                </div>
                <div class="text-gray-200 text-lg mb-8 leading-relaxed">
                  <prismic-rich-text :field="slide.description" />
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
      </SwiperSlide>
    </Swiper>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block"
    >
      <UIcon name="i-heroicons-chevron-double-down" class="w-8 h-8 text-white/50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectFade as SwiperEffectFade,
  Pagination as SwiperPagination,
} from "swiper/modules";

// Import Swiper styles in Nuxt are usually handled via build/css but can be manual
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const props = defineProps<{
  fields: any;
}>();

// Default single slide when Prismic has no slides (avoids empty hero + Swiper loop warning)
const defaultSlide = () => ({
  image: {
    url:
      "https://images.prismic.io/sksswoolwich/c1acd8d9-7ccb-4f1b-bcc1-57ceb5ada080_39972331571_6d6de90849_o.png?auto=compress,format",
    alt: "Woolwich Temple",
  },
  title: [{ type: "heading1", text: "Jay Swaminarayan", spans: [] }],
  description: [
    { type: "paragraph", text: "Shree KS Swaminarayan Temple Woolwich", spans: [] },
  ],
});

// Extract slides from Prismic: hero_slider/image_slider items, or single hero_section primary, or one default
const slides = computed(() => {
  const slices = props.fields?.slices || [];
  // Multi-slide: hero_slider or image_slider
  const sliderSlice = slices.find(
    (s: any) => s.slice_type === "hero_slider" || s.slice_type === "image_slider"
  );
  if (sliderSlice?.items?.length) return sliderSlice.items;
  // Single slide: hero_section (primary = one slide)
  const heroSection = slices.find((s: any) => s.slice_type === "hero_section");
  if (heroSection?.primary) {
    const p = heroSection.primary;
    return [
      {
        image: p.image || {},
        title: p.title || [],
        description: p.description || [],
      },
    ];
  }
  return [defaultSlide()];
});
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
