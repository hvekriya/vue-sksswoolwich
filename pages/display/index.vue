<template>
  <div class="tv-display-portal fixed inset-0 overflow-hidden bg-gray-950">
    <ClientOnly>
      <TvBoard :widgets="screenWidgets" />
      <p
        v-if="isPreview"
        class="pointer-events-none absolute left-4 top-4 z-50 rounded-full bg-golden-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-950"
      >
        Preview — save the layout to update the mandir TVs
      </p>
      <template #fallback>
        <div class="flex h-full items-center justify-center">
          <div class="h-16 w-16 animate-spin rounded-full border-2 border-golden-500/30 border-t-golden-500" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { normalizeWidgets, type TvWidget } from "~/lib/tv-board";

definePageMeta({
  layout: false,
  ssr: false,
});

const PREVIEW_KEY = "tv-board-preview";
const route = useRoute();
const isPreview = computed(() => route.query.preview === "1");
const { widgets } = useTvBoard();
const previewWidgets = ref<TvWidget[] | null>(null);

function readPreview() {
  try {
    const raw = localStorage.getItem(PREVIEW_KEY);
    previewWidgets.value = raw ? normalizeWidgets(JSON.parse(raw)) : null;
  } catch {
    previewWidgets.value = null;
  }
}

function onStorage(event: StorageEvent) {
  if (event.key === PREVIEW_KEY) readPreview();
}

onMounted(() => {
  if (!isPreview.value) return;
  readPreview();
  window.addEventListener("storage", onStorage);
});

onUnmounted(() => {
  window.removeEventListener("storage", onStorage);
});

const screenWidgets = computed(() =>
  isPreview.value && previewWidgets.value?.length ? previewWidgets.value : widgets.value
);

useHead({
  title: "Digital Signage | Woolwich Temple",
  bodyAttrs: {
    class: "bg-black",
  },
});
</script>
