<template>
  <AdminLayout>
    <div class="space-y-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Our Temple Pages
          </h1>
          <p class="text-gray-500 mt-1">Edit static pages like Wedding Hall.</p>
        </div>
        <UButton
          to="/admin/cms/our-temple/new"
          color="golden"
          icon="i-heroicons-plus"
          size="md"
          class="rounded-full"
        >
          New page
        </UButton>
      </div>

      <div v-if="pending" class="grid gap-4">
        <USkeleton v-for="i in 3" :key="i" class="h-24 rounded-2xl" />
      </div>

      <div v-else-if="pages.length" class="space-y-4">
        <UCard
          v-for="page in pages"
          :key="page.uid"
          class="rounded-2xl hover:border-golden-500/30 transition-all"
        >
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white truncate">
                {{ page.data.title?.[0]?.text || page.uid }}
              </h3>
              <p class="text-sm text-gray-500">/our-temple/{{ page.uid }}</p>
            </div>
            <UButton
              :to="`/admin/cms/our-temple/${page.uid}`"
              variant="soft"
              color="golden"
              icon="i-heroicons-pencil-square"
              size="sm"
              class="rounded-full"
            >
              Edit
            </UButton>
          </div>
        </UCard>
      </div>

      <UCard v-else class="rounded-2xl">
        <div class="p-12 text-center text-gray-500">
          <UIcon name="i-heroicons-building-library" class="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No Our Temple pages in Firestore yet. Add content via migration or create manually in Firebase Console.</p>
        </div>
      </UCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const cms = useCms()
const { data: pages, pending } = await useAsyncData('admin-cms-our-temple', () => cms.getAllOurTemple())

useHead({ title: 'Our Temple | CMS Admin' })
</script>
