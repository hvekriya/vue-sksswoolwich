<template>
  <div class="special-event-page pb-24">
    <!-- Dramatic Banner -->
    <section class="relative bg-gray-900 overflow-hidden">
      <div class="absolute inset-0 opacity-40">
        <img 
          src="https://images.prismic.io/sksswoolwich/438225dd-fd4b-46cb-85ad-e15a9d4ecf62_PGPM+Banner.png?auto=compress,format"
          class="w-full h-full object-cover scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
      </div>
      
      <UContainer class="relative z-10 py-32 lg:py-48 text-center pt-64">
        <UBadge color="golden" variant="soft" label="Special Event" class="mb-4 rounded-full px-4" />
        <h1 class="text-5xl lg:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl">
          Premras Ghanshyam <span class="text-golden-500">Mahotsav</span>
        </h1>
      </UContainer>
    </section>

    <!-- Registration Section -->
    <UContainer class="-mt-20 relative z-20">
      <UCard class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl overflow-hidden p-8 lg:p-12">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-serif font-bold text-gray-900 mb-4">Registration & Interest</h2>
          <p class="text-gray-500">Please complete the form below to register your family for the upcoming Mahotsav celebrations.</p>
        </div>

        <div class="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScxDZHt3W1ecDnjt04TGl7JF_uQmAAcSz_0B5q3oZ46TyxTCg/viewform?embedded=true"
            width="100%"
            height="1800"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            class="w-full"
            >Loading Form...</iframe
          >
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Premras Ghanshyam Mahotsav | Woolwich Temple',
  meta: [
    { name: 'description', content: 'Register for the Premras Ghanshyam Mahotsav celebrations at SKSS Temple Woolwich.' }
  ]
})
</script>