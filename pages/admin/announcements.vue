<template>
    <AdminLayout>
        <div class="space-y-8">
            <!-- Header Section -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div class="min-w-0">
                    <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">Manage Announcements</h1>
                    <p class="text-gray-500 mt-1 sm:mt-2 flex items-center gap-2 text-sm sm:text-base">
                        <UIcon name="i-heroicons-information-circle" class="text-golden-500 flex-shrink-0" />
                        <span>Messages are displayed in order on the Public Website and Mandir TV.</span>
                    </p>
                </div>
                <UButton color="golden" icon="i-heroicons-plus" size="lg" label="Add New Announcement"
                    class="rounded-full px-6 sm:px-8 shadow-lg shadow-golden-500/20 flex-shrink-0" @click="openEditor()" />
            </div>

            <!-- Gujarati Assist Hint -->
            <UAlert icon="i-heroicons-language" color="golden" variant="soft" title="Gujarati Typing Assist"
                description="Tip: You can use Gujarati IndiaTyping to convert English lipi to Gujarati script, then copy-paste here."
                :actions="[{ label: 'Open IndiaTyping', to: 'https://gujarati.indiatyping.com/', target: '_blank', color: 'golden', variant: 'outline' }]"
                class="rounded-3xl" />

            <!-- Announcements List -->
            <UCard class="rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden" :ui="{ body: { padding: 'p-0' } }">
                <div class="overflow-x-auto">
                    <UTable :rows="sortedAnnouncements" :columns="columns" class="w-full min-w-[600px]"
                        :ui="{ th: { base: 'text-[10px] uppercase tracking-widest text-gray-900 font-bold bg-gray-50 dark:bg-gray-800/50' }, td: { base: 'py-4 sm:py-6' } }">
                        <template #order-data="{ row }">
                            <span class="font-mono font-bold text-golden-600">{{ row.order }}</span>
                        </template>

                        <template #title-data="{ row }">
                            <div class="max-w-md min-w-[200px]">
                                <p class="font-bold text-gray-900 dark:text-white mb-1">{{ row.title }}</p>
                                <div class="text-xs text-gray-900 line-clamp-1 prose prose-xs dark:prose-invert"
                                    v-html="row.description"></div>
                            </div>
                        </template>

                        <template #actions-data="{ row }">
                            <div class="flex items-center gap-2">
                                <UButton variant="ghost" color="gray" icon="i-heroicons-pencil-square" size="sm"
                                    aria-label="Edit" @click="openEditor(row)" />
                                <UButton variant="ghost" color="red" icon="i-heroicons-trash" size="sm"
                                    aria-label="Delete" @click="confirmDelete(row)" />
                            </div>
                        </template>
                    </UTable>
                </div>

                <div v-if="!announcements.length" class="p-12 sm:p-20 text-center">
                    <UIcon name="i-heroicons-megaphone" class="w-12 h-12 text-gray-200 mb-4 mx-auto" />
                    <p class="text-gray-900">No announcements found. Add your first one above!</p>
                </div>
            </UCard>
        </div>

        <!-- Editor Modal -->
        <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-2xl', rounded: 'rounded-2xl sm:rounded-[2.5rem]' }">
            <div class="p-6 sm:p-8 lg:p-12 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 class="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white pr-2">
                        {{ editingItem ? 'Edit Announcement' : 'New Announcement' }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="rounded-full flex-shrink-0"
                        aria-label="Close" @click="isModalOpen = false" />
                </div>

                <UForm :state="formState" class="space-y-6" @submit="saveAnnouncement">
                    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
                        <UFormGroup label="Order Number" class="sm:col-span-1">
                            <UInput v-model="formState.order" type="number" placeholder="1" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Title (Internal/Summary)" class="sm:col-span-3">
                            <UInput v-model="formState.title" placeholder="e.g. Next Event Highlight" size="lg" />
                        </UFormGroup>
                    </div>

                    <UFormGroup label="Announcement Content">
                        <admin-rich-text-editor v-model="formState.description" />
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
        <UModal v-model="isDeleteModalOpen" :ui="{ width: 'sm:max-w-lg', rounded: 'rounded-2xl sm:rounded-3xl' }">
            <div class="flex flex-col max-h-[90vh] overflow-hidden">
                <div class="p-6 sm:p-8 text-center flex-shrink-0">
                    <div
                        class="w-16 h-16 bg-red-50 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                        <UIcon name="i-heroicons-exclamation-triangle" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Announcement?</h3>
                    <p class="text-gray-500 text-sm mb-4 italic line-clamp-2">"{{ itemToDelete?.title }}"</p>
                </div>
                <div class="flex gap-3 p-6 sm:p-8 pt-0 flex-shrink-0 border-t border-gray-200 dark:border-gray-700 min-w-0">
                    <UButton color="gray" variant="soft" label="Cancel" class="flex-1 min-w-0 rounded-xl"
                        @click="isDeleteModalOpen = false" />
                    <UButton color="red" label="Delete Forever" class="flex-1 min-w-0 rounded-xl" @click="doDelete" />
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
    order: 1
})

// Delete State
const isDeleteModalOpen = ref(false)
const itemToDelete = ref<any>(null)

function openEditor(item?: any) {
    if (item) {
        editingItem.value = item
        formState.title = item.title
        formState.description = item.description ?? ''
        formState.order = item.order || 1
    } else {
        editingItem.value = null
        formState.title = ''
        formState.description = ''
        formState.order = (sortedAnnouncements.value.length + 1)
    }
    isModalOpen.value = true
}

async function saveAnnouncement() {
    isSaving.value = true
    try {
        const payload = { ...formState, published: true }
        if (editingItem.value) {
            const id = editingItem.value.id ?? editingItem.value.key
            if (!id) throw new Error('Announcement id not found')
            const itemRef = dbRef(db, `/annoucements/${id}`)
            await set(itemRef, payload)
        } else {
            const listRef = dbRef(db, '/annoucements')
            await push(listRef, payload)
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
    const id = itemToDelete.value.id ?? itemToDelete.value.key
    if (!id) {
        console.error('Delete error: announcement id not found')
        return
    }
    try {
        const itemRef = dbRef(db, `/annoucements/${id}`)
        await remove(itemRef)
        isDeleteModalOpen.value = false
    } catch (err) {
        console.error('Delete error:', err)
    }
}

const route = useRoute()
const router = useRouter()

// When arriving from dashboard "Edit" link with ?edit=id, open the editor for that item
watch(
    () => [route.query.edit, sortedAnnouncements.value] as const,
    ([editId, list]: [string | undefined, any[]]) => {
        if (!editId || !list?.length) return
        const id = String(editId)
        const item = list.find((a: any) => (a.id ?? a.key) === id)
        if (item) {
            openEditor(item)
            router.replace({ path: route.path, query: {} })
        }
    },
    { immediate: true }
)

useHead({
    title: 'Manage Announcements | Woolwich Temple'
})
</script>
