<template>
  <AdminLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
          CMS Content
        </h1>
        <p class="text-gray-500 mt-1">
          Edit website content stored in Firebase. Changes appear on the live site.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink to="/admin/cms/home" class="block">
          <UCard
            class="rounded-2xl hover:border-golden-500/40 transition-all cursor-pointer group"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 bg-golden-50 dark:bg-golden-950/30 rounded-2xl group-hover:scale-105 transition-transform">
                <UIcon name="i-heroicons-home" class="w-8 h-8 text-golden-600" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white">Home Page</h3>
                <p class="text-sm text-gray-500">Hero, alert and live stream</p>
              </div>
            </div>
            <template #footer>
              <span class="flex items-center justify-center gap-2 text-golden-600 font-medium">
                Edit Home
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </span>
            </template>
          </UCard>
        </NuxtLink>

        <NuxtLink to="/admin/cms/events" class="block">
          <UCard
            class="rounded-2xl hover:border-golden-500/40 transition-all cursor-pointer group"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 bg-golden-50 dark:bg-golden-950/30 rounded-2xl group-hover:scale-105 transition-transform">
                <UIcon name="i-heroicons-calendar-days" class="w-8 h-8 text-golden-600" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white">Events</h3>
                <p class="text-sm text-gray-500">Upcoming and past events</p>
              </div>
            </div>
            <template #footer>
              <span class="flex items-center justify-center gap-2 text-golden-600 font-medium">
                Manage Events
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </span>
            </template>
          </UCard>
        </NuxtLink>

        <NuxtLink to="/admin/cms/our-temple" class="block">
          <UCard
            class="rounded-2xl hover:border-golden-500/40 transition-all cursor-pointer group"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 bg-temple-red-50 dark:bg-temple-red-950/30 rounded-2xl group-hover:scale-105 transition-transform">
                <UIcon name="i-heroicons-building-library" class="w-8 h-8 text-temple-red-600" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white">Our Temple</h3>
                <p class="text-sm text-gray-500">Static pages (e.g. wedding hall)</p>
              </div>
            </div>
            <template #footer>
              <span class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                Manage Pages
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </span>
            </template>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'CMS | Admin' })
</script>
