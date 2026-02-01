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

                        <div v-if="slideshow.length" class="grid grid-cols-3 gap-4 mt-6">
                            <div v-for="(url, idx) in slideshow" :key="idx"
                                class="relative aspect-video group overflow-hidden rounded-xl bg-gray-100">
                                <img :src="url" class="absolute inset-0 w-full h-full object-cover" />
                                <div
                                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <UButton variant="ghost" color="red" icon="i-heroicons-trash" size="sm"
                                        @click="deleteImage(url, 'slideshow')" />
                                </div>
                            </div>
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

                        <div v-if="pinnedPosters.length" class="grid grid-cols-3 gap-4 mt-6">
                            <div v-for="(url, idx) in pinnedPosters" :key="idx"
                                class="relative aspect-video group overflow-hidden rounded-xl bg-gray-100">
                                <img :src="url" class="absolute inset-0 w-full h-full object-cover" />
                                <div
                                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <UButton variant="ghost" color="red" icon="i-heroicons-trash" size="sm"
                                        @click="deleteImage(url, 'pinned-posters')" />
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref as storageRef, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'

definePageMeta({
    middleware: 'auth'
})

const storage = useFirebaseStorage()
const slideshow = ref<string[]>([])
const pinnedPosters = ref<string[]>([])
const uploadingType = ref<'slideshow' | 'pinned-posters' | null>(null)

const slideshowInput = ref<HTMLInputElement | null>(null)
const pinnedInput = ref<HTMLInputElement | null>(null)

const triggerUpload = (input: HTMLInputElement | null) => {
    input?.click()
}

async function fetchImages() {
    if (!storage) return

    // Fetch Slideshow
    const slideRef = storageRef(storage, 'slideshow/')
    const slideRes = await listAll(slideRef)
    slideshow.value = await Promise.all(slideRes.items.map(item => getDownloadURL(item)))

    // Fetch Pinned
    const pinnedRef = storageRef(storage, 'pinned-posters/')
    const pinnedRes = await listAll(pinnedRef)
    pinnedPosters.value = await Promise.all(pinnedRes.items.map(item => getDownloadURL(item)))
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

async function deleteImage(url: string, type: 'slideshow' | 'pinned-posters') {
    if (!storage) return
    try {
        // Note: This is simpler if we had the full path, but we can infer it or use Storage metadata
        // For now, let's just use the URL to find the object if possible or rely on listAll refresh
        const fileName = decodeURIComponent(url.split('/').pop()?.split('?')[0] || '')
        const fileRef = storageRef(storage, fileName)
        await deleteObject(fileRef)
        await fetchImages()
    } catch (err) {
        // If delete by full URL fails, we might need a better mapping, but usually Storage URLs contain the path
        console.error('Delete error:', err)
        // Refresh list anyway
        await fetchImages()
    }
}

onMounted(() => {
    fetchImages()
})

useHead({
    title: 'TV Posters | Woolwich Temple'
})
</script>
