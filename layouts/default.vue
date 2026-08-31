<template>
  <div class="min-h-screen flex flex-col relative">
    <div class="fixed inset-0 z-[-1]">
      <div class="absolute inset-0 bg-gray-50 dark:bg-black"></div>
      <div
        v-if="showDecorBg"
        class="absolute inset-0 opacity-20 dark:opacity-40"
        :style="decorBgStyle"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 to-gray-50 dark:via-black/80 dark:to-black"
      ></div>
    </div>

    <CommonHeader />

    <main class="flex-grow pt-28 lg:pt-32 pb-12">
      <slot />
    </main>

    <CommonMainFooter />

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const showDecorBg = ref(false)
const decorBgStyle = {
  backgroundImage:
    "url('https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(5px)',
}

onMounted(() => {
  const reveal = () => {
    showDecorBg.value = true
  }
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => reveal())
  } else {
    window.setTimeout(reveal, 400)
  }
})

useHead({
  titleTemplate: (title) => title ? `${title} | Woolwich Temple` : 'Woolwich Temple | Shree KS Swaminarayan Temple Woolwich',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://firebasestorage.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://firestore.googleapis.com' },
  ]
})
</script>
