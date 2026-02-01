<template>
  <div class="search-component">
    <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass" size="xl" color="golden" variant="outline"
      placeholder="Search anything..." class="rounded-full shadow-lg" @keyup.enter="handleSearch">
      <template #trailing>
        <UButton color="golden" variant="ghost" label="Search" class="rounded-full mr-1 px-4" @click="handleSearch" />
      </template>
    </UInput>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("")
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search_results",
      query: { search: searchQuery.value },
    });
  }
}
</script>
