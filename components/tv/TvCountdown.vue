<template>
  <div class="countdown-widget flex h-full w-full items-center justify-center overflow-hidden bg-gray-950 text-white">
    <div class="countdown-layout flex h-full w-full items-center">
      <img
        v-if="logoUrl"
        :src="logoUrl"
        alt=""
        class="countdown-logo shrink-0 object-contain"
      />
      <div v-else class="countdown-logo flex shrink-0 items-center justify-center rounded-full border border-golden-500/30 bg-golden-500/10">
        <img src="/img/WoolwichMandirLogo.png" alt="" class="h-2/3 w-2/3 object-contain opacity-80" />
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="countdown-title font-serif font-bold leading-tight text-white">
          {{ title || "Upcoming event" }}
        </h3>
        <p v-if="subtitle" class="countdown-subtitle mt-[0.35em] text-white/70">
          {{ subtitle }}
        </p>
        <p v-if="!targetAt" class="countdown-subtitle mt-[0.6em] text-white/50">
          Choose a date in TV Display Management.
        </p>
        <p v-else-if="done" class="countdown-clock mt-[0.45em] font-serif font-bold text-golden-400">
          It's time
        </p>
        <p v-else-if="showClock" class="countdown-clock mt-[0.45em] font-serif font-bold tabular-nums text-white">
          {{ clock }}
        </p>
        <div v-else class="countdown-days-block">
          <p class="countdown-days font-serif font-bold tabular-nums text-golden-400">
            {{ parts.days }}
          </p>
          <p class="countdown-unit uppercase tracking-[0.2em] text-white/55">
            {{ parts.days === 1 ? "day to go" : "days to go" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  targetAt?: string;
  logoUrl?: string;
}>();

const now = ref(Date.now());
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const remaining = computed(() => {
  if (!props.targetAt) return null;
  const target = new Date(props.targetAt).getTime();
  if (!Number.isFinite(target)) return null;
  return target - now.value;
});

const done = computed(() => remaining.value != null && remaining.value <= 0);

const showClock = computed(
  () => remaining.value != null && remaining.value < 24 * 60 * 60 * 1000
);

const parts = computed(() => {
  const totalSeconds = Math.floor(Math.max(0, remaining.value ?? 0) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
});

const clock = computed(() => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(parts.value.hours)}:${pad(parts.value.minutes)}:${pad(parts.value.seconds)}`;
});
</script>

<style scoped>
.countdown-widget {
  container-type: size;
}

.countdown-layout {
  padding: 5cqh 4cqw;
  gap: 4cqw;
}

.countdown-logo {
  height: 82cqh;
  width: auto;
  max-width: 36%;
  aspect-ratio: 1;
}

.countdown-title {
  font-size: 1.35rem;
  font-size: clamp(1.25rem, min(18cqh, 6.5cqw), 5rem);
  line-height: 1.05;
}

.countdown-subtitle {
  font-size: 0.9rem;
  font-size: clamp(0.8rem, min(7cqh, 2.4cqw), 2rem);
}

.countdown-days-block {
  display: flex;
  flex-direction: column;
  gap: 0.14em;
  margin-top: 0.12em;
  font-size: clamp(2.5rem, min(38cqh, 14cqw), 9rem);
}

.countdown-days {
  font-size: 1em;
  line-height: 1;
}

.countdown-unit {
  font-size: 0.32em;
  line-height: 1.2;
}

.countdown-clock {
  margin-top: 2cqh;
  font-size: 2rem;
  font-size: clamp(1.5rem, min(28cqh, 10cqw), 7rem);
  line-height: 1;
}

@container (max-width: 280px) {
  .countdown-layout {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .countdown-logo {
    width: 34%;
  }
}
</style>
