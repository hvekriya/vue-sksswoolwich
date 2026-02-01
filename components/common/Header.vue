<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="[
    isScrolled
      ? 'glass-effect py-2'
      : 'bg-transparent py-4'
  ]">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group" @click="scrollToTop">
        <img src="/img/WoolwichMandirLogo.png" alt="Woolwich Temple"
          class="h-12 w-auto transition-transform group-hover:scale-110" />
        <div class="hidden sm:block">
          <span class="block text-xs uppercase tracking-wider opacity-80"
            :class="isScrolled ? 'text-gray-600' : 'text-gray-200'">
            Shree KS Swaminarayan
          </span>
          <span class="block text-lg font-serif font-bold leading-tight"
            :class="isScrolled ? 'text-gray-900' : 'text-white'">
            Woolwich Temple
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center space-x-1">
        <template v-for="item in navLinks" :key="item.label">
          <!-- Dropdown for multi-level -->
          <UDropdown v-if="item.children" :items="[item.children]" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" variant="ghost" :label="item.label" :icon="item.icon"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              class="font-display font-medium px-4 py-2 hover:bg-white/10" :class="[
                isScrolled ? 'text-gray-900' : 'text-white',
                isActive(item.to) ? 'underline decoration-golden-500 decoration-2 underline-offset-8' : ''
              ]" />
          </UDropdown>

          <!-- Standard Link -->
          <UButton v-else :to="item.to" color="white" variant="ghost" :label="item.label" :icon="item.icon"
            class="font-display font-medium px-4 py-2 hover:bg-white/10" :class="[
              isScrolled ? 'text-gray-900' : 'text-white',
              isActive(item.to) ? 'underline decoration-golden-500 decoration-2 underline-offset-8' : ''
            ]" @click="scrollToTop" />
        </template>
      </nav>

      <!-- Mobile Menu Toggle -->
      <div class="lg:hidden flex items-center space-x-2">
        <UButton color="white" variant="ghost" icon="i-heroicons-bars-3-bottom-right-20-solid" class="p-2"
          :class="isScrolled ? 'text-gray-900' : 'text-white'" @click="isMobileMenuOpen = true" />
      </div>
    </div>

    <!-- Mobile Menu Slide-over -->
    <USlideover v-model="isMobileMenuOpen">
      <div class="p-6 h-full flex flex-col bg-white">
        <div class="flex items-center justify-between mb-8">
          <span class="text-2xl font-serif font-bold text-temple-red-500">Menu</span>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isMobileMenuOpen = false" />
        </div>

        <nav class="flex-1 space-y-2 overflow-y-auto">
          <template v-for="item in navLinks" :key="item.label">
            <template v-if="item.children">
              <div class="py-2">
                <div class="text-sm font-bold text-gray-900 uppercase tracking-widest px-4 mb-2">
                  {{ item.label }}
                </div>
                <NuxtLink v-for="child in item.children" :key="child.label" :to="child.to"
                  class="block px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium"
                  @click="closeMobileMenu">
                  {{ child.label }}
                </NuxtLink>
              </div>
            </template>
            <NuxtLink v-else :to="item.to"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 font-medium"
              :class="isActive(item.to) ? 'bg-golden-50 text-golden-700' : ''" @click="closeMobileMenu">
              <UIcon :name="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </nav>

        <div class="pt-6 border-t border-gray-100 italic text-center text-sm text-gray-900">
          Shree KS Swaminarayan Temple Woolwich
        </div>
      </div>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
const { scrollToTop } = useScrollToTop()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isActive = (path: string) => route.path === path

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  scrollToTop()
}

const navLinks = [
  { label: 'HOME', to: '/', icon: 'i-heroicons-home' },
  {
    label: 'OUR TEMPLE',
    icon: 'i-heroicons-information-circle',
    children: [
      { label: 'ABOUT', to: '/our-temple/our-temple' },
      { label: 'UTSAVS CALENDAR', to: '/our-temple/calendar' },
      { label: 'YUVAK MANDAL', to: '/our-temple/yuvak-mandal' },
      { label: 'SWAMINARAYAN EDUCATION', to: '/our-temple/swaminarayan-education' },
      { label: 'WEDDING HALL', to: '/wedding-hall' },
      { label: 'CAREERS', to: '/our-temple/careers' }
    ]
  },
  { label: 'ACTIVITIES', to: '/activities', icon: 'i-heroicons-list-bullet' },
  { label: 'EVENTS', to: '/events', icon: 'i-heroicons-calendar' },
  { label: 'DONATE', to: '/donate', icon: 'i-heroicons-heart' },
  { label: 'CONTACT US', to: '/contact-us', icon: 'i-heroicons-phone' }
]
</script>
