<template>
  <div v-if="alerts.length > 0" class="w-full space-y-4 mb-8">
    <UAlert
      v-for="(alert, index) in alerts"
      :key="index"
      color="red"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
      class="glass-effect border-red-500/20 text-red-700 dark:text-red-900 font-medium"
      :ui="{ rounded: 'rounded-2xl' }"
    >
      <template #description>
        <CmsRichText :field="alert.primary.alert_message" />
      </template>
    </UAlert>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  fields: any
}>()

const alerts = computed(() => {
  return props.fields?.slices?.filter((slice: any) => slice.slice_label === 'alert') || []
})

const toasts = computed(() => {
  return props.fields?.slices?.filter((slice: any) => slice.slice_label === 'toast') || []
})

// Handle toasts on mount
onMounted(() => {
  const toast = useToast()
  
  toasts.value.forEach((t: any) => {
    toast.add({
      title: 'Announcement',
      description: t.primary.alert_message[0]?.text || '',
      icon: 'i-heroicons-information-circle',
      timeout: 10000,
      color: 'primary'
    })
  })
})
</script>
