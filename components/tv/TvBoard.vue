<template>
  <div class="relative h-full w-full overflow-hidden bg-gray-950">
    <div
      v-for="widget in placed"
      :key="widget.id"
      class="absolute overflow-hidden border border-white/10"
      :style="frameStyle(widget)"
    >
      <TvPosterSlideshow
        v-if="widget.type === 'slideshow'"
        folder="slideshow/"
        empty-label="Main slideshow"
      />
      <TvPosterSlideshow
        v-else-if="widget.type === 'pinned'"
        folder="pinned-posters/"
        empty-label="Pinned posters"
      />
      <div v-else-if="widget.type === 'announcements'" class="tv-announcements flex h-full flex-col bg-gray-900">
        <header class="shrink-0 px-[4cqw] pb-[1cqh] pt-[3cqh]">
          <h3 class="announcements-title font-serif font-bold text-golden-500">Announcements</h3>
        </header>
        <div class="min-h-0 flex-1 px-[3cqw] pb-[2cqh]">
          <DisplayAnnouncements />
        </div>
      </div>
      <TvNiyams v-else-if="widget.type === 'niyams'" />
      <TvCountdown
        v-else-if="widget.type === 'countdown'"
        :title="widget.title"
        :subtitle="widget.subtitle"
        :target-at="widget.targetAt"
        :logo-url="widget.logoUrl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { clampWidget, type TvWidget } from "~/lib/tv-board";

const props = defineProps<{
  widgets: TvWidget[];
}>();

const placed = computed(() =>
  [...props.widgets].map(clampWidget).sort((a, b) => a.z - b.z)
);

function frameStyle(widget: TvWidget) {
  return {
    left: `${widget.x}%`,
    top: `${widget.y}%`,
    width: `${widget.w}%`,
    height: `${widget.h}%`,
    zIndex: widget.z,
  };
}
</script>

<style scoped>
.tv-announcements {
  container-type: size;
}

.announcements-title {
  font-size: 1.25rem;
  font-size: clamp(1rem, 8cqh, 2.75rem);
}

.tv-announcements :deep(h4) {
  font-size: clamp(0.85rem, 4.5cqh, 1.35rem);
}

.tv-announcements :deep(.text-base) {
  font-size: clamp(0.75rem, 3.4cqh, 1.05rem);
}
</style>
