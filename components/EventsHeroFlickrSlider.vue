<template>
  <div
    class="events-hero-flickr-slider pointer-events-none absolute inset-0 min-h-full w-full overflow-hidden bg-gray-950"
    aria-hidden="true"
  >
    <Swiper
      v-if="displaySlides.length >= minSlidesForLoop"
      :key="swiperKey"
      :modules="[SwiperAutoplay]"
      class="h-full w-full"
      :slides-per-view="4"
      :space-between="8"
      :loop="true"
      :loop-additional-slides="4"
      :speed="900"
      :autoplay="{
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }"
      :breakpoints="{
        0: { slidesPerView: 2, spaceBetween: 6 },
        640: { slidesPerView: 3, spaceBetween: 8 },
        1024: { slidesPerView: 4, spaceBetween: 10 },
      }"
      :watch-overflow="false"
    >
      <SwiperSlide
        v-for="(photo, i) in displaySlides"
        :key="slideKey(photo, i)"
        class="!h-full"
      >
        <div class="relative h-full min-h-[12rem] w-full overflow-hidden sm:min-h-0">
          <img
            :src="tileUrl(photo)"
            alt=""
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Too few photos for Swiper loop: static row of up to 4 -->
    <div
      v-else-if="photosRaw.length"
      class="flex h-full gap-2 p-1 sm:gap-2.5"
    >
      <div
        v-for="(photo, i) in photosRaw"
        :key="slideKey(photo, i)"
        class="relative min-h-0 min-w-0 flex-1 overflow-hidden"
      >
        <img
          :src="tileUrl(photo)"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>

    <!-- Strong darkening so hero title + subtitle stay legible on busy photos -->
    <div
      class="absolute inset-0 z-[1] bg-gradient-to-b from-black/92 via-black/85 to-black/94"
    />
    <div class="absolute inset-0 z-[2] bg-black/55" />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay as SwiperAutoplay } from "swiper/modules";

import "swiper/css";

const props = withDefaults(
  defineProps<{
    /** How many recent photos to pull from Flickr */
    count?: number;
  }>(),
  {
    count: 24,
  }
);

/** Swiper loop needs enough slides vs slidesPerView (max 4) */
const minSlidesForLoop = 8;

const photosRaw = ref<Record<string, unknown>[]>([]);

/** Repeat photos if Flickr returns fewer than Swiper loop needs */
const displaySlides = computed(() => {
  const p = photosRaw.value;
  if (!p.length) return [];
  if (p.length >= minSlidesForLoop) return p;
  const out: Record<string, unknown>[] = [];
  while (out.length < minSlidesForLoop) {
    for (const x of p) {
      if (out.length >= minSlidesForLoop) break;
      out.push(x);
    }
  }
  return out;
});

function tileUrl(photo: Record<string, unknown>): string {
  const z = photo.url_z as string | undefined;
  const n = photo.url_n as string | undefined;
  const m = photo.url_m as string | undefined;
  const o = photo.url_o as string | undefined;
  if (z || n || m || o) return z || n || m || o || "";
  const server = photo.server as string | undefined;
  const id = photo.id as string | undefined;
  const secret = photo.secret as string | undefined;
  if (server && id && secret) {
    return `https://live.staticflickr.com/${server}/${id}_${secret}_z.jpg`;
  }
  return "";
}

function slideKey(photo: Record<string, unknown>, i: number) {
  return `${String(photo.id ?? i)}-${i}`;
}

const swiperKey = computed(() =>
  displaySlides.value.map((p, i) => `${String(p.id ?? "")}-${i}`).join("-")
);

onMounted(async () => {
  try {
    const { fetchRecentPhotos } = useFlickr();
    const list = await fetchRecentPhotos(
      Math.max(props.count, minSlidesForLoop + 4),
      "url_z,url_n,url_m,url_o,url_sq,tags"
    );
    const raw = Array.isArray(list) ? list : [];
    photosRaw.value = raw.filter((p) =>
      Boolean(tileUrl(p as Record<string, unknown>))
    );
  } catch {
    photosRaw.value = [];
  }
});
</script>

<style scoped>
/* Swiper slide fills hero height */
:deep(.swiper),
:deep(.swiper-wrapper) {
  height: 100%;
}
:deep(.swiper-slide) {
  height: 100%;
}
</style>
