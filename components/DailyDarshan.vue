<template>
  <UCard class="glass-effect rounded-[2.5rem] border-golden-500/10 shadow-xl overflow-hidden h-full">
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-serif font-bold text-gray-900 dark:text-white border-l-4 border-golden-500 pl-3">Daily
          Darshan</h3>
        <UButton to="/live" variant="ghost" color="golden" icon="i-heroicons-arrow-top-right-on-square" size="sm"
          class="rounded-full" />
      </div>

      <div class="relative rounded-2xl overflow-hidden aspect-[4/5] group">
        <Swiper :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]" :slides-per-view="1" :loop="true"
          :effect="'fade'" :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
          }" :pagination="{
            clickable: true,
          }" class="h-full w-full">
          <SwiperSlide v-for="(photo, index) in dailydarshan.photo" :key="index">
            <div class="relative h-full w-full">
              <img :src="photo.url_o"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 text-white text-xs font-medium tracking-widest uppercase">
                {{ formatDate(photo.datetaken) }}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="mt-6 text-center">
        <UButton to="/live" variant="soft" color="golden" block class="rounded-xl font-bold py-3">
          View Live Darshan
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade, Pagination as SwiperPagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const props = defineProps<{
  dailydarshan: any
}>()

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
  @apply bg-white/50 w-2 h-2 transition-all duration-300;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-golden-500 w-6 rounded-full;
}
</style>