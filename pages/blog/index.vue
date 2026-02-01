<template>
  <div class="blog-index pb-24">
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
          <UBadge color="golden" variant="soft" label="Weekly Wisdom & News" class="mb-4 rounded-full px-4" />
          <h1 class="text-5xl lg:text-8xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Our <span class="text-golden-500">Blog</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-900 max-w-2xl leading-relaxed">
            Spiritual insights, community stories, and mission dharma updates from Woolwich Mandir.
          </p>
        </div>
      </UContainer>
    </section>

    <UContainer class="-mt-12 relative z-20">
      <!-- Blog Categories -->
      <div v-if="weeklyWisdomPosts?.length" class="mb-20">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white border-l-4 border-golden-500 pl-4">
            Weekly Wisdom</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard v-for="(post, index) in weeklyWisdomPosts" :key="index"
            class="group hover:ring-2 hover:ring-golden-500/50 transition-all duration-300 rounded-[2rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md"
            :ui="{ body: { padding: 'p-0' } }">
            <div class="p-8 flex flex-col h-full">
              <div class="flex items-center gap-2 mb-4">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-golden-500" />
                <span class="text-xs font-medium text-gray-900">{{ formatDate(post.first_publication_date) }}</span>
              </div>

              <h3
                class="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-golden-600 transition-colors">
                {{ post.data.title[0]?.text }}
              </h3>

              <div class="text-gray-500 dark:text-gray-900 text-sm line-clamp-3 mb-8 flex-grow"
                v-html="excerpt(post.data.content)"></div>

              <UButton :to="'/blog/' + post.uid" variant="ghost" color="golden" label="Read More"
                trailing-icon="i-heroicons-arrow-right" class="px-0 hover:bg-transparent -ml-2" />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Mission Dharma -->
      <div v-if="missionDharmaPosts?.length">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white border-l-4 border-temple-red-500 pl-4">
            Mission Dharma</h2>
        </div>
        <div class="space-y-6">
          <UCard v-for="(post, index) in missionDharmaPosts" :key="index"
            class="group hover:border-temple-red-500/30 transition-all duration-300 rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-900/50">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div v-if="post.data.cover?.url" class="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                <img :src="post.data.cover.url"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-2">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4 text-temple-red-500" />
                  <span class="text-xs font-medium text-gray-900">{{ formatDate(post.first_publication_date) }}</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ post.data.title[0]?.text }}</h3>
                <div class="text-gray-500 text-sm line-clamp-2 mb-4" v-html="excerpt(post.data.content)"></div>
                <UButton :to="'/blog/' + post.uid" variant="soft" color="red" label="Continue Reading" size="sm"
                  class="rounded-full" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import * as prismic from '@prismicio/client'
const { client } = usePrismic()

const { data } = await useAsyncData('blog-posts', async () => {
  const [weekly, mission] = await Promise.all([
    client.getAllByType('blog', {
      filters: [
        prismic.filter.at('document.tags', ['weekly-wisdom'])
      ],
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }),
    client.getAllByType('blog', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    })
  ])

  // Filter out weekly wisdom from mission dharma to avoid duplicates if needed, 
  // or just show them separately as categorical.
  return {
    weeklyWisdomPosts: weekly,
    missionDharmaPosts: mission.filter((p: { tags: string[] }) => !p.tags?.includes('weekly-wisdom'))
  }
})

const weeklyWisdomPosts = computed(() => data.value?.weeklyWisdomPosts || [])
const missionDharmaPosts = computed(() => data.value?.missionDharmaPosts || [])

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const excerpt = (content: any) => {
  if (!content) return ''
  // If it's rich text, extract text
  if (Array.isArray(content)) {
    return content.map((c: any) => c.text).join(' ').substring(0, 150) + '...'
  }
  return content.toString().substring(0, 150) + '...'
}

useHead({
  title: 'Blog | Woolwich Temple',
  meta: [
    { name: 'description', content: 'Explore our latest updates, spiritual insights, and community stories.' }
  ]
})
</script>
