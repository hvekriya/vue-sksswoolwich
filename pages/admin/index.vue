<template>
    <AdminLayout>
        <div class="space-y-10">
            <!-- Announcement Management Grid -->
            <section>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">Active Announcements</h2>
                        <p class="text-gray-500 text-sm mt-1">Manage the messages scrolling across the TV and website</p>
                    </div>
                    <UButton to="/admin/announcements" color="golden" icon="i-heroicons-plus" label="New Announcement"
                        class="rounded-full px-6 flex-shrink-0 self-start sm:self-auto" />
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <UCard v-for="item in dashboardAnnouncements" :key="itemId(item)"
                        class="group hover:border-golden-500/40 transition-all shadow-sm hover:shadow-xl rounded-3xl overflow-hidden">
                        <div class="flex gap-6">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-golden-50 dark:bg-golden-950 font-serif font-bold text-golden-600 rounded-2xl flex items-center justify-center text-xl">
                                {{ item.order }}
                            </div>
                            <div class="flex-grow">
                                <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ item.title }}</h4>
                                <div class="text-sm text-gray-500 line-clamp-2 prose prose-sm dark:prose-invert"
                                    v-html="item.description"></div>
                            </div>
                        </div>
                        <template #footer>
                            <div class="flex justify-end gap-2">
                                <UButton variant="ghost" color="primary" icon="i-heroicons-pencil-square" size="xs"
                                    aria-label="Edit"
                                    :to="'/admin/announcements?edit=' + itemId(item)" />
                            </div>
                        </template>
                    </UCard>
                </div>
            </section>

            <!-- Quick Actions / Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <UCard
                    class="bg-gradient-to-br from-golden-500 to-golden-600 text-white rounded-[2rem] border-none shadow-xl shadow-golden-500/20">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-white/20 rounded-2xl">
                            <UIcon name="i-heroicons-share" class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-bold uppercase tracking-wider opacity-80">Social Links</p>
                            <h5 class="text-2xl font-serif font-bold">{{ linksCount }} Items</h5>
                        </div>
                    </div>
                    <UButton to="/admin/links" variant="ghost" color="white" icon="i-heroicons-arrow-right" block
                        class="mt-6 border border-white/20 rounded-xl hover:bg-white/10">
                        Update Follow Page
                    </UButton>
                </UCard>

                <UCard class="bg-gray-900 text-white rounded-[2rem] border-none shadow-xl">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-white/10 rounded-2xl text-golden-500">
                            <UIcon name="i-heroicons-tv" class="w-6 h-6" />
                        </div>
                        <div>
                            <p class="text-xs font-bold uppercase tracking-wider opacity-60">Digital Signage</p>
                            <h5 class="text-2xl font-serif font-bold">TV Mode</h5>
                        </div>
                    </div>
                    <UButton to="/display" target="_blank" variant="ghost" color="primary"
                        icon="i-heroicons-presentation-chart-bar" block
                        class="mt-6 bg-golden-500/10 hover:bg-golden-500/20 rounded-xl">
                        Launch Display
                    </UButton>
                </UCard>

                <UCard class="rounded-[2rem] shadow-lg border-gray-100 dark:border-gray-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Site Status</h4>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">Firebase Database</span>
                            <UBadge color="green" variant="soft" label="Connected" />
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">Prismic API</span>
                            <UBadge color="green" variant="soft" label="Healthy" />
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">TV Auto-Scroll</span>
                            <UBadge color="blue" variant="soft" label="Active" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref as dbRef } from 'firebase/database'

definePageMeta({
    middleware: 'auth'
})

const db = useDatabase()
const announcements = useDatabaseList(dbRef(db, '/annoucements'))
const links = useDatabaseList(dbRef(db, '/link-tree'))

const sortedAnnouncements = computed(() => {
    return [...announcements.value].sort((a: any, b: any) => (a.order || 99) - (b.order || 99))
})

const dashboardAnnouncements = computed(() => sortedAnnouncements.value.slice(0, 4))

function itemId(item: { id?: string; key?: string }) {
    return item?.id ?? item?.key ?? ''
}

const linksCount = computed(() => links.value.length)

useHead({
    title: 'Admin Hub | Woolwich Temple'
})
</script>
