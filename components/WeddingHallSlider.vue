<template>
  <!-- Client-only: Storage list + Swiper (same behaviour as /display) -->
  <ClientOnly>
    <div
      :class="[
        'relative w-full overflow-hidden',
        hero
          ? 'h-full min-h-full'
          : 'h-[50vh] rounded-[2rem] lg:h-[65vh]',
      ]"
    >
      <Swiper
        :key="swiperKey"
        :modules="[SwiperAutoplay, SwiperEffectFade]"
        :slides-per-view="1"
        :loop="urls.length > 1"
        effect="fade"
        :autoplay="{
          delay: 10000,
          disableOnInteraction: false,
        }"
        class="h-full w-full"
      >
        <SwiperSlide v-for="(url, idx) in urls" :key="'wedding-slide-' + idx">
          <img
            :src="url"
            class="h-full w-full object-cover"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide v-if="!urls.length">
          <div
            class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-900 px-4"
          >
            <img
              src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
              class="w-48 opacity-20"
              alt=""
            />
            <p
              v-if="loadError && isDev"
              class="max-w-md text-center text-xs text-red-400/90"
            >
              Could not load slideshow (check Storage rules allow list + read for this folder).
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <template #fallback>
      <div
        :class="[
          'flex w-full items-center justify-center bg-gray-900',
          hero ? 'min-h-[68vh] lg:min-h-[75vh]' : 'h-[50vh] rounded-[2rem] lg:h-[65vh]',
        ]"
      >
        <div
          class="h-12 w-12 animate-spin rounded-full border-2 border-golden-500/30 border-t-golden-500"
        />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectFade as SwiperEffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const props = withDefaults(
  defineProps<{
    /** Storage folder path (no leading slash), e.g. cms/wedding-hall */
    storagePath?: string;
    /** Set true if images live in subfolders under that path */
    storageRecursive?: boolean;
    /** Full-bleed hero: no rounded corners, fills parent height */
    hero?: boolean;
  }>(),
  {
    storagePath: "cms/wedding-hall",
    storageRecursive: true,
    hero: false,
  }
);

const isDev = import.meta.dev;

const { urls, loadError } = useStorageFolderSlideUrls(props.storagePath, {
  imageOnly: true,
  recursive: props.storageRecursive,
});

const swiperKey = computed(() =>
  urls.value.length ? `n-${urls.value.length}-${urls.value[0]?.slice(-24)}` : "empty"
);
</script>
