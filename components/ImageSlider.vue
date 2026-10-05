<template>
  <div class="hero-under-nav relative min-h-[70svh] w-full overflow-hidden bg-gray-950 lg:h-[80vh] lg:min-h-0">
    <LazyImageSliderCarousel
      v-if="slides.length >= 2"
      :slides="slides"
      :greeting="greeting"
    />
    <ImageSliderSlide
      v-else
      :slide="slides[0]"
      :greeting="greeting"
      is-lcp
    />

    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block"
    >
      <UIcon name="i-heroicons-chevron-double-down" class="w-8 h-8 text-white/50" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  fields: any;
}>();

const defaultSlide = () => ({
  image: {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sksswoolwich.appspot.com/o/cms%2Fcms_home%2Fhome%2Fhero.jpg?alt=media&token=fcee1582-c55c-4a20-86b3-fae87e6fbb06",
    alt: "Welcome to SKSS Temple Woolwich",
  },
  title: [{ type: "heading1", text: "Jay Swaminarayan", spans: [] }],
  description: [
    {
      type: "paragraph",
      text: "Shree KS Swaminarayan Temple Woolwich",
      spans: [],
    },
  ],
});

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
  return url ? { url, alt: img?.alt || "Temple" } : { url: "", alt: "" };
};

const slides = computed(() => {
  const slices = props.fields?.slices || [];
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

const now = ref<Date | null>(null);
let refreshTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  now.value = new Date();
  refreshTimer = setInterval(() => {
    now.value = new Date();
  }, 60 * 1000);
});

onBeforeUnmount(() => {
  if (refreshTimer) clearInterval(refreshTimer);
});

const greeting = computed(() => {
  const date = now.value ?? new Date();
  const hour = date.getHours();
  if (hour < 5) return "Peaceful Night Blessings";
  if (hour < 12) return "Good Morning – Join Darshan";
  if (hour < 17) return "Good Afternoon – Stay Inspired";
  if (hour < 21) return "Good Evening – Satsang Awaits";
  return "Night Reflections – Jay Swaminarayan";
});

const lcpUrl = computed(() => slides.value[0]?.image?.url || "");
useHead(() => ({
  link: lcpUrl.value
    ? [{ rel: "preload", as: "image", href: lcpUrl.value, fetchpriority: "high" }]
    : [],
}));
</script>
