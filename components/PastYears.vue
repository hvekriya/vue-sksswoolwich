<template>
  <div class="filter-dropdown-container">
    <UDropdown
      :items="[dropdownItems]"
      :popper="{ placement: 'bottom-end' }"
      class="w-full md:w-auto"
    >
      <UButton
        color="golden"
        variant="soft"
        :label="`Filter by year: ${currentYearFilter}`"
        trailing-icon="i-heroicons-chevron-down-20-solid"
        class="rounded-full px-6 py-2 font-bold shadow-sm hover:shadow-md transition-all w-full md:w-auto"
        :ui="{ rounded: 'rounded-full' }"
      />
      
      <template #item="{ item }">
        <div class="flex items-center justify-between w-full px-2">
          <span>{{ item.label }}</span>
          <UIcon v-if="item.label === currentYearFilter" name="i-heroicons-check-20-solid" class="w-4 h-4 text-golden-500" />
        </div>
      </template>
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const currentYearFilter = computed(() => (route.params.year as string) || 'All Years')

const startYear = 2020
const currentYear = new Date().getFullYear()

const dropdownItems = computed(() => {
  const years = []
  // Add "All Years" option
  years.push({
    label: 'All Years',
    to: '/events/past',
    click: () => { /* Handle click if needed beyond navigation */ }
  })
  
  for (let year = currentYear; year >= startYear; year--) {
    years.push({
      label: year.toString(),
      to: `/events/year/${year}`,
      click: () => { /* Handle click */ }
    })
  }
  return years
})
</script>
