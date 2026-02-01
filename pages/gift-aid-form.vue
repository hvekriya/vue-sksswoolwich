<template>
  <div class="gift-aid-page pb-24">
    <!-- Immersive Header -->
    <section class="relative h-[60vh] flex flex-col justify-end pb-20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format"
          class="w-full h-full object-cover grayscale opacity-20 scale-105" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-black via-gray-50/80 dark:via-black/80 to-transparent">
        </div>
      </div>

      <UContainer class="relative z-10">
        <div class="max-w-4xl">
          <UBadge color="golden" variant="soft" label="Support Us" class="mb-4 rounded-full px-4" />
          <h1 class="text-5xl lg:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Gift Aid <span class="text-golden-500">Declaration</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-900 max-w-2xl leading-relaxed">
            Maximize your donation at no extra cost to you. If you're a UK taxpayer, we can claim an extra 25p for every
            £1 you give.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Form Section -->
    <UContainer class="-mt-12 relative z-20">
      <UCard class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl overflow-hidden p-8 lg:p-12">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Complete Your Declaration</h2>
          <p class="text-gray-500">Please fill in the Google form below to enable us to reclaim tax on your donations.
          </p>
        </div>

        <div class="bg-white rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800">
          <iframe ref="formIframe"
            src="https://docs.google.com/forms/d/e/1FAIpQLScye8RheLqVNDunvhleztUS676fRZE7HN3c5-2Y3ZNjnRYMsA/viewform?embedded=true"
            width="100%" height="1400" frameborder="0" marginheight="0" marginwidth="0" class="w-full"
            @load="onFormLoad">
            Loading...
          </iframe>
        </div>
      </UCard>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div
          class="p-8 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <UIcon name="i-heroicons-banknotes" class="w-10 h-10 text-golden-500 mb-4 mx-auto" />
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">Increase Impact</h4>
          <p class="text-sm text-gray-500">Add 25% to your donation without spending a penny more.</p>
        </div>
        <div
          class="p-8 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <UIcon name="i-heroicons-shield-check" class="w-10 h-10 text-golden-500 mb-4 mx-auto" />
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">Secure & Private</h4>
          <p class="text-sm text-gray-500">Your details are handled securely in accordance with GDPR.</p>
        </div>
        <div
          class="p-8 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <UIcon name="i-heroicons-clock" class="w-10 h-10 text-golden-500 mb-4 mx-auto" />
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">One-Time Set Up</h4>
          <p class="text-sm text-gray-500">Covers all your past and future donations for the last 4 years.</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const formIframe = ref<HTMLIFrameElement | null>(null)

const onFormLoad = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

useHead({
  title: 'Gift Aid Declaration | Woolwich Temple',
  meta: [
    { name: 'description', content: 'Support SKSS Temple Woolwich by completing your Gift Aid declaration.' }
  ]
})
</script>

<style scoped>
iframe {
  background: white;
}
</style>
