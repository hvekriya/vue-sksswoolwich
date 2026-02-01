<template>
    <AdminLayout>
        <div class="max-w-4xl space-y-12">
            <!-- Header -->
            <div>
                <h1 class="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Site Infrastructure</h1>
                <p class="text-gray-500 text-lg">
                    Trigger a fresh deployment of the website to synchronize content from external sources like Prismic,
                    Flickr, and YouTube.
                </p>
            </div>

            <!-- Main Action Card -->
            <UCard
                class="glass-effect rounded-[3rem] border-golden-500/10 shadow-2xl p-8 lg:p-12 relative overflow-hidden group">
                <!-- Abstract Glow -->
                <div
                    class="absolute -top-12 -right-12 w-48 h-48 bg-golden-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000">
                </div>

                <div class="relative z-10 space-y-8">
                    <div class="flex items-start gap-6">
                        <div class="p-4 bg-golden-50 dark:bg-golden-950 rounded-2xl text-golden-600">
                            <UIcon name="i-heroicons-cloud-arrow-up" class="w-10 h-10" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Production Rebuild</h3>
                            <p class="text-sm text-gray-500 leading-relaxed mb-6">
                                Use this feature if you have made changes to external data (like Flickr albums or
                                Prismic pages) and they aren't appearing on the live site yet.
                                <span class="text-temple-red-500 font-bold">Note:</span> This process takes approximately
                                3-5 minutes.
                            </p>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <UButton v-if="!isBuilding" color="golden" size="xl" block label="Trigger Global Build"
                            icon="i-heroicons-paper-airplane"
                            class="rounded-full py-5 font-bold text-lg shadow-xl shadow-golden-500/20"
                            @click="rebuildSite" />

                        <div v-else
                            class="text-center p-8 bg-golden-50 dark:bg-golden-950 rounded-3xl border border-golden-200 dark:border-golden-900 animate-pulse">
                            <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-golden-600 animate-spin mb-4" />
                            <h4 class="text-xl font-bold text-golden-800 dark:text-golden-900 mb-2">Build Triggered
                                Successfully</h4>
                            <p class="text-sm text-golden-600 opacity-80">
                                The production server is now compiling the latest version. Please check back in 5
                                minutes.
                            </p>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Precautions -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <UIcon name="i-heroicons-clock" class="text-blue-500" />
                        Wait for Sync
                    </h4>
                    <p class="text-xs text-gray-500 leading-relaxed">Avoid triggering multiple builds consecutively.
                        High-frequency builds may be queued or temporarily suspended.</p>
                </div>
                <div class="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <UIcon name="i-heroicons-arrow-path-rounded-square" class="text-green-500" />
                        Force Refresh
                    </h4>
                    <p class="text-xs text-gray-500 leading-relaxed">After the build is complete, use <kbd
                            class="px-1 py-0.5 bg-gray-100 rounded text-[10px]">Cmd+Shift+R</kbd> to ensure you aren't
                        seeing a cached version.</p>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const config = useRuntimeConfig()
const isBuilding = ref(false)

async function rebuildSite() {
    const buildId = config.public.buildID || 'default-build-id'
    const url = `https://api.netlify.com/build_hooks/${buildId}?trigger_title=Deploy+triggered+by+sksswoolwich+admin`

    try {
        const response = await $fetch(url, { method: 'POST' })
        isBuilding.value = true
        // Auto-reset after some time to allow re-triggering if needed later
        setTimeout(() => { isBuilding.value = false }, 1000 * 60 * 5)
    } catch (err) {
        console.error('Build trigger failed:', err)
    }
}

useHead({
    title: 'Site Build | Woolwich Temple Admin'
})
</script>
