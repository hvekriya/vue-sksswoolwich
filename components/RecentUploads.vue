<template>
  <div class="recent-uploads-container">
    <light-gallery
      :settings="{ speed: 500, plugins: plugins, mobileSettings: { controls: true, showCloseIcon: true, download: true } }"
      :onInit="onInit"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
    >
      <a
        v-for="(photo, index) in recentUploads"
        :key="index"
        :href="photo.url_o"
          class="gallery-item group relative aspect-square overflow-hidden rounded-2xl glass-effect border-golden-500/10 hover:border-golden-500/40 transition-all duration-500"
          @click.prevent="openGallery(index)"
        >
          <img
            :src="photo.url_n || ''"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            :alt="photo.title || 'Gallery Image'"
          />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <UIcon name="i-heroicons-magnifying-glass-plus" class="w-8 h-8 text-golden-900" />
        </div>
      </a>
    </light-gallery>
  </div>
</template>

<script setup lang="ts">
import LightGallery from 'lightgallery/vue'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-fullscreen.css'

const props = defineProps<{
  recentUploads: any[]
}>()

const plugins = [lgThumbnail, lgZoom, lgFullscreen]
const lgInstance = ref<{ openGallery: (index?: number) => void } | null>(null)

const onInit = (detail: { instance?: { openGallery: (index?: number) => void } }) => {
  lgInstance.value = detail.instance ?? null
}

const openGallery = (index: number) => {
  lgInstance.value?.openGallery(index)
}
</script>

<style scoped>
.gallery-item {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(252, 199, 29, 0.2);
}
</style>
