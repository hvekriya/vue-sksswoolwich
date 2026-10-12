<template>
  <div class="niyam-board flex h-full w-full flex-col overflow-hidden bg-gray-950 text-white">
    <header class="shrink-0 px-[4cqw] pb-[1cqh] pt-[3cqh]">
      <div class="flex items-center gap-3">
        <span class="live-dot" aria-hidden="true" />
        <h3 class="board-title font-serif font-bold text-golden-500">Bhaktiras Niyams</h3>
      </div>
      <p class="board-note mt-[0.35em] text-white/55">
        Live from Bhaktiras app
      </p>
    </header>

    <div v-if="pending && !rows.length" class="flex flex-1 items-center justify-center">
      <p class="board-note text-white/50">Loading niyams…</p>
    </div>
    <div v-else-if="error && !rows.length" class="flex flex-1 items-center justify-center px-6 text-center">
      <p class="board-note text-white/60">Niyams could not be loaded.</p>
    </div>
    <ul v-else class="flex min-h-0 flex-1 flex-col justify-center gap-[1.2cqh] px-[4cqw] pb-[3cqh]">
      <li v-for="row in rows" :key="row.id" class="min-h-0">
        <div class="flex items-end justify-between gap-3">
          <div class="min-w-0">
            <p class="niyam-title truncate font-serif font-bold leading-tight">{{ row.title }}</p>
            <p class="niyam-unit text-white/45">{{ row.unit }}</p>
          </div>
          <p class="niyam-count shrink-0 text-right font-serif font-bold tabular-nums leading-none text-golden-400">
            {{ formatNiyamCount(row.approvedTotal) }}
            <span class="niyam-target block font-sans font-medium text-white/45">
              of {{ formatNiyamTarget(row.target) }}
            </span>
          </p>
        </div>
        <div class="mt-[0.45em] h-[0.45em] overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-gradient-to-r from-golden-500 to-golden-300"
            :style="{ width: `${progress(row)}%` }"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { formatNiyamCount, formatNiyamTarget, type NiyamRow } from "~/composables/useBhaktirasNiyams";

const { rows, pending, error } = useBhaktirasNiyams();

function progress(row: NiyamRow) {
  if (!row.target) return 0;
  return Math.max(0, Math.min(100, (row.approvedTotal / row.target) * 100));
}
</script>

<style scoped>
.niyam-board {
  container-type: size;
}

.live-dot {
  width: 0.55em;
  height: 0.55em;
  border-radius: 999px;
  background: #34d399;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  animation: live-pulse 1.8s ease-out infinite;
  font-size: clamp(0.7rem, 2.2cqh, 0.95rem);
}

.board-title {
  font-size: 0.95rem;
  font-size: clamp(0.8rem, 3.6cqh, 1.45rem);
}

.board-note,
.niyam-unit,
.niyam-target {
  font-size: 0.68rem;
  font-size: clamp(0.58rem, 1.8cqh, 0.8rem);
}

.niyam-title {
  font-size: 0.8rem;
  font-size: clamp(0.68rem, 2.4cqh, 1.05rem);
}

.niyam-count {
  font-size: 0.9rem;
  font-size: clamp(0.75rem, 2.8cqh, 1.25rem);
}

@keyframes live-pulse {
  70% {
    box-shadow: 0 0 0 0.45em rgba(52, 211, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
  }
}
</style>
