<template>
  <section
    :class="[
      'hero-under-nav relative overflow-hidden pt-64 pb-24 lg:pt-72 lg:pb-32',
      tone === '950' ? 'bg-gray-950' : 'bg-gray-900',
    ]"
  >
    <!-- Optional full-bleed media (poster, banner, photo) -->
    <div v-if="$slots.media" class="absolute inset-0 z-0 min-h-full">
      <slot name="media" />
    </div>

    <!-- Decorative blobs (same as Donate / Contact / Events) -->
    <div
      class="pointer-events-none absolute inset-0 z-[1]"
      :class="$slots.media ? 'opacity-25' : 'opacity-30'"
    >
      <div
        class="absolute -left-24 -top-24 h-[40rem] w-[40rem] rounded-full bg-golden-500/10 blur-[160px]"
      />
      <div
        class="absolute -bottom-24 -right-24 h-[40rem] w-[40rem] rounded-full bg-temple-red-500/10 blur-[160px]"
      />
    </div>

    <UContainer class="relative z-10">
      <div :class="innerClass">
        <slot />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Page background tone */
    tone?: "900" | "950"
    /**
     * center: max-w-3xl centered (Donate / Contact / Events)
     * wide-left: full width up to max-w-6xl, left-aligned (event detail, temple pages)
     */
    layout?: "center" | "wide-left"
  }>(),
  {
    tone: "900",
    layout: "center",
  }
)

const innerClass = computed(() =>
  props.layout === "wide-left"
    ? "relative z-10 mx-auto w-full max-w-6xl text-left"
    : "relative z-10 mx-auto max-w-3xl text-center"
)
</script>
