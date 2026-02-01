<template>
    <AdminLayout>
        <div class="space-y-12">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">TV Display Management</h1>
                    <p class="text-gray-500 mt-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-tv" class="text-golden-500" />
                        Upload and manage posters displayed on the Mandir TV screens.
                    </p>
                </div>
                <UButton to="/display" target="_blank" variant="soft" color="golden"
                    icon="i-heroicons-presentation-chart-bar" size="xl" label="Launch TV Display"
                    class="rounded-full px-8 shadow-lg shadow-golden-500/10" />
            </div>

            <!-- Upload Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UCard class="rounded-[2.5rem] border-golden-500/10 shadow-xl overflow-hidden">
                    <template #header>
                        <div class="flex items-center gap-4">
                            <div class="p-2 bg-golden-50 dark:bg-golden-950 rounded-xl">
                                <UIcon name="i-heroicons-photo" class="text-golden-600" />
                            </div>
                            <h3 class="font-bold text-gray-900 dark:text-white">Main Slideshow</h3>
                        </div>
                    </template>

                    <div class="p-6 space-y-6">
                        <p class="text-sm text-gray-500">Posters in the main rotating slideshow. Suggest 1920x1080
                            resolution.</p>
                        <input type="file" accept="image/*" multiple class="hidden" ref="slideshowInput"
                            @change="uploadImages($event, 'slideshow')" />
                        <UButton block color="golden" variant="soft" label="Upload Slideshow Posters"
                            icon="i-heroicons-arrow-up-tray" class="rounded-2xl py-4 font-bold"
                            @click="triggerUpload(slideshowInput)" :loading="uploadingType === 'slideshow'" />

                        <div class="mt-6">
                            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Existing slideshow posters ({{ slideshow.length }})
                            </h4>
                            <div v-if="loadingSlideshow" class="space-y-4">
                                <USkeleton v-for="i in 3" :key="i" class="h-48 rounded-xl" />
                            </div>
                            <div v-else-if="slideshow.length" class="space-y-4">
                                <div v-for="(item, idx) in slideshow" :key="item.fullPath"
                                    class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <div class="aspect-video bg-gray-100 dark:bg-gray-800">
                                        <img :src="item.url" class="w-full h-full object-contain" alt="Slideshow poster" />
                                    </div>
                                    <div class="p-3 flex items-center justify-between gap-3">
                                        <span class="text-xs text-gray-500">Poster {{ idx + 1 }}</span>
                                        <UButton variant="solid" color="red" icon="i-heroicons-trash" size="sm"
                                            label="Delete" @click="confirmDelete(item)" />
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-sm text-gray-500 italic py-4">No slideshow posters yet. Upload above.</p>
                        </div>
                    </div>
                </UCard>

                <UCard class="rounded-[2.5rem] border-temple-red-500/10 shadow-xl overflow-hidden">
                    <template #header>
                        <div class="flex items-center gap-4">
                            <div class="p-2 bg-red-50 dark:bg-red-950 rounded-xl">
                                <UIcon name="i-heroicons-bookmark" class="text-temple-red-500" />
                            </div>
                            <h3 class="font-bold text-gray-900 dark:text-white">Pinned / Static Posters</h3>
                        </div>
                    </template>

                    <div class="p-6 space-y-6">
                        <p class="text-sm text-gray-500">Important notices pinned below the main slideshow.</p>
                        <input type="file" accept="image/*" multiple class="hidden" ref="pinnedInput"
                            @change="uploadImages($event, 'pinned-posters')" />
                        <UButton block color="red" variant="soft" label="Upload Pinned Posters"
                            icon="i-heroicons-arrow-up-tray" class="rounded-2xl py-4 font-bold"
                            @click="triggerUpload(pinnedInput)" :loading="uploadingType === 'pinned-posters'" />

                        <div class="mt-6">
                            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Existing pinned posters ({{ pinnedPosters.length }})
                            </h4>
                            <div v-if="loadingPinned" class="space-y-4">
                                <USkeleton v-for="i in 3" :key="i" class="h-48 rounded-xl" />
                            </div>
                            <div v-else-if="pinnedPosters.length" class="space-y-4">
                                <div v-for="(item, idx) in pinnedPosters" :key="item.fullPath"
                                    class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <div class="aspect-video bg-gray-100 dark:bg-gray-800">
                                        <img :src="item.url" class="w-full h-full object-contain" alt="Pinned poster" />
                                    </div>
                                    <div class="p-3 flex items-center justify-between gap-3">
                                        <span class="text-xs text-gray-500">Poster {{ idx + 1 }}</span>
                                        <UButton variant="solid" color="red" icon="i-heroicons-trash" size="sm"
                                            label="Delete" @click="confirmDelete(item)" />
                                    </div>
                                </div>
                            </div>
                            <p v-else class="text-sm text-gray-500 italic py-4">No pinned posters yet. Upload above.</p>
                        </div>
                    </div>
                </UCard>
            </div>

            <!-- Delete poster confirmation -->
            <UModal v-model="isDeleteModalOpen" :ui="{ width: 'sm:max-w-lg', rounded: 'rounded-2xl sm:rounded-3xl' }">
                <div class="flex flex-col max-h-[90vh] overflow-hidden">
                    <div class="p-6 sm:p-8 text-center flex-shrink-0">
                        <div
                            class="w-16 h-16 bg-red-50 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <UIcon name="i-heroicons-exclamation-triangle" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete this poster?</h3>
                        <p class="text-gray-500 text-sm mb-4">This will remove the poster from the TV display. This action cannot be undone.</p>
                        <div v-if="itemToDelete" class="aspect-video max-w-xs mx-auto rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <img :src="itemToDelete.url" class="w-full h-full object-contain" alt="" />
                        </div>
                    </div>
                    <div class="flex gap-3 p-6 sm:p-8 pt-0 flex-shrink-0 border-t border-gray-200 dark:border-gray-700 min-w-0">
                        <UButton color="gray" variant="soft" label="Cancel" class="flex-1 min-w-0 rounded-xl"
                            @click="isDeleteModalOpen = false" />
                        <UButton color="red" label="Delete Forever" class="flex-1 min-w-0 rounded-xl"
                            :loading="isDeleting" @click="doDelete" />
                    </div>
                </div>
            </UModal>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref as storageRef, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'

definePageMeta({
    middleware: 'auth'
})

type StorageItem = { url: string; fullPath: string }

const storage = useFirebaseStorage()
const slideshow = ref<StorageItem[]>([])
const pinnedPosters = ref<StorageItem[]>([])
const loadingSlideshow = ref(false)
const loadingPinned = ref(false)
const uploadingType = ref<'slideshow' | 'pinned-posters' | null>(null)

const slideshowInput = ref<HTMLInputElement | null>(null)
const pinnedInput = ref<HTMLInputElement | null>(null)

const isDeleteModalOpen = ref(false)
const itemToDelete = ref<StorageItem | null>(null)
const isDeleting = ref(false)

function confirmDelete(item: StorageItem) {
    itemToDelete.value = item
    isDeleteModalOpen.value = true
}

const triggerUpload = (input: HTMLInputElement | null) => {
    input?.click()
}

async function fetchImages() {
    if (!storage) return

    loadingSlideshow.value = true
    loadingPinned.value = true
    try {
        const slideRef = storageRef(storage, 'slideshow/')
        const slideRes = await listAll(slideRef)
        slideshow.value = await Promise.all(
            slideRes.items.map(async (item) => ({
                url: await getDownloadURL(item),
                fullPath: item.fullPath
            }))
        )

        const pinnedRef = storageRef(storage, 'pinned-posters/')
        const pinnedRes = await listAll(pinnedRef)
        pinnedPosters.value = await Promise.all(
            pinnedRes.items.map(async (item) => ({
                url: await getDownloadURL(item),
                fullPath: item.fullPath
            }))
        )
    } finally {
        loadingSlideshow.value = false
        loadingPinned.value = false
    }
}

async function uploadImages(event: any, type: 'slideshow' | 'pinned-posters') {
    if (!storage || !event.target.files.length) return

    uploadingType.value = type
    try {
        const files = event.target.files
        for (const file of files) {
            const fileRef = storageRef(storage, `${type}/${Date.now()}_${file.name}`)
            await uploadBytes(fileRef, file)
        }
        await fetchImages()
    } catch (err) {
        console.error('Upload Error:', err)
    } finally {
        uploadingType.value = null
    }
}

async function doDelete() {
    if (!itemToDelete.value || !storage) return
    isDeleting.value = true
    try {
        const fileRef = storageRef(storage, itemToDelete.value.fullPath)
        await deleteObject(fileRef)
        isDeleteModalOpen.value = false
        itemToDelete.value = null
        await fetchImages()
    } catch (err) {
        console.error('Delete error:', err)
        await fetchImages()
    } finally {
        isDeleting.value = false
    }
}

onMounted(() => {
    fetchImages()
})

useHead({
    title: 'TV Posters | Woolwich Temple'
})
</script>
