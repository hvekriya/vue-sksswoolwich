<template>
  <div class="past-events-section">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
        v-for="(event, index) in pastEvents"
        :key="index"
        class="past-event-card group flex flex-col glass-effect rounded-3xl overflow-hidden border-golden-500/10 hover:border-golden-500/30 transition-all duration-500"
      >
        <!-- Identity Overlay -->
        <div class="relative aspect-video overflow-hidden">
          <img
            v-if="event.data.poster?.url"
            :src="event.data.poster.url"
            :alt="event.data.poster.alt || 'Event Poster'"
            class="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          <div v-else class="h-full w-full bg-gray-100 flex items-center justify-center">
            <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-200" />
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
          ></div>

          <!-- Date Badge -->
          <div class="absolute bottom-4 left-4 flex items-center space-x-2 text-white/90">
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-golden-900" />
            <span class="text-xs font-bold tracking-widest uppercase">
              {{ formatDate(event.data.event_date) }}
            </span>
          </div>
        </div>

        <div class="p-6 flex flex-col flex-grow">
          <h3
            class="text-lg font-serif font-bold text-gray-400 mb-3 line-clamp-2 min-h-[3rem] group-hover:text-temple-red-500 transition-colors"
          >
            <prismic-rich-text :field="event.data.event_title" />
          </h3>

          <div class="text-sm text-gray-500 mb-6 line-clamp-2">
            <prismic-rich-text :field="event.data.event_description" />
          </div>

          <div
            class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between"
          >
            <UButton
              v-if="event.data.flickr_photoset_id"
              :to="`/events/${event.uid}/${event.data.flickr_photoset_id}`"
              icon="i-heroicons-camera"
              label="View Gallery"
              variant="soft"
              color="golden"
              class="rounded-full font-bold"
            />
            <UButton
              v-else
              :to="`/events/${event.uid}`"
              icon="i-heroicons-information-circle"
              label="Details"
              variant="ghost"
              color="gray"
              class="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!pastEvents || pastEvents.length === 0"
      class="py-20 text-center text-gray-900 italic font-serif"
    >
      No past events to display.
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

const props = defineProps<{
  pastEvents: any[];
}>();

const formatDate = (date: string | null) => {
  if (!date) return "Past Event";
  try {
    return format(new Date(date), "MMMM yyyy");
  } catch (e) {
    return date;
  }
};
</script>

<style scoped>
.past-event-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.past-event-card:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(155, 13, 2, 0.1);
}
</style>
