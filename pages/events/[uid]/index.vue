<template>
  <div class="event-detail-page">
    <template v-if="eventDetails">
      <!-- Hero Section with Background Poster -->
      <section class="relative min-h-[50vh] flex items-end py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img
            v-if="eventDetails.data.poster?.url"
            :src="eventDetails.data.poster.url"
            class="w-full h-full object-cover blur-xl scale-110 opacity-30"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-white/80 dark:via-gray-950/80 to-transparent"
          ></div>
        </div>

        <UContainer class="relative z-10 w-full">
          <!-- Breadcrumbs -->
          <nav class="mb-8 flex items-center space-x-2 text-sm font-medium text-gray-500">
            <NuxtLink to="/events" class="hover:text-golden-600 transition-colors"
              >Events</NuxtLink
            >
            <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
            <span
              class="text-gray-900 dark:text-gray-100 line-clamp-1 truncate max-w-[200px]"
            >
              {{ eventDetails.data.event_title[0]?.text }}
            </span>
          </nav>

          <div class="max-w-4xl">
            <h1
              class="text-4xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {{ eventDetails.data.event_title[0]?.text }}
            </h1>

            <div
              class="flex flex-wrap gap-4 items-center text-gray-600 dark:text-gray-900"
            >
              <div
                class="flex items-center space-x-2 bg-golden-50 dark:bg-golden-950/30 px-4 py-2 rounded-full border border-golden-200/50 dark:border-golden-500/20"
              >
                <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-golden-600" />
                <span class="font-bold text-golden-700 dark:text-golden-900">
                  {{ formatDate(eventDetails.data.event_date, "MMMM do, yyyy") }}
                </span>
              </div>
              <div
                v-if="eventDetails.data.event_location"
                class="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300"
              >
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-temple-red-500" />
                <span>{{ eventDetails.data.event_location }}</span>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <UContainer class="py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-8">
            <div class="prose prose-lg prose-golden dark:prose-invert max-w-none mb-12">
              <prismic-rich-text :field="eventDetails.data.event_description" />
            </div>

            <!-- Detailed Posters Section -->
            <div
              v-if="eventDetails.data.poster?.url || eventDetails.data.poster_2?.url"
              class="space-y-8 mb-16"
            >
              <h3
                class="text-2xl font-serif font-bold text-gray-900 dark:text-white border-l-4 border-temple-red-500 pl-4 uppercase tracking-wider text-sm"
              >
                Event Posters
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  v-if="eventDetails.data.poster?.url"
                  class="group relative overflow-hidden rounded-3xl shadow-2xl glass-effect border-golden-500/10"
                >
                  <img
                    :src="eventDetails.data.poster.url"
                    class="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <UButton
                      icon="i-heroicons-arrow-down-tray"
                      color="white"
                      variant="ghost"
                      :to="eventDetails.data.poster.url"
                      target="_blank"
                    />
                  </div>
                </div>
                <div
                  v-if="eventDetails.data.poster_2?.url"
                  class="group relative overflow-hidden rounded-3xl shadow-2xl glass-effect border-golden-500/10"
                >
                  <img
                    :src="eventDetails.data.poster_2.url"
                    class="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <UButton
                      icon="i-heroicons-arrow-down-tray"
                      color="white"
                      variant="ghost"
                      :to="eventDetails.data.poster_2.url"
                      target="_blank"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Gallery Integration -->
            <div v-if="photosetId" class="space-y-8">
              <div class="flex items-center justify-between">
                <h3
                  class="text-2xl font-serif font-bold text-gray-900 dark:text-white border-l-4 border-golden-500 pl-4"
                >
                  Event Gallery
                </h3>
                <UButton
                  v-if="flickrPhotosetWebUrl"
                  :to="flickrPhotosetWebUrl"
                  target="_blank"
                  icon="i-simple-icons-flickr"
                  label="View on Flickr"
                  variant="ghost"
                  color="gray"
                />
              </div>

              <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <USkeleton v-for="i in 8" :key="i" class="aspect-square rounded-2xl" />
              </div>

              <light-gallery
                v-else-if="album?.photo?.length"
                :settings="{ speed: 500, plugins: [lgThumbnail, lgZoom, lgFullscreen] }"
                class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                <a
                  v-for="(photo, index) in album.photo"
                  :key="index"
                  :href="photo.url_o"
                  class="group relative aspect-square overflow-hidden rounded-2xl glass-effect border-golden-500/10 hover:border-golden-500/40 transition-all duration-300"
                >
                  <img
                    :src="photo.url_n"
                    class="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-magnifying-glass-plus"
                      class="w-6 h-6 text-golden-900"
                    />
                  </div>
                </a>
              </light-gallery>

              <div
                v-else-if="!pending"
                class="bg-gray-50 dark:bg-gray-900 rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-800"
              >
                <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-300 mb-4" />
                <p class="text-gray-900 italic">
                  No photos available yet. Check back soon!
                </p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-4">
            <div class="sticky top-28 space-y-8">
              <!-- Share Card -->
              <UCard
                class="glass-effect overflow-hidden rounded-3xl border-golden-500/20"
              >
                <h4
                  class="font-serif font-bold text-gray-400 bg-golden-500/5 px-6 py-4 border-b border-golden-500/10 flex items-center gap-2"
                >
                  <UIcon name="i-heroicons-share" class="text-golden-600" />
                  Share Event
                </h4>
                <div class="p-6">
                  <p class="text-sm text-gray-500 mb-6">
                    Invite your friends and family to join this celebration.
                  </p>
                  <div class="grid grid-cols-2 gap-4">
                    <UButton
                      block
                      icon="i-simple-icons-facebook"
                      color="blue"
                      variant="soft"
                      label="Facebook"
                      @click="shareOnFacebook"
                    />
                    <UButton
                      block
                      icon="i-simple-icons-x"
                      color="gray"
                      variant="soft"
                      label="Post"
                      @click="shareOnTwitter"
                    />
                    <UButton
                      block
                      icon="i-heroicons-link"
                      color="golden"
                      variant="soft"
                      label="Copy Link"
                      @click="copyLink"
                    />
                  </div>
                </div>
              </UCard>

              <!-- Help Card -->
              <div
                class="bg-temple-red-600 text-white rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl shadow-temple-red-500/20"
              >
                <div class="relative z-10">
                  <h4 class="text-xl font-serif font-bold mb-4">Need help?</h4>
                  <p class="text-white/80 text-sm mb-6 leading-relaxed">
                    If you have questions about this event or need assistance with
                    attendance, feel free to reach out to us.
                  </p>
                  <UButton
                    to="/contact-us"
                    color="white"
                    variant="solid"
                    label="Contact Us"
                    block
                    class="rounded-full font-bold text-temple-red-600 hover:bg-gray-100 transition-colors"
                  />
                </div>
                <UIcon
                  name="i-heroicons-question-mark-circle"
                  class="absolute -bottom-10 -right-10 w-40 h-40 text-white/10 group-hover:rotate-12 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import LightGallery from "lightgallery/vue";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";

const { client } = usePrismic();
const route = useRoute();
const config = useRuntimeConfig();
const toast = useToast();

const { data: eventDetails, error } = await useAsyncData(
  `event-${route.params.uid}`,
  () => client.getByUID("events", route.params.uid as string)
);

if (error.value || !eventDetails.value) {
  throw createError({ statusCode: 404, message: "Event not found" });
}

const photosetId = computed(() => eventDetails.value?.data.flickr_photoset_id);
const flickrPhotosetWebUrl = computed(() =>
  photosetId.value
    ? `https://www.flickr.com/photos/${config.public.flickrUserId}/sets/${photosetId.value}/`
    : null
);

const album = ref<any>(null);
const pending = ref(true);
const { fetchPhotoset } = useFlickr();
watch(
  photosetId,
  async (id: string | undefined) => {
    if (!id) {
      album.value = null;
      pending.value = false;
      return;
    }
    pending.value = true;
    album.value = await fetchPhotoset(id);
    pending.value = false;
  },
  { immediate: true }
);

const formatDate = (date: any, pattern: string) => {
  if (!date) return "";
  return format(new Date(date), pattern);
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    eventDetails.value?.data.event_title[0]?.text || "Check out this event!"
  );
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.add({ title: "Link Copied", icon: "i-heroicons-check-circle", color: "primary" });
};

useHead({
  title: `${eventDetails.value?.data.event_title[0]?.text} | Woolwich Temple`,
  meta: [
    {
      name: "description",
      content: eventDetails.value?.data.event_description[0]?.text || "",
    },
  ],
});
</script>

<style scoped>
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  @apply font-serif font-bold text-gray-900 dark:text-white;
}

.prose :deep(p) {
  @apply leading-relaxed;
}
</style>
