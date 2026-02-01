<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Pinned Posters</h2>
        <p class="text-sm text-gray-500">Manage the prominent posters displayed in the pinned section.</p>
      </div>
      <UButton icon="i-heroicons-cloud-arrow-up" label="Upload New Poster" size="lg" color="golden"
        class="rounded-full shadow-lg" :loading="isUploading" @click="launchFilePicker" />
    </div>

    <!-- Hidden File Input -->
    <input ref="fileInput" type="file" accept="image/png, image/jpeg" class="hidden" @change="handleFileUpload" />

    <UAlert v-if="pinnedPosters.length >= 2" icon="i-heroicons-information-circle" color="orange" variant="soft"
      title="Limit Reached"
      description="Maximum posters allowed in the Pinned Section is 2. Please delete an existing poster before uploading a new one." />

    <div v-if="pinnedPosters.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <UCard v-for="(poster, index) in pinnedPosters" :key="index"
        class="group overflow-hidden rounded-[2rem] border-gray-100 dark:border-gray-800 shadow-xl"
        :ui="{ body: { padding: 'p-0' } }">
        <div class="relative aspect-[16/9]">
          <img :src="poster.url" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <UButton color="red" variant="soft" icon="i-heroicons-trash" label="Delete Poster" class="rounded-full"
              @click="deletePoster(poster.fullPath)" />
          </div>
        </div>
      </UCard>
    </div>

    <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <USkeleton v-for="i in 2" :key="i" class="h-48 w-full rounded-[2rem]" />
    </div>

    <div v-else
      class="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
      <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-300 mb-4 mx-auto" />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No posters found</h3>
      <p class="text-gray-500">Get started by uploading your first pinned poster.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'

const storage = useFirebaseStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const pinnedPosters = ref<{ url: string, fullPath: string }[]>([])
const isUploading = ref(false)
const loading = ref(false)
const toast = useToast()

const fetchPosters = async () => {
  loading.value = true
  try {
    const listRef = storageRef(storage, 'pinned-posters/')
    const res = await listAll(listRef)
    const promises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return { url, fullPath: itemRef.fullPath }
    })
    pinnedPosters.value = await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching posters:', error)
  } finally {
    loading.value = false
  }
}

const launchFilePicker = () => {
  if (pinnedPosters.value.length >= 2) {
    toast.add({ title: 'Limit Reached', description: 'Please delete a poster first.', color: 'orange' })
    return
  }
  fileInput.value?.click()
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.match('image.*')) {
    toast.add({ title: 'Invalid File', description: 'Please upload an image file.', color: 'red' })
    return
  }

  isUploading.value = true
  try {
    const posterRef = storageRef(storage, `pinned-posters/${Date.now()}_${file.name}`)
    await uploadBytes(posterRef, file)
    toast.add({ title: 'Upload Successful', icon: 'i-heroicons-check-circle', color: 'green' })
    await fetchPosters()
  } catch (error) {
    console.error('Upload failed:', error)
    toast.add({ title: 'Upload Failed', description: 'Could not upload poster.', color: 'red' })
  } finally {
    isUploading.value = false
    target.value = ''
  }
}

const deletePoster = async (fullPath: string) => {
  if (!confirm('Are you sure you want to delete this poster?')) return

  try {
    const posterRef = storageRef(storage, fullPath)
    await deleteObject(posterRef)
    toast.add({ title: 'Deleted', description: 'Poster has been removed.', color: 'gray' })
    await fetchPosters()
  } catch (error) {
    console.error('Delete failed:', error)
    toast.add({ title: 'Delete Failed', color: 'red' })
  }
}

onMounted(fetchPosters)
</script>

<style scoped>
table,
th,
td {
  padding: 20px;
  border: 1px solid black;
}

strong {
  font-weight: 900;
}
</style>
