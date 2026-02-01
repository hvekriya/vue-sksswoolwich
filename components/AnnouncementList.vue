<template>
  <div class="h-full flex flex-col">
    <div
      v-if="announcements && announcements.length > 0"
      class="space-y-4 overflow-y-auto pr-2 custom-scrollbar"
    >
      <div
        v-for="announcement in sortedAnnouncements"
        :key="announcement.id"
        class="glass-effect p-5 rounded-2xl border-golden-500/10 hover:border-golden-500/30 transition-all duration-300 hover:shadow-lg group"
      >
        <div class="flex items-start justify-between mb-2">
          <h4
            class="font-serif font-bold text-gray-400 group-hover:text-temple-red-500 transition-colors"
          >
            {{ (announcement as any).title }}
          </h4>
          <UBadge
            v-if="(announcement as any).published"
            color="golden"
            variant="subtle"
            size="xs"
            >New</UBadge
          >
        </div>
        <div
          class="text-sm text-gray-500 leading-relaxed announcement-content"
          v-html="(announcement as any).description"
        ></div>
      </div>
    </div>

    <div
      v-else-if="pending"
      class="flex flex-col items-center justify-center h-48 space-y-4"
    >
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-golden-500" />
      <p class="text-sm text-gray-900 italic">Fetching latest announcements...</p>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center h-48 text-gray-900 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200"
    >
      <UIcon name="i-heroicons-megaphone" class="w-10 h-10 mb-2 opacity-20" />
      <p>No announcements at this time.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as dbRef } from "firebase/database";

// During SSR prerender, useDatabase may not be ready - guard against undefined
const db = useDatabase();
const announcementsRef = db ? dbRef(db, "annoucements") : null;
const { data: announcements, pending } = announcementsRef
  ? useDatabaseList(announcementsRef)
  : { data: ref([]), pending: ref(false) };

const sortedAnnouncements = computed(() => {
  if (!announcements.value) return [];
  return [...announcements.value].sort((a: any, b: any) => {
    return (a.order || 0) - (b.order || 0);
  });
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-golden-500/20 rounded-full hover:bg-golden-500/40;
}

.announcement-content :deep(a) {
  @apply text-temple-red-500 underline hover:text-temple-red-600;
}
</style>
