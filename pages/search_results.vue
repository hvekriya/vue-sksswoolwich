<template>
  <div class="search-results pb-24">
    <!-- Immersive Header -->
    <section class="relative h-[40vh] flex flex-col justify-end pb-12 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gray-950/20 dark:bg-black/40"></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-black via-gray-50/80 dark:via-black/80 to-transparent">
        </div>
      </div>

      <UContainer class="relative z-10 text-center">
        <h1 class="text-4xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Search <span class="text-golden-500">Results</span>
        </h1>
        <div class="max-w-xl mx-auto relative group">
          <UInput v-model="searchQuery" placeholder="Search our wisdom..." size="xl" icon="i-heroicons-magnifying-glass"
            class="rounded-full shadow-2xl" @keyup.enter="refreshSearch" />
        </div>
      </UContainer>
    </section>

    <UContainer class="py-12 relative z-20">
      <div v-if="articles?.length" class="space-y-8">
        <p class="text-gray-500 dark:text-gray-900 mb-8 italic">
          Showing results for <span class="font-bold text-golden-600">"{{ searchQuery }}"</span>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UCard v-for="(item, index) in articles" :key="index"
            class="group hover:ring-2 hover:ring-golden-500/50 transition-all duration-300 rounded-[2.5rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
            <div class="flex gap-6 items-start p-6">
              <div v-if="item.data.cover?.url" class="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                <img :src="item.data.cover.url"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="flex-grow">
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-golden-600 transition-colors">
                  {{ item.data.title[0]?.text }}
                </h3>
                <div class="text-gray-500 dark:text-gray-900 text-sm line-clamp-2 mb-4"
                  v-html="excerpt(item.data.content)"></div>
                <UButton :to="`/our-temple/${item.uid}`" variant="ghost" color="golden" label="Learn More" size="sm"
                  class="px-0 hover:bg-transparent -ml-2" />
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div v-else-if="!pending" class="text-center py-20">
        <UIcon name="i-heroicons-face-frown" class="w-16 h-16 text-gray-300 mb-4 mx-auto" />
        <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
        <p class="text-gray-500 max-w-sm mx-auto">We couldn't find anything matching your search. Try different
          keywords.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <USkeleton v-for="i in 4" :key="i" class="h-40 w-full rounded-[2.5rem]" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const cms = useCms();

const searchQuery = ref((route.query.search as string) || "");

const { data: articles, pending, refresh } = await useAsyncData(
  () => `search-results-${String(route.query.search || "")}`,
  async () => {
    if (!searchQuery.value) return [];

    const all = await cms.getAllOurTemple();
    const q = searchQuery.value.toLowerCase();
    return all.filter((doc: any) => {
      const title = doc.data.title?.map((t: any) => t.text).join(" ") ?? "";
      const content = doc.data.content?.map((c: any) => c.text).join(" ") ?? "";
      return (title + " " + content).toLowerCase().includes(q);
    });
  }
);

const refreshSearch = () => {
  router.push({ query: { search: searchQuery.value } })
  refresh()
}

const excerpt = (content: any) => {
  if (!content) return ''
  if (Array.isArray(content)) {
    return content.map((c: any) => c.text).join(' ').substring(0, 120) + '...'
  }
  return content.toString().substring(0, 120) + '...'
}

useHead({
  title: 'Search Results | Woolwich Temple',
  meta: [
    { name: 'description', content: `Search results for ${searchQuery.value} on Woolwich Temple.` }
  ]
})
</script>
