<template>
  <div class="registration-page pb-24">
    <CommonPageHero layout="wide-left">
      <template #media>
        <img
          src="https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format"
          alt=""
          class="absolute inset-0 h-full w-full scale-105 object-cover opacity-30 grayscale"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"
        />
      </template>
      <UBadge
        color="temple-red"
        variant="soft"
        label="Join Our Community"
        class="mb-4 rounded-full px-4"
      />
      <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
        Donor <span class="text-golden-500">Registration</span>
      </h1>
      <p class="text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
        Register as a regular donor to help us maintain the Mandir and support our
        community initiatives.
      </p>
    </CommonPageHero>

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
