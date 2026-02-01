<template>
  <div class="education-page">
    <template v-if="doc">
      <!-- Immersive Header -->
      <section class="relative bg-gray-950 py-32 lg:py-48 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent"></div>
          <div class="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-golden-500/10 rounded-full blur-[160px]"></div>
          <div class="absolute -bottom-32 -left-32 w-[40rem] h-[40rem] bg-temple-red-500/10 rounded-full blur-[160px]">
          </div>
        </div>

        <UContainer class="relative z-10">
          <div class="max-w-4xl">
            <UBadge color="golden" variant="soft" label="Swaminarayan Education" class="mb-4 rounded-full px-4" />
            <h1 class="text-5xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
              {{ doc.data.title[0]?.text }}
            </h1>
            <p class="text-gray-900 text-xl font-light leading-relaxed max-w-2xl">
              Nurturing young minds through spiritual wisdom, cultural heritage, and academic excellence.
            </p>
          </div>
        </UContainer>
      </section>

      <!-- Main Content -->
      <UContainer class="py-20 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <!-- Main Content -->
          <div class="lg:col-span-8 space-y-12">
            <div class="prose prose-xl prose-golden dark:prose-invert max-w-none">
              <prismic-rich-text :field="doc.data.content" />
            </div>

            <div v-if="doc.data.cta_link && doc.data.cta_text" class="pt-8 flex flex-wrap gap-4">
              <UButton :to="doc.data.cta_link.url" size="xl" color="golden"
                class="rounded-full px-10 font-bold py-4 text-lg">
                {{ doc.data.cta_text[0]?.text }}
              </UButton>
            </div>
          </div>

          <!-- Sidebar Info -->
          <div class="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <UCard class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl overflow-hidden">
              <div class="p-8 bg-golden-50 dark:bg-golden-950/20">
                <div class="flex items-center gap-4 mb-8">
                  <div class="p-3 bg-white dark:bg-gray-950 rounded-2xl shadow-sm">
                    <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-golden-600" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">Our Location</h3>
                    <div class="w-12 h-0.5 bg-golden-500/40 rounded-full"></div>
                  </div>
                </div>

                <address class="not-italic text-gray-600 dark:text-gray-900 space-y-6 mb-8">
                  <p class="font-bold text-gray-900 dark:text-white text-lg">SKSS Temple Woolwich</p>
                  <p class="font-medium">St. Margarets Grove,<br />London, SE18 7RL</p>

                  <div class="flex items-center gap-4 py-6 border-t border-golden-500/10">
                    <div class="w-10 h-10 bg-golden-500/10 rounded-xl flex items-center justify-center">
                      <UIcon name="i-heroicons-phone" class="text-golden-600" />
                    </div>
                    <div>
                      <p class="text-xs uppercase tracking-widest text-gray-900 font-bold mb-1">Call Us</p>
                      <a href="tel:+442088540823"
                        class="font-bold text-gray-900 dark:text-white hover:text-golden-600 transition-colors">+44 20
                        8854 0823</a>
                    </div>
                  </div>

                  <div class="flex items-center gap-4 py-6 border-t border-golden-500/10">
                    <div class="w-10 h-10 bg-golden-500/10 rounded-xl flex items-center justify-center">
                      <UIcon name="i-heroicons-envelope" class="text-golden-600" />
                    </div>
                    <div>
                      <p class="text-xs uppercase tracking-widest text-gray-900 font-bold mb-1">Email Us</p>
                      <a href="mailto:info@sksswoolwich.org"
                        class="font-bold text-gray-900 dark:text-white hover:text-golden-600 transition-colors">info@sksswoolwich.org</a>
                    </div>
                  </div>
                </address>

                <UButton to="https://maps.app.goo.gl/YourTempleGoogleMapsLink" target="_blank" block color="golden"
                  size="xl" label="Get Directions" icon="i-heroicons-arrow-top-right-on-square"
                  class="rounded-2xl font-bold py-4 shadow-lg shadow-golden-500/10" />
              </div>
            </UCard>

            <div class="p-8 bg-gray-900 rounded-[2.5rem] text-white relative overflow-hidden">
              <h4 class="text-xl font-serif font-bold mb-4 italic">Parent Support</h4>
              <p class="text-sm text-gray-900 leading-relaxed">
                Need more information about our curriculum or enrollment process? Please contact our education
                coordinator.
              </p>
              <UIcon name="i-heroicons-academic-cap" class="absolute -bottom-10 -right-10 w-40 h-40 text-white/5" />
            </div>
          </div>
        </div>
      </UContainer>
    </template>
  </div>
</template>

<script setup lang="ts">
const { client } = usePrismic()

const { data: doc } = await useAsyncData('swaminarayan-education', () =>
  client.getByUID('our-temple', 'swaminarayan-education')
)

if (!doc.value) {
  throw createError({ statusCode: 404, message: 'Page not found' })
}

useHead({
  title: `${doc.value.data.title[0]?.text} | Woolwich Temple Education`,
  meta: [
    { name: 'description', content: 'Academic and spiritual classes at SKSS Temple Woolwich. Nurturing the next generation.' }
  ]
})
</script>

<style scoped>
.prose :deep(p) {
  @apply mb-8 leading-relaxed opacity-90;
}

.prose :deep(h2),
.prose :deep(h3) {
  @apply font-serif font-bold text-gray-900 dark:text-white mt-12 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2;
}
</style>
