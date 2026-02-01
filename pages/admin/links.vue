<template>
    <AdminLayout>
        <div class="space-y-8">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">Social Follow Links</h1>
                    <p class="text-gray-500 mt-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-share" class="text-golden-500" />
                        Manage the "LinkTree" style page used for social media bios and quick access.
                    </p>
                </div>
                <UButton color="golden" icon="i-heroicons-plus" size="xl" label="Add New Link"
                    class="rounded-full px-8 shadow-lg shadow-golden-500/20" @click="openEditor()" />
            </div>

            <!-- Links Table -->
            <UCard class="rounded-3xl shadow-xl overflow-hidden" :ui="{ body: { padding: 'p-0' } }">
                <UTable :rows="sortedLinks" :columns="columns" class="w-full"
                    :ui="{ th: { base: 'text-[10px] uppercase tracking-widest text-gray-900 font-bold bg-gray-50 dark:bg-gray-800/50' }, td: { base: 'py-6' } }">
                    <template #order-data="{ row }">
                        <span class="font-mono font-bold text-golden-600">{{ row.order }}</span>
                    </template>

                    <template #icon-data="{ row }">
                        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl inline-block">
                            <UIcon :name="getIconName(row.icon)" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </div>
                    </template>

                    <template #title-data="{ row }">
                        <div>
                            <p class="font-bold text-gray-900 dark:text-white">{{ row.title }}</p>
                            <a v-if="row.link" :href="row.link" target="_blank"
                                class="text-xs text-golden-600 hover:underline truncate max-w-xs block">
                                {{ row.link }}
                            </a>
                            <span v-else class="text-[10px] uppercase tracking-widest text-gray-900">Information
                                Card</span>
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

                <div v-if="!links.length" class="p-20 text-center">
                    <UIcon name="i-heroicons-link" class="w-12 h-12 text-gray-200 mb-4 mx-auto" />
                    <p class="text-gray-900">No links configured yet.</p>
                </div>
            </UCard>
        </div>

        <!-- Editor Modal -->
        <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-2xl', rounded: 'rounded-[2.5rem]' }">
            <div class="p-8 lg:p-12">
                <h3 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-8">
                    {{ editingItem ? 'Edit Link' : 'New Link' }}
                </h3>

                <UForm :state="formState" class="space-y-6" @submit="saveLink">
                    <div class="grid grid-cols-4 gap-6">
                        <UFormGroup label="Order" class="col-span-1">
                            <UInput v-model="formState.order" type="number" size="xl" />
                        </UFormGroup>
                        <UFormGroup label="Title" class="col-span-3">
                            <UInput v-model="formState.title" placeholder="e.g. Daily Live Darshan" size="xl" />
                        </UFormGroup>
                    </div>

                    <UFormGroup label="Destination URL (Leave blank for an info card)">
                        <UInput v-model="formState.link" placeholder="https://..." size="xl" icon="i-heroicons-link" />
                    </UFormGroup>

                    <UFormGroup label="Icon Class (FontAwesome style)">
                        <UInput v-model="formState.icon" placeholder="fab fa-youtube" size="xl" />
                        <p class="text-[10px] text-gray-900 mt-1">Common: fab fa-youtube, fab fa-instagram, fas
                            fa-envelope</p>
                    </UFormGroup>

                    <UFormGroup label="Brief Description">
                        <UTextarea v-model="formState.description" placeholder="Short tagline or info text..." rows="3"
                            size="xl" />
                    </UFormGroup>

                    <div class="pt-6">
                        <UButton type="submit" color="golden" size="xl" block
                            :label="editingItem ? 'Update Link' : 'Add Link'" :loading="isSaving"
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
                    <UIcon name="i-heroicons-trash" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Remove this link?</h3>
                <p class="text-gray-500 text-sm mb-8 italic">"{{ itemToDelete?.title }}"</p>

                <div class="flex gap-4">
                    <UButton color="gray" variant="soft" label="Cancel" block class="rounded-xl"
                        @click="isDeleteModalOpen = false" />
                    <UButton color="red" label="Delete" block class="rounded-xl" @click="doDelete" />
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
const links = useDatabaseList(dbRef(db, '/link-tree'))

const columns = [
    { key: 'order', label: '#' },
    { key: 'icon', label: 'Icon' },
    { key: 'title', label: 'Target' },
    { key: 'actions', label: '' }
]

const sortedLinks = computed(() => {
    return [...links.value].sort((a: any, b: any) => (a.order || 99) - (b.order || 99))
})

// Modal State
const isModalOpen = ref(false)
const isSaving = ref(false)
const editingItem = ref<any>(null)
const formState = reactive({
    title: '',
    link: '',
    icon: '',
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
        formState.link = item.link || ''
        formState.icon = item.icon || ''
        formState.description = item.description || ''
        formState.order = item.order || 1
    } else {
        editingItem.value = null
        formState.title = ''
        formState.link = ''
        formState.icon = 'fas fa-link'
        formState.description = ''
        formState.order = (links.value.length + 1)
    }
    isModalOpen.value = true
}

async function saveLink() {
    isSaving.value = true
    try {
        if (editingItem.value) {
            const itemRef = dbRef(db, `/link-tree/${editingItem.value.key}`)
            await set(itemRef, { ...formState })
        } else {
            const listRef = dbRef(db, '/link-tree')
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
        const itemRef = dbRef(db, `/link-tree/${itemToDelete.value.key}`)
        await remove(itemRef)
        isDeleteModalOpen.value = false
    } catch (err) {
        console.error('Delete error:', err)
    }
}

const getIconName = (iconClass: string) => {
    if (!iconClass) return 'i-heroicons-link'
    if (iconClass.includes('youtube')) return 'i-simple-icons-youtube'
    if (iconClass.includes('facebook')) return 'i-simple-icons-facebook'
    if (iconClass.includes('instagram')) return 'i-simple-icons-instagram'
    if (iconClass.includes('twitter')) return 'i-simple-icons-x'
    if (iconClass.includes('flickr')) return 'i-simple-icons-flickr'
    if (iconClass.includes('envelope')) return 'i-heroicons-envelope'
    if (iconClass.includes('phone')) return 'i-heroicons-phone'
    return 'i-heroicons-link'
}

useHead({
    title: 'Manage Follow Links | Woolwich Temple'
})
</script>
