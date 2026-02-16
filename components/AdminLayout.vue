<template>
    <div class="admin-layout min-h-screen bg-gray-50 dark:bg-gray-950 flex">
        <!-- Mobile overlay when sidebar open -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 bg-black/50 z-40 lg:hidden"
            aria-hidden="true"
            @click="sidebarOpen = false"
        />

        <!-- Sidebar Navigation -->
        <aside
            :class="[
                'w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed lg:sticky top-0 h-screen z-50 transition-transform duration-200 ease-out',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            ]">
            <div class="p-4 sm:p-6 lg:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between lg:block">
                <div class="flex items-center gap-4">
                    <img src="/img/icons/icon.png" class="w-10 h-10 rounded-xl shadow-lg flex-shrink-0" alt="" />
                    <div class="min-w-0">
                        <h2 class="font-serif font-bold text-gray-900 dark:text-white leading-tight truncate">Woolwich</h2>
                        <p class="text-[10px] uppercase tracking-widest text-golden-600 font-bold">Admin Portal</p>
                    </div>
                </div>
                <UButton
                    icon="i-heroicons-x-mark"
                    variant="ghost"
                    color="gray"
                    class="lg:hidden rounded-full"
                    aria-label="Close menu"
                    @click="sidebarOpen = false"
                />
            </div>

            <nav class="flex-grow p-4 sm:p-6 space-y-1 overflow-y-auto">
                <UButton
                    v-for="item in menuItems"
                    :key="item.to"
                    :to="item.to"
                    variant="ghost"
                    :color="route.path === item.to ? 'primary' : 'gray'"
                    :icon="item.icon"
                    block
                    class="justify-start rounded-xl py-3"
                    :class="{ 'bg-golden-50 dark:bg-golden-950/20 text-golden-600': route.path === item.to }"
                    @click="sidebarOpen = false"
                >
                    {{ item.label }}
                </UButton>
            </nav>

            <div class="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800">
                <div v-if="user" class="flex items-center gap-4 mb-4 lg:mb-6 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                    <UAvatar :src="user.photoURL || ''" :alt="user.email || 'Admin'" size="sm" class="flex-shrink-0" />
                    <div class="overflow-hidden min-w-0">
                        <p class="text-xs font-bold text-gray-900 dark:text-white truncate">{{ user.email }}</p>
                        <p class="text-[10px] text-gray-500">Authorized Personnel</p>
                    </div>
                </div>
                <UButton variant="ghost" color="red" icon="i-heroicons-arrow-left-on-rectangle" block label="Sign Out"
                    class="rounded-xl" @click="logout" />
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-grow min-w-0 w-full">
            <!-- Top Bar -->
            <header
                class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <UButton
                        icon="i-heroicons-bars-3"
                        variant="ghost"
                        color="gray"
                        class="lg:hidden rounded-full flex-shrink-0"
                        aria-label="Open menu"
                        @click="sidebarOpen = true"
                    />
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3 truncate">
                        <UIcon :name="currentPageIcon" class="text-golden-500 flex-shrink-0" />
                        <span class="truncate">{{ currentPageTitle }}</span>
                    </h3>
                </div>

                <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <UButton
                        to="/"
                        variant="soft"
                        color="gray"
                        size="sm"
                        label="View Live Site"
                        icon="i-heroicons-arrow-top-right-on-square"
                        class="rounded-full max-sm:px-3"
                    />
                    <UPopover>
                        <UButton icon="i-heroicons-bell" variant="ghost" color="gray" class="rounded-full" />
                        <template #content>
                            <div class="p-4 w-64 text-sm text-gray-500">No new alerts.</div>
                        </template>
                    </UPopover>
                </div>
            </header>

            <!-- Page Content -->
            <div class="p-4 sm:p-6 lg:p-10">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { getAuth, signOut, type User } from 'firebase/auth'

const route = useRoute()
const router = useRouter()
const user = ref<User | null>(null)
const auth = import.meta.client ? getAuth(useNuxtApp().$firebaseApp as import('firebase/app').FirebaseApp) : null

if (import.meta.client && auth) {
  user.value = auth.currentUser
  auth.onAuthStateChanged((u: User | null) => {
    user.value = u
  })
}

const sidebarOpen = ref(false)

const menuItems = [
    { label: 'Dashboard', to: '/admin', icon: 'i-heroicons-squares-2x2' },
    { label: 'CMS Content', to: '/admin/cms', icon: 'i-heroicons-document-text' },
    { label: 'Announcements', to: '/admin/announcements', icon: 'i-heroicons-megaphone' },
    { label: 'TV Display', to: '/admin/display', icon: 'i-heroicons-tv' },
    { label: 'Follow Links', to: '/admin/links', icon: 'i-heroicons-share' },
    { label: 'Site Build', to: '/admin/sitebuild', icon: 'i-heroicons-cpu-chip' }
]

const currentPageTitle = computed(() => {
    const item = menuItems.find(i => i.to === route.path)
    if (item) return item.label
    if (route.path.startsWith('/admin/cms')) return 'CMS'
    return 'Administration'
})

const currentPageIcon = computed(() => {
    const item = menuItems.find(i => i.to === route.path)
    return item?.icon || 'i-heroicons-cog-6-tooth'
})

async function logout() {
    if (auth) {
        await signOut(auth)
        router.replace('/admin/auth')
    }
}
</script>
