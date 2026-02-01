<template>
  <div class="upcoming-events-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <template v-if="upcomingEvents && upcomingEvents.length > 0">
      <div
        v-for="(event, index) in upcomingEvents"
        :key="index"
        class="event-card group relative flex flex-col glass-effect rounded-[2rem] overflow-hidden border-golden-500/10 hover:border-golden-500/40 transition-all duration-500"
      >
        <!-- Date Badge -->
        <div class="absolute top-6 left-6 z-20 glass-effect bg-black/30 backdrop-blur-md px-4 py-3 rounded-2xl flex flex-col items-center min-w-[70px] border-white/20">
          <span class="text-3xl font-serif font-bold text-golden-900 leading-none">
            {{ formatDate(event.data.event_date, 'dd') }}
          </span>
          <span class="text-[10px] uppercase tracking-[0.2em] text-white/80 font-bold mt-1">
            {{ formatDate(event.data.event_date, 'MMM') }}
          </span>
        </div>

        <!-- Poster Image -->
        <div class="relative aspect-[4/5] overflow-hidden">
          <img
            v-if="event.data.poster?.url"
            :src="event.data.poster.url"
            :alt="event.data.poster.alt || 'Event Poster'"
            class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div v-else class="h-full w-full bg-gray-100 flex items-center justify-center">
            <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-gray-300" />
          </div>
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="flex-grow p-8 -mt-20 relative z-10">
          <div class="mb-4">
            <h3 class="text-2xl font-serif font-bold text-white mb-3 group-hover:text-golden-900 transition-colors">
              <prismic-rich-text :field="event.data.event_title" />
            </h3>
            <div class="text-gray-300 text-sm line-clamp-3 leading-relaxed">
              <prismic-rich-text :field="event.data.event_description_short" />
            </div>
          </div>

          <div class="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
            <NuxtLink
              :to="`/events/${event.uid}`"
              class="flex items-center space-x-2 text-golden-900 font-bold text-sm tracking-wider group/btn"
            >
              <span>EVENT DETAILS</span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
            </NuxtLink>
            <div class="flex items-center space-x-1 text-gray-900 text-xs">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
              <span>Mandir Hall</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <div v-else class="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
      <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
        <UIcon name="i-heroicons-calendar-days" class="w-10 h-10 text-gray-300" />
      </div>
      <p class="text-gray-900 text-lg font-serif italic text-center max-w-md">
        No upcoming events currently scheduled. <br />Please check back soon!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  upcomingEvents: any[]
}>()

const formatDate = (date: string, pattern: string) => {
  try {
    return format(new Date(date), pattern)
  } catch (e) {
    return '?'
  }
}
</script>

<style scoped>
.event-card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}
</style>
