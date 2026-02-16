<template>
  <div class="static-page">
    <template v-if="doc">
      <!-- Immersive Header Section -->
      <section
        class="relative bg-gray-950 min-h-[50vh] flex flex-col justify-end py-24 lg:py-32 overflow-hidden"
      >
        <div class="absolute inset-0 z-0">
          <img
            v-if="doc.data.cover_image?.url"
            :src="doc.data.cover_image.url"
            class="w-full h-full object-cover opacity-30 scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"
          ></div>
          <div
            class="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-golden-500/10 rounded-full blur-[160px]"
          ></div>
        </div>

        <UContainer class="relative z-10">
          <div class="max-w-4xl">
            <h1
              class="text-5xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
            >
              {{ doc.data.title[0]?.text }}
            </h1>
            <div class="w-24 h-2 bg-golden-500 rounded-full"></div>
          </div>
        </UContainer>
      </section>

      <!-- Main Content -->
      <UContainer class="py-20 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-8">
            <!-- Breadcrumbs -->
            <nav
              class="mb-12 flex items-center space-x-2 text-sm font-medium text-gray-900"
            >
              <NuxtLink
                to="/"
                class="text-golden-500 hover:text-golden-500 transition-colors"
                >Home</NuxtLink
              >
              <UIcon name="i-heroicons-chevron-right text-golden-500" class="w-4 h-4" />
              <span class="text-gray-400 dark:text-gray-300">{{
                doc.data.title[0]?.text
              }}</span>
            </nav>

            <div class="prose prose-xl prose-golden dark:prose-invert max-w-none">
              <CmsRichText :field="doc.data.content" />
            </div>

            <!-- CTA Section -->
            <div
              v-if="doc.data.cta_link && doc.data.cta_text"
              class="mt-16 p-12 bg-gray-900 rounded-[3rem] text-center border border-white/5 relative overflow-hidden group"
            >
              <div class="relative z-10">
                <h3 class="text-2xl font-serif font-bold text-white mb-6 italic">
                  Learn more about our community
                </h3>
                <UButton
                  :to="doc.data.cta_link.url"
                  size="xl"
                  color="golden"
                  class="rounded-full px-12 font-bold py-5 text-xl shadow-2xl shadow-golden-500/20"
                >
                  {{ doc.data.cta_text[0]?.text }}
                </UButton>
              </div>
              <UIcon
                name="i-heroicons-sparkles"
                class="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:rotate-12 transition-transform duration-700"
              />
            </div>
          </div>

          <!-- Sidebar Decoration -->
          <div class="lg:col-span-4 lg:sticky lg:top-28">
            <div
              v-if="doc.data.icon?.url"
              class="p-10 bg-white dark:bg-gray-900 rounded-[3rem] border border-golden-500/10 shadow-3xl flex flex-col items-center text-center group"
            >
              <div
                class="w-40 h-40 flex items-center justify-center bg-golden-50 dark:bg-golden-950/20 rounded-[2.5rem] mb-10 group-hover:rotate-6 transition-transform duration-700"
              >
                <img :src="doc.data.icon.url" class="w-24 h-auto drop-shadow-2xl" />
              </div>
              <p class="text-lg italic text-gray-500 font-serif leading-relaxed px-4">
                "Preserving the spiritual legacy of Shree Swaminarayan Bhagwan through
                tradition and service."
              </p>
              <div class="mt-8 text-golden-600">
                <UIcon name="i-heroicons-sparkles" class="w-6 h-6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </template>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();
const route = useRoute();

const { data: doc } = await useAsyncData(`our-temple-${route.params.uid}`, () =>
  cms.getOurTempleByUid(route.params.uid as string)
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

<style scoped>
.prose :deep(p) {
  @apply mb-8 leading-relaxed opacity-90;
}

.prose :deep(h2),
.prose :deep(h3) {
  @apply font-serif font-bold text-gray-900 dark:text-white mt-12 mb-6;
}

.prose :deep(ul) {
  @apply space-y-4 my-8;
}

.prose :deep(li) {
  @apply flex gap-3;
}

.prose :deep(li)::before {
  content: "✦";
  @apply text-golden-500 font-bold shrink-0;
}
</style>
