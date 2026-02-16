<template>
  <AdminLayout>
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Events
          </h1>
          <p class="text-gray-500 mt-1">Edit events shown on the website.</p>
        </div>
        <UButton
          to="/admin/cms/events/new"
          color="golden"
          icon="i-heroicons-plus"
          label="New Event"
          class="rounded-full"
        />
      </div>

      <div v-if="pending" class="grid gap-4">
        <USkeleton v-for="i in 5" :key="i" class="h-24 rounded-2xl" />
      </div>

      <div v-else-if="events.length" class="space-y-4">
        <UCard
          v-for="event in events"
          :key="event.uid"
          class="rounded-2xl hover:border-golden-500/30 transition-all"
        >
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white truncate">
                {{ eventTitle(event) }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ event.data.event_date }} · {{ event.data.event_location || '—' }}
              </p>
            </div>
            <div class="flex gap-2">
              <UButton
                :to="`/admin/cms/events/${event.uid}`"
                variant="soft"
                color="golden"
                icon="i-heroicons-pencil-square"
                size="sm"
                class="rounded-full"
              >
                Edit
              </UButton>
              <UButton
                :to="`/events/${event.uid}`"
                variant="ghost"
                color="gray"
                icon="i-heroicons-arrow-top-right-on-square"
                size="sm"
                class="rounded-full"
                target="_blank"
              >
                View
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <UCard v-else class="rounded-2xl">
        <div class="p-12 text-center text-gray-500">
          <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No events yet. Create one to get started.</p>
          <UButton to="/admin/cms/events/new" color="golden" class="mt-4 rounded-full">
            New Event
          </UButton>
        </div>
      </UCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const cms = useCms()
const { data: events, pending } = await useAsyncData('admin-cms-events', () => cms.getAllEvents())

function eventTitle(event: { data: { event_title: Array<{ text?: string }> } }) {
  const t = event.data.event_title?.[0]?.text
  return t || 'Untitled event'
}

useHead({ title: 'Events | CMS Admin' })
</script>
