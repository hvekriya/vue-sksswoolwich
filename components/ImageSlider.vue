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
            class="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent"
          ></div>

          <!-- Content Overlay -->
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4 lg:px-8">
              <div
                class="max-w-2xl glass-effect p-8 lg:p-12 rounded-3xl animate-fade-in-up"
              >
                <!-- Wrapper div only: let PrismicRichText render block type (h1/p/etc) so SSR and client match -->
                <div
                  class="text-white text-2xl lg:text-4xl font-serif font-bold mb-6 leading-tight"
                >
                  <prismic-rich-text :field="slide.title" />
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

// Normalize Prismic image (supports various field names and shapes)
const normalizeImage = (obj: any): { url: string; alt: string } => {
  const img =
    obj?.image ||
    obj?.hero_image ||
    obj?.banner ||
    obj?.banner_image ||
    obj?.slide_image ||
    obj?.gallery_image ||
    {};
  if (typeof img === "string") return { url: img, alt: "Temple" };
  const url = img?.url || img?.src;
  return url ? { url, alt: img?.alt || "Temple" } : defaultSlide().image;
};

// Extract slides from Prismic: hero_slider/image_slider items, or single hero_section primary, or one default
const slides = computed(() => {
  const slices = props.fields?.slices || [];
  // Multi-slide: hero_slider or image_slider
  const sliderSlice = slices.find(
    (s: any) => s.slice_type === "hero_slider" || s.slice_type === "image_slider"
  );
  if (sliderSlice?.items?.length) {
    return sliderSlice.items.map((item: any) => ({
      image: normalizeImage(item),
      title: item.image_captions || item.image_caption || item.title || [],
      description: item.description || [],
    }));
  }
  // Single slide: hero_section (primary = one slide)
  const heroSection = slices.find((s: any) => s.slice_type === "hero_section");
  if (heroSection?.primary) {
    const p = heroSection.primary;
    return [
      {
        image: normalizeImage(p),
        title: p.image_captions || p.image_caption || p.title || [],
        description: p.description || [],
      },
    ];
  }
  // Fallback: image_gallery slice (use gallery images as slides)
  const gallerySlice = slices.find(
    (s: any) => s.slice_type === "image_gallery" || s.slice_type === "image-gallery"
  );
  if (gallerySlice?.items?.length) {
    return gallerySlice.items.map((item: any) => ({
      image: normalizeImage(item),
      title:
        item.image_captions || item.image_caption || item.title || item.caption || [],
      description: item.description || [],
    }));
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
