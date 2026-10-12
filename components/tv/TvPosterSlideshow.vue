<template>
  <div class="h-full w-full bg-black">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectFade]"
      :slides-per-view="1"
      :loop="urls.length > 1"
      effect="fade"
      :autoplay="{ delay: 10000, disableOnInteraction: false }"
      class="h-full w-full"
    >
      <SwiperSlide v-for="(url, idx) in urls" :key="folder + idx">
        <img :src="url" class="h-full w-full object-contain" alt="" />
      </SwiperSlide>
      <SwiperSlide v-if="!urls.length">
        <div class="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-900 px-6 text-center">
          <img
            src="/img/WoolwichMandirLogo.png"
            class="w-24 opacity-30 sm:w-40"
            alt=""
          />
          <p class="text-sm uppercase tracking-[0.2em] text-white/40">{{ emptyLabel }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const props = defineProps<{
  folder: string;
  emptyLabel: string;
}>();

const { urls } = useStorageFolderSlideUrls(props.folder, { imageOnly: false });
</script>
