<template>
  <div class="tv-display-portal fixed inset-0 bg-gray-950 overflow-hidden">
    <ClientOnly>
      <div class="grid grid-cols-12 h-screen">
        <!-- Left Column: Two slides stacked (top + bottom) -->
        <div
          class="col-span-8 flex flex-col bg-black border-r border-white/5 shadow-2xl z-10"
        >
          <div class="h-1/2 w-full overflow-hidden border-b border-white/5">
            <Swiper
              :modules="[SwiperAutoplay, SwiperEffectFade]"
              :slides-per-view="1"
              :loop="slideshow.length > 1"
              effect="fade"
              :autoplay="{ delay: 10000, disableOnInteraction: false }"
              class="h-full w-full"
            >
              <SwiperSlide v-for="(url, idx) in slideshow" :key="'top-' + idx">
                <img :src="url" class="w-full h-full object-contain" alt="" />
              </SwiperSlide>
              <SwiperSlide v-if="!slideshow.length">
                <div class="flex items-center justify-center h-full bg-gray-900">
                  <img
                    src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
                    class="w-48 opacity-20"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="h-1/2 w-full overflow-hidden">
            <Swiper
              :modules="[SwiperAutoplay, SwiperEffectFade]"
              :slides-per-view="1"
              :loop="pinnedPosters.length > 1"
              effect="fade"
              :autoplay="{ delay: 10000, disableOnInteraction: false }"
              class="h-full w-full"
            >
              <SwiperSlide v-for="(url, idx) in pinnedPosters" :key="'bot-' + idx">
                <img :src="url" class="w-full h-full object-contain" alt="" />
              </SwiperSlide>
              <SwiperSlide v-if="!pinnedPosters.length">
                <div class="flex items-center justify-center h-full bg-gray-900">
                  <img
                    src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
                    class="w-48 opacity-20"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <!-- Right Column: announcements with auto-scroll (same data as home page) -->
        <div class="col-span-4 bg-gray-900 flex flex-col min-h-0">
          <header class="p-6 sm:p-8 pb-4 shrink-0">
            <h3 class="text-xl sm:text-2xl font-serif font-bold text-golden-500">
              Announcements
            </h3>
          </header>
          <div class="flex-1 min-h-0 overflow-hidden px-6 sm:px-8">
            <DisplayAnnouncements />
          </div>
        </div>
      </div>

      <template #fallback>
        <div class="grid grid-cols-12 h-screen">
          <div class="col-span-8 flex flex-col bg-black border-r border-white/5">
            <div class="h-1/2 flex items-center justify-center bg-gray-900">
              <div
                class="w-24 h-24 border-2 border-golden-500/30 border-t-golden-500 rounded-full animate-spin"
              />
            </div>
            <div class="h-1/2 flex items-center justify-center bg-gray-900" />
          </div>
          <div class="col-span-4 bg-gray-900 flex flex-col min-h-0">
            <header class="p-6 sm:p-8 pb-4 shrink-0">
              <h3 class="text-xl sm:text-2xl font-serif font-bold text-golden-500">
                Announcements
              </h3>
            </header>
            <div class="flex-1 flex items-center justify-center px-6 sm:px-8">
              <p class="text-gray-500">Loading…</p>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectFade as SwiperEffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

definePageMeta({
  layout: false,
  ssr: false, // Client-only to avoid hydration mismatch (Swiper, Firebase)
});

const slideshow = ref<string[]>([]);
const pinnedPosters = ref<string[]>([]);

async function fetchPosters() {
  const firebaseStorage = useFirebaseStorage();
  if (!firebaseStorage) return;
  try {
    const slideRef = storageRef(firebaseStorage, "slideshow/");
    const slideRes = await listAll(slideRef);
    slideshow.value = await Promise.all(
      slideRes.items.map((item) => getDownloadURL(item))
    );

    const pinnedRef = storageRef(firebaseStorage, "pinned-posters/");
    const pinnedRes = await listAll(pinnedRef);
    pinnedPosters.value = await Promise.all(
      pinnedRes.items.map((item) => getDownloadURL(item))
    );
  } catch (e) {
    if (import.meta.dev) console.warn("Display: could not load slides", e);
  }
}

onMounted(() => {
  fetchPosters();
  setTimeout(() => {
    if (!slideshow.value.length && !pinnedPosters.value.length) fetchPosters();
  }, 500);
});

useHead({
  title: "Digital Signage | Woolwich Temple",
  bodyAttrs: {
    class: "bg-black",
  },
});
</script>
