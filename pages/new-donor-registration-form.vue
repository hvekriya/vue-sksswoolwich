<template>
  <div class="registration-page pb-24">
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
          <UBadge color="temple-red" variant="soft" label="Join Our Community" class="mb-4 rounded-full px-4" />
          <h1 class="text-5xl lg:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Donor <span class="text-golden-500">Registration</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-900 max-w-2xl leading-relaxed">
            Register as a regular donor to help us maintain the Mandir and support our community initiatives.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Form Section -->
    <UContainer class="-mt-12 relative z-20">
      <UCard class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl overflow-hidden p-8 lg:p-12">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Registration Form</h2>
          <p class="text-gray-500">Please provide your details below to register with Woolwich Mandir.</p>
        </div>

        <div class="bg-white rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800">
          <iframe ref="formIframe"
            src="https://docs.google.com/forms/d/e/1FAIpQLScqG4FMA4TbIxwzwnCvAMpE7289xo_n1xaMNEFza7spaYZtUA/viewform?embedded=true"
            width="100%" height="1800" frameborder="0" marginheight="0" marginwidth="0" class="w-full"
            @load="onFormLoad">
            Loading...
          </iframe>
        </div>
      </UCard>
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
  title: 'Donor Registration | Woolwich Temple',
  meta: [
    { name: 'description', content: 'Register as a new donor with Shree Swaminarayan Mandir Woolwich.' }
  ]
})
</script>

<style scoped>
iframe {
  background: white;
}
</style>
