<template>
  <div class="h-full flex flex-col min-h-0">
    <div
      v-if="displayList.length > 0"
      class="flex-1 min-h-0 overflow-hidden relative"
      ref="scrollContainer"
    >
      <div
        class="display-announcements-scroller space-y-6 py-6"
        :style="{ transform: `translateY(${scrollPosition}px)` }"
      >
        <div
          v-for="(item, idx) in displayList"
          :key="(item.id || '') + '-' + idx"
          class="glass-effect-dark border border-white/5 rounded-2xl p-4"
        >
          <h4 class="text-xl font-bold text-white mb-2">{{ item.title }}</h4>
          <div
            class="text-base text-gray-300 leading-relaxed prose prose-invert max-w-none prose-p:my-1"
            v-html="item.description"
          />
        </div>
      </div>
    </div>
    <div v-else-if="pending" class="flex-1 flex items-center justify-center">
      <p class="text-gray-500">Loading announcements…</p>
    </div>
    <div v-else class="flex-1 flex items-center justify-center">
      <p class="text-gray-500">No announcements at this time.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as dbRef } from "firebase/database";

// Same data source and logic as AnnouncementList (no published filter)
// During SSR prerender, useDatabase may not be ready - guard against undefined
const db = useDatabase();
const announcementsRef = db ? dbRef(db, "annoucements") : null;
const { data: announcements, pending } = announcementsRef
  ? useDatabaseList(announcementsRef)
  : { data: ref([]), pending: ref(false) };

const scrollPosition = ref(0);
const scrollContainer = ref<HTMLElement | null>(null);

const displayList = computed(() => {
  const list = announcements.value ?? [];
  const sorted = [...list].sort(
    (a: { order?: number }, b: { order?: number }) => (a.order ?? 0) - (b.order ?? 0)
  );
  return sorted.length ? [...sorted, ...sorted] : []; // Duplicate for seamless scroll loop
});

let scrollInterval: ReturnType<typeof setInterval> | null = null;

function startAutoScroll() {
  scrollInterval = setInterval(() => {
    if (!scrollContainer.value || displayList.value.length === 0) return;
    const scrollerHeight = scrollContainer.value.scrollHeight / 2;
    if (scrollerHeight <= 0) return;
    scrollPosition.value -= 1; // scroll up (content moves up)
    if (Math.abs(scrollPosition.value) >= scrollerHeight) scrollPosition.value = 0;
  }, 30);
}

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  if (scrollInterval) clearInterval(scrollInterval);
});
</script>

<style scoped>
.display-announcements-scroller {
  transition: transform 0.05s linear;
}

.glass-effect-dark {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}
</style>
