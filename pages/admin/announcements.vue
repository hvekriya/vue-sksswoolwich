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

            <!-- Announcements List (Card Grid) -->
            <div v-if="sortedAnnouncements.length" class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <UCard v-for="item in sortedAnnouncements" :key="itemId(item)"
                    class="group hover:border-golden-500/40 transition-all shadow-sm hover:shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden">
                    <div class="flex gap-4 sm:gap-6">
                        <div
                            class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-golden-50 dark:bg-golden-950 font-serif font-bold text-golden-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl">
                            {{ item.order }}
                        </div>
                        <div class="flex-grow min-w-0">
                            <h4 class="font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">{{ item.title }}</h4>
                            <div class="text-sm text-gray-500 line-clamp-2 prose prose-sm dark:prose-invert"
                                v-html="item.description"></div>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex justify-end gap-2">
                            <UButton variant="ghost" color="primary" icon="i-heroicons-pencil-square" size="xs"
                                label="Edit" class="rounded-full"
                                @click="openEditor(item)" />
                            <UButton variant="ghost" color="red" icon="i-heroicons-trash" size="xs"
                                label="Delete" class="rounded-full"
                                @click="confirmDelete(item)" />
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Empty State -->
            <UCard v-else class="rounded-2xl sm:rounded-3xl shadow-xl">
                <div class="p-8 sm:p-12 text-center">
                    <UIcon name="i-heroicons-megaphone" class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
                    <p class="text-gray-500">No announcements found. Add your first one above!</p>
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

const sortedAnnouncements = computed(() => {
    return [...announcements.value].sort((a: any, b: any) => (a.order || 99) - (b.order || 99))
})

function itemId(item: { id?: string; key?: string }) {
    return item?.id ?? item?.key ?? ''
}

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
