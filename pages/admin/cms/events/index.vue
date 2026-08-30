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

      <div v-else-if="eventList.length" class="space-y-4">
        <UCard
          v-for="event in eventList"
          :key="event.uid"
          class="rounded-2xl hover:border-golden-500/30 transition-all"
        >
          <div class="flex items-center gap-4">
            <NuxtLink
              :to="editPath(event.uid)"
              class="flex min-w-0 flex-1 items-center gap-4 cursor-pointer group"
            >
              <div
                class="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                :class="posterUrl(event)
                  ? 'border border-gray-200 dark:border-gray-700'
                  : 'border border-dashed border-gray-300 dark:border-gray-600'"
              >
                <img
                  v-if="posterUrl(event)"
                  :src="posterUrl(event)"
                  :alt="posterAlt(event)"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full flex-col items-center justify-center gap-0.5 text-gray-400"
                  title="No poster uploaded"
                >
                  <UIcon name="i-heroicons-photo" class="h-5 w-5" />
                  <span class="text-[9px] font-medium uppercase tracking-wide">None</span>
                </div>
              </div>
              <div class="min-w-0">
                <h3 class="font-bold text-gray-900 dark:text-white truncate group-hover:text-golden-700">
                  {{ eventTitle(event) }}
                </h3>
                <p class="text-sm text-gray-500 truncate">
                  {{ event.data.event_date }} · {{ event.data.event_location || '—' }}
                </p>
                <p
                  v-if="!posterUrl(event)"
                  class="mt-0.5 text-xs text-gray-400"
                >
                  No poster
                </p>
              </div>
            </NuxtLink>
            <div class="flex flex-shrink-0 gap-2 relative z-10">
              <NuxtLink
                :to="editPath(event.uid)"
                class="inline-flex items-center gap-1.5 rounded-full bg-golden-50 px-3 py-1.5 text-sm font-medium text-golden-700 cursor-pointer hover:bg-golden-100 dark:bg-golden-950/40 dark:text-golden-400 dark:hover:bg-golden-950/70"
              >
                <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
                Edit
              </NuxtLink>
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
definePageMeta({ middleware: 'auth', layout: 'admin' })

const cms = useCms()
const { data: events, pending } = await useAsyncData('admin-cms-events', () => cms.getAllEvents())

const eventList = computed(() => events.value ?? [])

function editPath(uid: string) {
  return `/admin/cms/events/${encodeURIComponent(uid)}`
}

function eventTitle(event: { data: { event_title: Array<{ text?: string }> } }) {
  const t = event.data.event_title?.[0]?.text
  return t || 'Untitled event'
}

function posterUrl(event: { data: { poster?: { url?: string }; poster_2?: { url?: string } } }) {
  return event.data.poster?.url || event.data.poster_2?.url || ''
}

function posterAlt(event: { data: { poster?: { alt?: string }; poster_2?: { alt?: string } } }) {
  return event.data.poster?.alt || event.data.poster_2?.alt || 'Event poster'
}

useHead({ title: 'Events | CMS Admin' })
</script>
