<template>
    <AdminLayout>
        <div class="space-y-8">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Manage Announcements</h1>
                    <p class="text-gray-500 mt-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-information-circle" class="text-golden-500" />
                        Messages are displayed in order on the Public Website and Mandir TV.
                    </p>
                </div>
                <UButton color="golden" icon="i-heroicons-plus" size="xl" label="Add New Announcement"
                    class="rounded-full px-8 shadow-lg shadow-golden-500/20" @click="openEditor()" />
            </div>

            <!-- Gujarati Assist Hint -->
            <UAlert icon="i-heroicons-language" color="golden" variant="soft" title="Gujarati Typing Assist"
                description="Tip: You can use Gujarati IndiaTyping to convert English lipi to Gujarati script, then copy-paste here."
                :actions="[{ label: 'Open IndiaTyping', to: 'https://gujarati.indiatyping.com/', target: '_blank', color: 'golden', variant: 'outline' }]"
                class="rounded-3xl" />

            <!-- Announcements List -->
            <UCard class="rounded-3xl shadow-xl overflow-hidden" :ui="{ body: { padding: 'p-0' } }">
                <UTable :rows="sortedAnnouncements" :columns="columns" class="w-full"
                    :ui="{ th: { base: 'text-[10px] uppercase tracking-widest text-gray-900 font-bold bg-gray-50 dark:bg-gray-800/50' }, td: { base: 'py-6' } }">
                    <template #order-data="{ row }">
                        <span class="font-mono font-bold text-golden-600">{{ row.order }}</span>
                    </template>

                    <template #status-data="{ row }">
                        <UBadge :color="row.published ? 'green' : 'gray'" variant="soft"
                            :label="row.published ? 'Live' : 'Draft'" class="rounded-full" />
                    </template>

                    <template #title-data="{ row }">
                        <div class="max-w-md">
                            <p class="font-bold text-gray-900 dark:text-white mb-1">{{ row.title }}</p>
                            <div class="text-xs text-gray-900 line-clamp-1 prose prose-xs dark:prose-invert"
                                v-html="row.description"></div>
                        </div>
                    </template>

                    <template #actions-data="{ row }">
                        <div class="flex items-center gap-2">
                            <UButton variant="ghost" color="gray" icon="i-heroicons-pencil-square"
                                @click="openEditor(row)" />
                            <UButton variant="ghost" color="red" icon="i-heroicons-trash" @click="confirmDelete(row)" />
                        </div>
                    </template>
                </UTable>

                <div v-if="!announcements.length" class="p-20 text-center">
                    <UIcon name="i-heroicons-megaphone" class="w-12 h-12 text-gray-200 mb-4 mx-auto" />
                    <p class="text-gray-900">No announcements found. Add your first one above!</p>
                </div>
            </UCard>
        </div>

        <!-- Editor Modal -->
        <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-2xl', rounded: 'rounded-[2.5rem]' }">
            <div class="p-8 lg:p-12">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                        {{ editingItem ? 'Edit Announcement' : 'New Announcement' }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="rounded-full"
                        @click="isModalOpen = false" />
                </div>

                <UForm :state="formState" class="space-y-6" @submit="saveAnnouncement">
                    <div class="grid grid-cols-4 gap-6">
                        <UFormGroup label="Order Number" class="col-span-1">
                            <UInput v-model="formState.order" type="number" placeholder="1" size="xl" />
                        </UFormGroup>
                        <UFormGroup label="Title (Internal/Summary)" class="col-span-3">
                            <UInput v-model="formState.title" placeholder="e.g. Next Event Highlight" size="xl" />
                        </UFormGroup>
                    </div>

                    <UFormGroup label="Announcement Content (HTML Allowed)">
                        <UTextarea v-model="formState.description"
                            placeholder="Enter the message here. Supports Gujarati and small HTML tags like <br/> or <b>"
                            rows="6" size="xl" />
                    </UFormGroup>

                    <UFormGroup>
                        <UCheckbox v-model="formState.published" label="Publish immediately" />
                    </UFormGroup>

                    <div class="pt-6 flex gap-4">
                        <UButton type="submit" color="golden" size="xl" block
                            :label="editingItem ? 'Update Announcement' : 'Create Announcement'" :loading="isSaving"
                            class="rounded-full font-bold shadow-lg shadow-golden-500/10" />
                    </div>
                </UForm>
            </div>
        </UModal>

        <!-- Delete Confirmation -->
        <UModal v-model="isDeleteModalOpen" :ui="{ width: 'sm:max-w-md', rounded: 'rounded-3xl' }">
            <div class="p-8 text-center">
                <div
                    class="w-16 h-16 bg-red-50 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    <UIcon name="i-heroicons-exclamation-triangle" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Announcement?</h3>
                <p class="text-gray-500 text-sm mb-8 italic">"{{ itemToDelete?.title }}"</p>

                <div class="flex gap-4">
                    <UButton color="gray" variant="soft" label="Cancel" block class="rounded-xl"
                        @click="isDeleteModalOpen = false" />
                    <UButton color="red" label="Delete Forever" block class="rounded-xl" @click="doDelete" />
                </div>
            </div>
        </UModal>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref as dbRef, push, set, remove } from 'firebase/database'

definePageMeta({
    middleware: 'auth'
})

const db = useDatabase()
const announcements = useDatabaseList(dbRef(db, '/annoucements'))

const columns = [
    { key: 'order', label: '#' },
    { key: 'status', label: 'Status' },
    { key: 'title', label: 'Content' },
    { key: 'actions', label: '' }
]

const sortedAnnouncements = computed(() => {
    return [...announcements.value].sort((a: any, b: any) => (a.order || 99) - (b.order || 99))
})

// Modal State
const isModalOpen = ref(false)
const isSaving = ref(false)
const editingItem = ref<any>(null)
const formState = reactive({
    title: '',
    description: '',
    order: 1,
    published: true
})

// Delete State
const isDeleteModalOpen = ref(false)
const itemToDelete = ref<any>(null)

function openEditor(item?: any) {
    if (item) {
        editingItem.value = item
        formState.title = item.title
        formState.description = item.description
        formState.order = item.order || 1
        formState.published = item.published !== false
    } else {
        editingItem.value = null
        formState.title = ''
        formState.description = ''
        formState.order = (sortedAnnouncements.value.length + 1)
        formState.published = true
    }
    isModalOpen.value = true
}

async function saveAnnouncement() {
    isSaving.value = true
    try {
        if (editingItem.value) {
            const itemRef = dbRef(db, `/annoucements/${editingItem.value.key}`)
            await set(itemRef, { ...formState })
        } else {
            const listRef = dbRef(db, '/annoucements')
            await push(listRef, { ...formState })
        }
        isModalOpen.value = false
    } catch (err) {
        console.error('Save error:', err)
    } finally {
        isSaving.value = false
    }
}

function confirmDelete(item: any) {
    itemToDelete.value = item
    isDeleteModalOpen.value = true
}

async function doDelete() {
    if (!itemToDelete.value) return
    try {
        const itemRef = dbRef(db, `/annoucements/${itemToDelete.value.key}`)
        await remove(itemRef)
        isDeleteModalOpen.value = false
    } catch (err) {
        console.error('Delete error:', err)
    }
}

useHead({
    title: 'Manage Announcements | Woolwich Temple'
})
</script>
