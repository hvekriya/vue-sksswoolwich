<template>
  <UCard
    class="glass-effect overflow-hidden border-golden-500/20 shadow-golden-500/5 group h-full flex flex-col"
    :ui="{ body: { padding: 'p-0 flex flex-col flex-1' } }"
  >
    <div class="relative flex-1 bg-black overflow-hidden">
      <!-- Live Label -->
      <div
        class="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full animate-pulse"
      >
        <span class="w-2 h-2 bg-white rounded-full"></span>
        <span class="text-xs font-bold text-white tracking-widest uppercase"
          >Live Katha</span
        >
      </div>

      <!-- Thumbnail/Placeholder -->
      <img
        src="https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format"
        class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
      />

      <!-- Play Button Overlay -->
      <div class="absolute inset-0 flex items-center justify-center">
        <UButton
          icon="i-heroicons-play-20-solid"
          size="xl"
          color="white"
          variant="ghost"
          class="rounded-full bg-white/20 backdrop-blur-md p-6 hover:bg-white/40 transition-all scale-90 group-hover:scale-100"
          to="/live"
        />
      </div>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-serif font-bold text-gray-900 dark:text-gray-400 mb-2">
        Daily Live Stream
      </h3>
      <p class="text-gray-600 text-sm mb-4">
        Join us live for Morning and Evening Aarti, and special Satsang programs.
      </p>
      <UButton block color="primary" label="Watch Now" icon="i-heroicons-tv" to="/live" />
    </div>
  </UCard>
</template>

<script setup lang="ts"></script>
