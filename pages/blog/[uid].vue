<template>
    <div class="blog-detail pb-32">
        <template v-if="doc">
            <!-- Immersive Hero -->
            <section class="relative h-[70vh] flex flex-col justify-end pb-20 overflow-hidden">
                <div class="absolute inset-0 z-0">
                    <img v-if="doc.data.cover?.url" :src="doc.data.cover.url"
                        class="w-full h-full object-cover scale-105" />
                    <div v-else
                        src="https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format"
                        class="w-full h-full object-cover grayscale opacity-20 scale-105" />

                    <div
                        class="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-black via-gray-50/80 dark:via-black/80 to-transparent">
                    </div>
                </div>

                <UContainer class="relative z-10">
                    <div class="max-w-4xl">
                        <UBadge color="temple-red" variant="soft" :label="doc.tags[0] || 'Spiritual Post'"
                            class="mb-4 rounded-full px-4" />
                        <h1
                            class="text-5xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {{ doc.data.title[0]?.text }}
                        </h1>
                        <div class="flex items-center gap-6 text-gray-500 dark:text-gray-900 font-medium">
                            <div class="flex items-center gap-2">
                                <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-golden-500" />
                                <span>{{ formatDate(doc.first_publication_date) }}</span>
                            </div>
                            <div v-if="doc.data.posted_by" class="flex items-center gap-2">
                                <UIcon name="i-heroicons-user" class="w-5 h-5 text-golden-500" />
                                <span>{{ doc.data.posted_by }}</span>
                            </div>
                        </div>
                    </div>
                </UContainer>
            </section>

            <!-- Main Content -->
            <UContainer class="py-20 lg:py-32">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div class="lg:col-span-8">
                        <article class="prose prose-xl prose-golden dark:prose-invert max-w-none">
                            <prismic-rich-text :field="doc.data.content" />
                        </article>

                        <!-- CTA Section -->
                        <div v-if="doc.data.cta_link?.url"
                            class="mt-16 p-8 lg:p-12 rounded-[3rem] bg-golden-500 text-white relative overflow-hidden group">
                            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div class="text-left">
                                    <h3 class="text-3xl font-serif font-bold mb-2">Learn more about this</h3>
                                    <p class="text-white/80">Discover more spiritual resources or take action today.</p>
                                </div>
                                <UButton :to="doc.data.cta_link.url" color="white" variant="solid" size="xl"
                                    class="rounded-full px-10 font-bold text-golden-600 hover:bg-gray-100 transition-colors">
                                    {{ doc.data.cta_text[0]?.text || 'Click Here' }}
                                </UButton>
                            </div>
                            <UIcon name="i-heroicons-sparkles"
                                class="absolute -bottom-10 -right-10 w-40 h-40 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                        </div>
                    </div>

                    <!-- Sidebar Decoration -->
                    <div class="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
                        <div
                            class="p-8 bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
                            <h4
                                class="text-lg font-serif font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-golden-500 pl-4">
                                Discover More</h4>
                            <p class="text-sm text-gray-500 dark:text-gray-900 leading-relaxed mb-8">
                                Explore more wisdom and updates from our community. Join our spiritual journey online.
                            </p>
                            <UButton to="/blog" block variant="soft" color="golden" label="Back to Blog"
                                icon="i-heroicons-arrow-left" class="rounded-full" />
                        </div>

                        <!-- Social Share Hint -->
                        <div
                            class="p-8 bg-temple-red-500 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
                            <h4 class="relative z-10 text-lg font-serif font-bold mb-4">Share the Wisdom</h4>
                            <p class="relative z-10 text-sm text-white/80 mb-6">Found this post helpful? Share it with
                                your friends and family.</p>
                            <div class="relative z-10 flex gap-4">
                                <UButton icon="i-simple-icons-facebook" color="white" variant="ghost"
                                    class="rounded-full" />
                                <UButton icon="i-simple-icons-whatsapp" color="white" variant="ghost"
                                    class="rounded-full" />
                                <UButton icon="i-simple-icons-x" color="white" variant="ghost" class="rounded-full" />
                            </div>
                            <UIcon name="i-heroicons-share"
                                class="absolute -bottom-10 -right-10 w-40 h-40 text-white/10" />
                        </div>
                    </div>
                </div>
            </UContainer>
        </template>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { client } = usePrismic()

const { data: doc } = await useAsyncData(`blog-${route.params.uid}`, () =>
    client.getByUID('blog', route.params.uid as string)
)

if (!doc.value) {
    throw createError({ statusCode: 404, message: 'Blog post not found' })
}

const formatDate = (date: string) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

useHead({
    title: `${doc.value.data.title[0]?.text} | Woolwich Temple Blog`,
    meta: [
        { name: 'description', content: doc.value.data.content[0]?.text?.substring(0, 160) || '' }
    ]
})
</script>
