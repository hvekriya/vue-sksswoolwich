<template>
  <div class="wedding-hall-page">
    <template v-if="doc">
      <UContainer class="pt-12 pb-8">
        <h1
          class="text-4xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white text-center"
        >
          {{ doc.data.title[0]?.text }}
        </h1>
      </UContainer>

      <UContainer class="pb-20">
        <WeddingHallSlider
          :fields="{ slices: doc.data.body || [] }"
          class="shadow-2xl overflow-hidden rounded-2xl"
        />
      </UContainer>

      <!-- Content Section -->
      <UContainer class="py-20 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-8">
            <div class="prose prose-xl prose-golden dark:prose-invert max-w-none">
              <prismic-rich-text :field="doc.data.content" />
            </div>

            <div v-if="doc.data.cta_link" class="mt-12">
              <UButton
                :to="doc.data.cta_link.url"
                size="xl"
                color="golden"
                class="rounded-full px-10 font-bold py-4 text-lg shadow-xl shadow-golden-500/10"
              >
                {{ doc.data.cta_text[0]?.text || "Book Now" }}
              </UButton>
            </div>
          </div>

          <div class="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div
              class="p-8 bg-golden-50 dark:bg-golden-950/30 rounded-[2.5rem] border border-golden-100 dark:border-golden-500/10"
            >
              <UIcon name="i-heroicons-sparkles" class="w-10 h-10 text-golden-600 mb-6" />
              <h3 class="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Temple Wedding Venue
              </h3>
              <p class="text-sm text-gray-400 dark:text-gray-400 leading-relaxed mb-6">
                Our hall provides a serene and auspicious environment for your special
                day, combining modern amenities with traditional sanctity.
              </p>
              <ul class="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                <li class="flex items-center gap-3">
                  <UIcon name="i-heroicons-check-circle" class="text-golden-600" /> Large
                  Capacity
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-heroicons-check-circle" class="text-golden-600" />
                  Audio-Visual Setup
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-heroicons-check-circle" class="text-golden-600" />
                  Dedicated Parking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </UContainer>

      <!-- Contact Section -->
      <UContainer class="pb-32">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Ready to start planning?
          </h2>
          <p class="text-gray-500">
            Contact our dedicated events team to check availability and arrange a viewing.
          </p>
        </div>
        <WeddingContact />
      </UContainer>
    </template>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();

const { data: doc } = await useAsyncData("wedding-hall", () =>
  cms.getOurTempleByUid("wedding-hall")
);

if (!doc.value) {
  throw createError({ statusCode: 404, message: "Page not found" });
}

useHead({
  title: `${doc.value.data.title[0]?.text} | Woolwich Temple`,
  meta: [
    {
      name: "description",
      content: doc.value.data.content[0]?.text?.substring(0, 160) || "",
    },
  ],
});
</script>
