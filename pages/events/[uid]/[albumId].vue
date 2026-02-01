<template>
  <div class="album-page-wrapper min-h-screen bg-black text-white">
    <UContainer class="py-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <UButton
            icon="i-heroicons-arrow-left"
            variant="ghost"
            color="white"
            label="Back to Memory Archive"
            class="-ml-4 mb-4"
            @click="navigateTo(`/events/past`)"
          />
          <h1 class="text-3xl md:text-5xl font-serif font-bold text-golden-900">
            {{ album?.title || "Event Gallery" }}
          </h1>
          <p class="text-gray-500 mt-2 flex items-center gap-2">
            <UIcon name="i-heroicons-photo" class="w-5 h-5" />
            <span>{{ album?.photo?.length || 0 }} Photos</span>
          </p>
        </div>

        <UButton
          v-if="flickrPhotosetWebUrl"
          :to="flickrPhotosetWebUrl"
          target="_blank"
          icon="i-simple-icons-flickr"
          label="Full Album"
          color="golden"
          variant="soft"
          class="rounded-xl px-6 shadow-lg shadow-golden-500/10"
        />
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <USkeleton
          v-for="i in 24"
          :key="i"
          class="aspect-square rounded-2xl bg-gray-900"
        />
      </div>

      <!-- LightGallery -->
      <light-gallery
        v-else-if="album?.photo?.length"
        :settings="{ speed: 500, plugins: [lgThumbnail, lgZoom, lgFullscreen] }"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        <a
          v-for="(photo, index) in album.photo"
          :key="index"
          :href="photo.url_o"
          class="group relative aspect-square overflow-hidden rounded-3xl bg-gray-900 glass-effect border-white/5 hover:border-golden-500/40 transition-all duration-500 shadow-lg"
        >
          <img
            :src="photo.url_n"
            class="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
            :alt="photo.title"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-magnifying-glass-plus"
              class="w-8 h-8 text-golden-900 scale-75 group-hover:scale-100 transition-transform"
            />
          </div>
        </a>
      </light-gallery>

      <div v-else class="text-center py-32 text-gray-600 italic">
        No photos found in this album.
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import LightGallery from "lightgallery/vue";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";

definePageMeta({
  layout: false, // Custom minimal layout or no layout for immersive view
});

const route = useRoute();
const config = useRuntimeConfig();

const albumId = computed(() => route.params.albumId as string);
const flickrPhotosetWebUrl = computed(
  () =>
    `https://www.flickr.com/photos/${config.public.flickrUserId}/sets/${albumId.value}/`
);

const { data: album, pending } = await useFetch<any>(() => config.public.flickrUrl, {
  params: {
    api_key: config.public.flickrApiKey,
    user_id: config.public.flickrUserId,
    format: "json",
    nojsoncallback: 1,
    method: "flickr.photosets.getPhotos",
    photoset_id: albumId.value,
    extras: "url_n,url_o,url_sq,title",
  },
  transform: (data: any) => data?.photoset,
});

useHead({
  title: `${album.value?.title || "Gallery"} | Woolwich Temple`,
  bodyAttrs: {
    class: "bg-black",
  },
});
</script>

<style scoped>
/* Immersive gallery styles */
</style>
