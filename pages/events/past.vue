<template>
  <div class="events-page-wrapper">
    <!-- Header Section (Subtle version for listing) -->
    <section class="bg-gray-50 border-b border-gray-100 py-16">
      <UContainer>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 class="text-4xl font-serif font-bold text-gray-900 mb-2">Memory <span
                class="text-temple-red-500">Archive</span></h1>
            <p class="text-gray-500 max-w-lg">
              Relive the vibrant celebrations and cherished moments from our past events and festivals.
            </p>
          </div>
          <div class="flex items-center space-x-1 bg-white p-1 rounded-full shadow-sm border border-gray-100">
            <UButton to="/events" variant="ghost" color="gray" label="Upcoming" class="rounded-full px-4" />
            <UButton to="/events/past" variant="soft" color="golden" label="Past Events" class="rounded-full px-4" />
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-16">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-golden-50 rounded-2xl">
            <UIcon name="i-heroicons-archive-box" class="w-6 h-6 text-golden-600" />
          </div>
          <h2 class="text-2xl font-serif font-bold text-gray-900">Historical Events</h2>
        </div>

        <!-- Filter Integration -->
        <PastYears />
      </div>

      <!-- Provide default empty array if pastEvents is null (to avoid PropType warning) -->
      <PastEvents :past-events="(pastEvents as any[]) || []" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import * as prismic from '@prismicio/client'

const { client } = usePrismic()
const route = useRoute()

// Define activeYear ref, assuming it's managed by PastYears component or route params
// For this change, we'll assume it's available, e.g., from a composable or prop.
// If not provided by the user, a placeholder ref is needed for the code to be syntactically correct.
const activeYear = ref(route.params.year ? route.params.year.toString() : 'All')

const { data: pastEvents } = await useAsyncData('past-events-list', async () => {
  const filterYear = route.params.year ? parseInt(route.params.year as string) : null
  const today = new Date().toISOString().split('T')[0]

  const predicates = [
    prismic.filter.at('document.type', 'events'),
    prismic.filter.dateBefore('my.events.event_date', today)
  ]

  if (activeYear.value !== 'All') {
    const startOfYear = `${activeYear.value}-01-01`
    const endOfYear = `${activeYear.value}-12-31`
    predicates.push(prismic.filter.dateAfter('my.events.event_date', startOfYear))
    predicates.push(prismic.filter.dateBefore('my.events.event_date', endOfYear))
  }

  const response = await client.get({
    filters: predicates,
    orderings: {
      field: 'my.events.event_date',
      direction: 'desc'
    }
  })

  return response.results
}, {
  watch: [() => route.params.year]
})

useHead({
  title: 'Past Events Archive | Woolwich Temple',
  meta: [
    { name: 'description', content: 'Relive the beautiful celebrations and moments from the history of Shree Swaminarayan Mandir Woolwich.' }
  ]
})
</script>
