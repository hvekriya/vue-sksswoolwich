<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Slideshow Posters</h2>
        <p class="text-sm text-gray-500">Manage the collection of posters displayed in the main slideshow.</p>
      </div>
      <UButton icon="i-heroicons-cloud-arrow-up" label="Upload Slideshow Poster" size="lg" color="golden"
        class="rounded-full shadow-lg" :loading="isUploading" @click="launchFilePicker" />
    </div>

    <!-- Hidden File Input -->
    <input ref="fileInput" type="file" accept="image/png, image/jpeg" class="hidden" @change="handleFileUpload" />

    <div v-if="slideshow.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="(poster, index) in slideshow" :key="index"
        class="group overflow-hidden rounded-[2rem] border-gray-100 dark:border-gray-800 shadow-xl"
        :ui="{ body: { padding: 'p-0' } }">
        <div class="relative aspect-[16/9]">
          <img :src="poster.url" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <UButton color="red" variant="soft" icon="i-heroicons-trash" label="Delete" class="rounded-full"
              @click="deletePoster(poster.fullPath)" />
          </div>
        </div>
      </UCard>
    </div>

    <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <USkeleton v-for="i in 3" :key="i" class="h-48 w-full rounded-[2rem]" />
    </div>

    <div v-else
      class="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
      <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-300 mb-4 mx-auto" />
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No slideshow posters</h3>
      <p class="text-gray-500">Upload images to start your main slideshow.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as storageRef, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'

const storage = useFirebaseStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const slideshow = ref<{ url: string, fullPath: string }[]>([])
const isUploading = ref(false)
const loading = ref(false)
const toast = useToast()

const fetchSlideshow = async () => {
  loading.value = true
  try {
    const listRef = storageRef(storage, 'slideshow/')
    const res = await listAll(listRef)
    const promises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return { url, fullPath: itemRef.fullPath }
    })
    slideshow.value = await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching slideshow:', error)
  } finally {
    loading.value = false
  }
}

const launchFilePicker = () => {
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
    const posterRef = storageRef(storage, `slideshow/${Date.now()}_${file.name}`)
    await uploadBytes(posterRef, file)
    toast.add({ title: 'Upload Successful', icon: 'i-heroicons-check-circle', color: 'green' })
    await fetchSlideshow()
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
    await fetchSlideshow()
  } catch (error) {
    console.error('Delete failed:', error)
    toast.add({ title: 'Delete Failed', color: 'red' })
  }
}

onMounted(fetchSlideshow)
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
