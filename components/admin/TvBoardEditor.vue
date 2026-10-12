<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 class="text-xl font-serif font-bold text-gray-900 dark:text-white">Screen layout</h2>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          This 16:9 frame is the mandir TV. Panels snap to the grid so every column and row lines up.
          Drag a panel to move it, and drag the corner to resize by whole cells. Save to update every screen on /display.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          color="gray"
          variant="soft"
          label="Preview on TV"
          icon="i-heroicons-tv"
          @click="openPreview"
        />
        <UButton
          color="gray"
          variant="soft"
          label="Reset"
          :disabled="saving"
          @click="resetDefault"
        />
        <UButton
          color="golden"
          label="Save layout"
          icon="i-heroicons-check"
          :loading="saving"
          :disabled="!dirty"
          @click="save"
        />
      </div>
    </div>

    <p v-if="saveError" class="text-sm text-red-600">{{ saveError }}</p>
    <p v-else-if="savedFlash" class="text-sm text-emerald-600">Layout saved. Open TVs will update on their own.</p>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div class="mb-2 flex flex-wrap items-end justify-between gap-3">
          <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            TV preview · 16:9
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <UFormGroup label="Columns" size="xs" class="w-24">
              <USelect
                :model-value="columns"
                :options="gridChoices"
                size="xs"
                @update:model-value="setColumns"
              />
            </UFormGroup>
            <UFormGroup label="Rows" size="xs" class="w-24">
              <USelect
                :model-value="rows"
                :options="gridChoices"
                size="xs"
                @update:model-value="setRows"
              />
            </UFormGroup>
          </div>
        </div>
        <div class="relative w-full overflow-hidden rounded-2xl bg-gray-950 shadow-2xl ring-1 ring-black/10">
          <!-- Padding box gives the stage a real height. Percentage drag handles need that. -->
          <div class="w-full pt-[56.25%]" />
          <div
            ref="frameRef"
            class="absolute inset-0 touch-none"
            tabindex="0"
            @keydown="onKeydown"
          >
          <div
            class="pointer-events-none absolute inset-0 grid"
            :style="gridStyle"
          >
            <div
              v-for="cell in columns * rows"
              :key="cell"
              class="border border-white/10"
            />
          </div>
          <div class="pointer-events-none absolute inset-0 [&_*]:pointer-events-none">
            <ClientOnly>
              <TvBoard :widgets="draft" />
            </ClientOnly>
          </div>
          <div
            v-for="widget in draft"
            :key="widget.id"
            class="absolute z-[60] touch-none"
            :class="widget.id === selectedId ? 'cursor-grabbing' : 'cursor-grab'"
            :style="frameStyle(widget)"
            @pointerdown="startDrag($event, widget, 'move')"
          >
            <div
              class="pointer-events-none absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
            >
              {{ widgetLabel(widget.type) }}
            </div>
            <div
              class="absolute inset-0 rounded-sm border-2 transition-colors"
              :class="widget.id === selectedId ? 'border-golden-400' : 'border-transparent hover:border-white/40'"
            />
            <button
              type="button"
              class="absolute bottom-1 right-1 z-10 h-8 w-8 cursor-nwse-resize rounded-md border border-white/30 bg-golden-500/90 shadow"
              aria-label="Resize panel"
              @pointerdown.stop="startDrag($event, widget, 'resize')"
            />
          </div>
          </div>
        </div>
      </div>

      <div class="space-y-5">
        <div>
          <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Add a panel</p>
          <div class="grid grid-cols-1 gap-2">
            <UButton
              v-for="item in TV_WIDGET_CATALOG"
              :key="item.type"
              block
              color="gray"
              variant="soft"
              class="justify-start"
              :icon="item.type === 'countdown' ? 'i-heroicons-clock' : item.type === 'niyams' ? 'i-heroicons-sparkles' : 'i-heroicons-squares-2x2'"
              :label="item.label"
              :disabled="item.singleton && draft.some((widget) => widget.type === item.type)"
              @click="addWidget(item.type)"
            />
          </div>
        </div>

        <div v-if="selected" class="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">{{ widgetLabel(selected.type) }}</p>
              <p class="text-xs text-gray-500">
                {{ cellLabel(selected) }}
              </p>
            </div>
            <UButton color="red" variant="ghost" size="xs" label="Remove" @click="removeSelected" />
          </div>

          <div v-if="selected.type === 'countdown'" class="space-y-3">
            <UFormGroup label="Event name">
              <UInput v-model="selected.title" placeholder="Patotsav" />
            </UFormGroup>
            <UFormGroup label="Line under the name">
              <UInput v-model="selected.subtitle" placeholder="Woolwich Mandir" />
            </UFormGroup>
            <UFormGroup label="Counts down to" help="The clock stays hidden until less than 24 hours remain.">
              <UInput :model-value="targetLocal" type="datetime-local" @update:model-value="setTarget" />
            </UFormGroup>
            <UFormGroup label="Event logo">
              <div class="flex items-center gap-3">
                <img
                  v-if="selected.logoUrl"
                  :src="selected.logoUrl"
                  alt=""
                  class="h-14 w-14 rounded-xl bg-gray-100 object-contain dark:bg-gray-800"
                />
                <div class="min-w-0 flex-1 space-y-2">
                  <input
                    ref="logoInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="uploadLogo"
                  />
                  <UButton
                    size="sm"
                    color="gray"
                    variant="soft"
                    label="Upload logo"
                    :loading="uploadingLogo"
                    @click="logoInput?.click()"
                  />
                  <UButton
                    v-if="selected.logoUrl"
                    size="sm"
                    color="red"
                    variant="ghost"
                    label="Remove logo"
                    @click="selected.logoUrl = ''"
                  />
                </div>
              </div>
            </UFormGroup>
          </div>
          <p v-else class="text-sm text-gray-500">
            {{ catalogBlurb(selected.type) }} Posters and announcements are still managed below.
          </p>
        </div>
        <p v-else class="text-sm text-gray-500">Select a panel on the preview to edit it.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  DEFAULT_TV_GRID,
  TV_GRID_MAX,
  TV_GRID_MIN,
  TV_WIDGET_CATALOG,
  createWidget,
  defaultTvWidgets,
  normalizeGrid,
  serializeWidgets,
  snapWidget,
  snapWidgets,
  widgetLabel,
  type TvWidget,
  type TvWidgetType,
} from "~/lib/tv-board";

const { widgets, grid: savedGrid, ready, saveBoard } = useTvBoard();
const storage = useFirebaseStorage();

const columns = ref(DEFAULT_TV_GRID.columns);
const rows = ref(DEFAULT_TV_GRID.rows);
const gridChoices = Array.from({ length: TV_GRID_MAX - TV_GRID_MIN + 1 }, (_, index) => TV_GRID_MIN + index);
const draft = ref<TvWidget[]>(snapWidgets(defaultTvWidgets(), currentGrid()));
const selectedId = ref<string | null>(null);
const frameRef = ref<HTMLElement | null>(null);
const logoInput = ref<HTMLInputElement | null>(null);
const saving = ref(false);
const saveError = ref("");
const savedFlash = ref(false);
const uploadingLogo = ref(false);
const hydrated = ref(false);

const PREVIEW_KEY = "tv-board-preview";

watch(
  [widgets, savedGrid, ready],
  () => {
    if (!ready.value || hydrated.value) return;
    columns.value = savedGrid.value.columns;
    rows.value = savedGrid.value.rows;
    draft.value = snapWidgets(widgets.value, currentGrid());
    hydrated.value = true;
  },
  { immediate: true }
);

watch(
  draft,
  (value) => {
    if (!import.meta.client || !hydrated.value) return;
    localStorage.setItem(PREVIEW_KEY, JSON.stringify(value));
  },
  { deep: true }
);

const selected = computed(() => draft.value.find((widget) => widget.id === selectedId.value) ?? null);

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(${rows.value}, minmax(0, 1fr))`,
}));

const dirty = computed(
  () =>
    JSON.stringify(serializeWidgets(draft.value)) !== JSON.stringify(serializeWidgets(widgets.value)) ||
    columns.value !== savedGrid.value.columns ||
    rows.value !== savedGrid.value.rows
);

const targetLocal = computed(() => toDatetimeLocal(selected.value?.targetAt));

function catalogBlurb(type: TvWidgetType) {
  return TV_WIDGET_CATALOG.find((item) => item.type === type)?.blurb ?? "";
}

function currentGrid() {
  return normalizeGrid(columns.value, rows.value);
}

function frameStyle(widget: TvWidget) {
  const placed = snapWidget(widget, currentGrid());
  return {
    left: `${placed.x}%`,
    top: `${placed.y}%`,
    width: `${placed.w}%`,
    height: `${placed.h}%`,
  };
}

function cellLabel(widget: TvWidget) {
  const placed = snapWidget(widget, currentGrid());
  const { columns: cols, rows: rowCount } = currentGrid();
  const col = Math.round((placed.x / 100) * cols) + 1;
  const row = Math.round((placed.y / 100) * rowCount) + 1;
  const colSpan = Math.round((placed.w / 100) * cols);
  const rowSpan = Math.round((placed.h / 100) * rowCount);
  const colText = colSpan === 1 ? `Column ${col}` : `Columns ${col}–${col + colSpan - 1}`;
  const rowText = rowSpan === 1 ? `row ${row}` : `rows ${row}–${row + rowSpan - 1}`;
  return `${colText} · ${rowText}`;
}

function setColumns(value: string | number) {
  columns.value = normalizeGrid(value, rows.value).columns;
  draft.value = snapWidgets(draft.value, currentGrid());
}

function setRows(value: string | number) {
  rows.value = normalizeGrid(columns.value, value).rows;
  draft.value = snapWidgets(draft.value, currentGrid());
}

function addWidget(type: TvWidgetType) {
  const item = TV_WIDGET_CATALOG.find((entry) => entry.type === type);
  if (item?.singleton && draft.value.some((widget) => widget.type === type)) return;
  const widget = createWidget(type, draft.value, currentGrid());
  draft.value = [...draft.value, widget];
  selectedId.value = widget.id;
}

function removeSelected() {
  if (!selectedId.value) return;
  draft.value = draft.value.filter((widget) => widget.id !== selectedId.value);
  selectedId.value = null;
}

function resetDefault() {
  columns.value = DEFAULT_TV_GRID.columns;
  rows.value = DEFAULT_TV_GRID.rows;
  draft.value = snapWidgets(defaultTvWidgets(), currentGrid());
  selectedId.value = null;
}

function setTarget(value: string) {
  if (!selected.value) return;
  if (!value) {
    selected.value.targetAt = "";
    return;
  }
  const date = new Date(value);
  selected.value.targetAt = Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function toDatetimeLocal(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function uploadLogo(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file || !selected.value || !storage) return;
  uploadingLogo.value = true;
  saveError.value = "";
  try {
    const safeName = file.name.replace(/[^\w.-]+/g, "_");
    const fileRef = storageRef(storage, `tv-logos/${selected.value.id}-${Date.now()}-${safeName}`);
    await uploadBytes(fileRef, file);
    selected.value.logoUrl = await getDownloadURL(fileRef);
  } catch (err) {
    saveError.value = err instanceof Error ? err.message : "Logo upload failed";
  } finally {
    uploadingLogo.value = false;
  }
}

function openPreview() {
  if (!import.meta.client) return;
  localStorage.setItem(PREVIEW_KEY, JSON.stringify(draft.value));
  window.open("/display?preview=1", "_blank", "noopener");
}

async function save() {
  saving.value = true;
  saveError.value = "";
  savedFlash.value = false;
  try {
    const next = snapWidgets(draft.value, currentGrid());
    await saveBoard(next, currentGrid());
    draft.value = next;
    savedFlash.value = true;
  } catch (err) {
    saveError.value = err instanceof Error ? err.message : "Could not save the layout";
  } finally {
    saving.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  const widget = selected.value;
  if (!widget) return;
  const key = event.key;
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) return;
  event.preventDefault();
  const { columns: cols, rows: rowCount } = currentGrid();
  if (key === "ArrowLeft") widget.x -= 100 / cols;
  if (key === "ArrowRight") widget.x += 100 / cols;
  if (key === "ArrowUp") widget.y -= 100 / rowCount;
  if (key === "ArrowDown") widget.y += 100 / rowCount;
  Object.assign(widget, snapWidget(widget, currentGrid()));
}

function startDrag(event: PointerEvent, widget: TvWidget, mode: "move" | "resize") {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  const frame = frameRef.value;
  if (!frame) return;
  event.preventDefault();
  selectedId.value = widget.id;
  const rect = frame.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return;
  const startX = event.clientX;
  const startY = event.clientY;
  const origin = { x: widget.x, y: widget.y, w: widget.w, h: widget.h };

  const move = (ev: PointerEvent) => {
    const dx = ((ev.clientX - startX) / rect.width) * 100;
    const dy = ((ev.clientY - startY) / rect.height) * 100;
    if (mode === "move") {
      widget.x = origin.x + dx;
      widget.y = origin.y + dy;
    } else {
      widget.w = origin.w + dx;
      widget.h = origin.h + dy;
    }
    const placed = snapWidget(widget, currentGrid());
    widget.x = placed.x;
    widget.y = placed.y;
    widget.w = placed.w;
    widget.h = placed.h;
  };

  const end = () => {
    const placed = snapWidget(widget, currentGrid());
    widget.x = placed.x;
    widget.y = placed.y;
    widget.w = placed.w;
    widget.h = placed.h;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", end);
    window.removeEventListener("pointercancel", end);
  };

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
}
</script>
