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

const currentYear = new Date().getFullYear()

const currentYearFilter = computed(() => {
  if (route.path.startsWith('/events/year/') && route.params.year) {
    return String(route.params.year)
  }
  if (route.path === '/events/past' && route.query.all === '1') {
    return 'All Years'
  }
  if (route.path === '/events/past') {
    return String(currentYear)
  }
  return 'All Years'
})

const startYear = 2020

const dropdownItems = computed(() => {
  const years = []
  years.push({
    label: 'All Years',
    to: '/events/past?all=1',
    click: () => { /* navigation via `to` */ }
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
