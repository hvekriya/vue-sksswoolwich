<template>
  <div class="recent-uploads-container">
    <!-- Hidden container for lightGallery (dynamic mode); gallery is created in onMounted when data is ready -->
    <div ref="galleryContainer" class="sr-only" aria-hidden="true" />
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
    >
      <div
        v-for="(photo, index) in recentUploads"
        :key="index"
        role="button"
        tabindex="0"
        class="gallery-item group relative aspect-square overflow-hidden rounded-2xl glass-effect border-golden-500/10 hover:border-golden-500/40 transition-all duration-500 cursor-pointer"
        @click="openGallery(index)"
        @keydown.enter.prevent="openGallery(index)"
      >
        <img
          :src="photo.url_n || ''"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          :alt="photo.title || 'Gallery Image'"
        />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <UIcon name="i-heroicons-magnifying-glass-plus" class="w-8 h-8 text-golden-900" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import lightGallery from 'lightgallery'
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

const galleryContainer = ref<HTMLElement | null>(null)
const lgInstance = ref<ReturnType<typeof lightGallery> | null>(null)

const dynamicEl = computed(() =>
  (props.recentUploads ?? []).map((photo: { url_o?: string; url_n?: string; title?: string }) => ({
    src: photo.url_o ?? '',
    thumb: photo.url_n ?? '',
    subHtml: photo.title ? `<p>${photo.title}</p>` : '',
  }))
)

function initGallery() {
  if (!galleryContainer.value || !dynamicEl.value.length || lgInstance.value) return
  lgInstance.value = lightGallery(galleryContainer.value, {
    dynamic: true,
    dynamicEl: dynamicEl.value,
    speed: 500,
    plugins: [lgThumbnail, lgZoom, lgFullscreen],
    mobileSettings: { controls: true, showCloseIcon: true, download: true },
  })
}

onMounted(() => {
  nextTick(() => {
    initGallery()
  })
})

watch(
  () => dynamicEl.value.length,
  (len: number, prev: number) => {
    if (len > 0 && prev === 0) {
      nextTick(() => initGallery())
    } else if (len > 0 && lgInstance.value) {
      try {
        lgInstance.value.refresh(dynamicEl.value)
      } catch (_) {}
    }
  },
  { immediate: false }
)

onUnmounted(() => {
  try {
    lgInstance.value?.destroy()
  } catch (_) {}
  lgInstance.value = null
})

const openGallery = (index: number) => {
  if (index < 0 || index >= (props.recentUploads?.length ?? 0)) return
  if (lgInstance.value) {
    try {
      lgInstance.value.openGallery(index)
    } catch (_) {}
    return
  }
  initGallery()
  if (lgInstance.value) {
    try {
      lgInstance.value.openGallery(index)
    } catch (_) {}
  } else {
    requestAnimationFrame(() => {
      initGallery()
      if (lgInstance.value) lgInstance.value.openGallery(index)
    })
  }
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
