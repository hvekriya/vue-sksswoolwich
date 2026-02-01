<template>
    <div class="tv-display-portal fixed inset-0 bg-gray-950 overflow-hidden select-none cursor-none">
        <div class="grid grid-cols-12 h-screen">

            <!-- Left Column: High-Impact Visuals -->
            <div class="col-span-8 relative bg-black overflow-hidden border-r border-white/5 shadow-2xl z-10">
                <Swiper :modules="[SwiperAutoplay, SwiperEffectFade]" :slides-per-view="1" :loop="true" :effect="'fade'"
                    :autoplay="{ delay: 10000, disableOnInteraction: false }" class="h-full w-full">
                    <!-- Combined Carousel of Slideshow + Pinned Posters -->
                    <SwiperSlide v-for="(url, idx) in allPosters" :key="idx">
                        <img :src="url" class="w-full h-full object-contain" />
                    </SwiperSlide>

                    <!-- Fallback when no posters -->
                    <SwiperSlide v-if="!allPosters.length">
                        <div class="flex items-center justify-center h-full bg-gray-900">
                            <img src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
                                class="w-64 opacity-20" />
                        </div>
                    </SwiperSlide>
                </Swiper>

                <!-- Branding Overlay -->
                <div
                    class="absolute bottom-12 left-12 z-20 flex items-center gap-6 bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <img src="/img/icons/icon.png" class="w-16 h-16 rounded-2xl shadow-lg" />
                    <div>
                        <h2 class="text-3xl font-serif font-bold text-white tracking-tight">Woolwich Mandir</h2>
                        <p class="text-golden-500 font-bold tracking-[0.3em] uppercase text-xs">Digital Signage Portal
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Column: Scrolling Announcements -->
            <div class="col-span-4 bg-gray-900 flex flex-col relative">
                <header class="p-12 pb-6 flex items-center justify-between">
                    <h3 class="text-2xl font-serif font-bold text-golden-900">Announcements</h3>
                    <div class="flex items-center gap-3">
                        <span class="text-white/40 font-mono text-sm tracking-widest">{{ currentTime }}</span>
                    </div>
                </header>

                <!-- Auto-scrolling container -->
                <div class="flex-grow overflow-hidden relative px-12" ref="scrollContainer">
                    <div class="announcements-scroller space-y-8 py-8"
                        :style="{ transform: `translateY(${scrollPosition}px)` }">
                        <!-- Duplicate for infinite loop -->
                        <UCard v-for="item in (displayAnnouncements as any[])" :key="item.key"
                            class="glass-effect-dark border-white/5 rounded-[2rem] p-4 group">
                            <div class="flex gap-6">
                                <div
                                    class="w-14 h-14 bg-golden-500/10 text-golden-500 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold shrink-0">
                                    {{ item.order }}
                                </div>
                                <div>
                                    <h4 class="text-2xl font-bold text-white mb-3">{{ item.title }}</h4>
                                    <div class="text-lg text-gray-900 leading-relaxed font-light prose prose-invert max-w-none"
                                        v-html="item.description"></div>
                                </div>
                            </div>
                        </UCard>
                    </div>
                </div>

                <!-- Footer -->
                <footer
                    class="p-12 bg-black/20 border-t border-white/5 flex justify-between items-center text-[10px] tracking-widest text-gray-600 uppercase font-bold">
                    <span>&copy; {{ new Date().getFullYear() }} Shree Swaminarayan Mandir Woolwich</span>
                    <span class="text-golden-500/50">www.sksswoolwich.org</span>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref as dbRef } from 'firebase/database'
import { ref as storageRef, listAll, getDownloadURL } from 'firebase/storage'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'

definePageMeta({
    layout: false
})

const db = useDatabase()
const storage = useFirebaseStorage()
const announcements = useDatabaseList(dbRef(db, '/announcements')) // Corrected typo from 'annoucements'

const slideshow = ref<string[]>([])
const pinnedPosters = ref<string[]>([])
const uploadingType = ref<'slideshow' | 'pinned-posters' | null>(null)

const slideshowInput = ref<HTMLInputElement | null>(null)
const pinnedInput = ref<HTMLInputElement | null>(null)
const scrollPosition = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)
const currentTime = ref('')

const allPosters = computed(() => [...pinnedPosters.value, ...slideshow.value])
const displayAnnouncements = computed(() => {
    const active = announcements.value.filter((a: any) => a.published !== false)
    return [...active, ...active] // Duplicate for seamless scrolling
})

async function fetchPosters() {
    if (!storage) return
    const slideRef = storageRef(storage, 'slideshow/')
    const slideRes = await listAll(slideRef)
    slideshow.value = await Promise.all(slideRes.items.map(item => getDownloadURL(item)))

    const pinnedRef = storageRef(storage, 'pinned-posters/')
    const pinnedRes = await listAll(pinnedRef)
    pinnedPosters.value = await Promise.all(pinnedRes.items.map(item => getDownloadURL(item)))
}

function updateTime() {
    currentTime.value = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(new Date())
}

// Auto-scrolling logic
let scrollInterval: any = null
function startAutoScroll() {
    scrollInterval = setInterval(() => {
        if (!scrollContainer.value) return
        const scrollerHeight = scrollContainer.value.scrollHeight / 2
        scrollPosition.value -= 1 // Speed: 1px per step

        if (Math.abs(scrollPosition.value) >= scrollerHeight) {
            scrollPosition.value = 0
        }
    }, 30) // Smoothness
}

onMounted(() => {
    fetchPosters()
    updateTime()
    setInterval(updateTime, 60000)
    startAutoScroll()
})

onUnmounted(() => {
    if (scrollInterval) clearInterval(scrollInterval)
})

useHead({
    title: 'Digital Signage | Woolwich Temple',
    bodyAttrs: {
        class: 'bg-black'
    }
})
</script>

<style scoped>
.announcements-scroller {
    transition: transform 0.05s linear;
}

.glass-effect-dark {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
}
</style>
