<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 glass-effect border-b border-white/20 dark:border-white/10 shadow-sm"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-3 group" @click="scrollToTop">
        <img
          src="/img/WoolwichMandirLogo.png"
          alt="Woolwich Temple"
          class="h-12 w-auto transition-transform group-hover:scale-110"
        />
        <div class="hidden sm:block">
          <span
            class="block text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400"
          >
            Shree KS Swaminarayan
          </span>
          <span
            class="block text-lg font-serif font-bold leading-tight text-gray-900 dark:text-white"
          >
            Temple Woolwich
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop: Color mode toggle + Nav -->
      <div class="hidden lg:flex items-center gap-2">
        <UButton
          color="gray"
          variant="ghost"
          :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          :aria-label="
            colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          "
          class="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          @click="toggleColorMode"
        />
        <nav class="flex items-center space-x-1">
          <template v-for="item in navLinks" :key="item.label">
            <!-- Dropdown for multi-level -->
            <UDropdown
              v-if="item.children"
              :items="[item.children]"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                color="gray"
                variant="ghost"
                :label="item.label"
                :icon="item.icon"
                trailing-icon="i-heroicons-chevron-down-20-solid"
                class="font-display font-medium px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                :class="[
                  isDropdownActive(item)
                    ? 'underline decoration-golden-500 decoration-2 underline-offset-8'
                    : '',
                ]"
              />
            </UDropdown>

            <!-- Standard Link -->
            <UButton
              v-else
              :to="item.to"
              color="gray"
              variant="ghost"
              :label="item.label"
              :icon="item.icon"
              class="font-display font-medium px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="[
                isActive(item.to)
                  ? 'underline decoration-golden-500 decoration-2 underline-offset-8'
                  : '',
              ]"
              @click="scrollToTop"
            />
          </template>
        </nav>
      </div>

      <!-- Mobile: Color mode toggle + Menu button -->
      <div class="lg:hidden flex items-center space-x-2">
        <UButton
          color="gray"
          variant="ghost"
          :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          :aria-label="
            colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          "
          class="p-2 text-gray-700 dark:text-gray-200"
          @click="toggleColorMode"
        />
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-bars-3-bottom-right-20-solid"
          class="p-2 text-gray-700 dark:text-gray-200"
          @click="isMobileMenuOpen = true"
        />
      </div>
    </div>

    <!-- Mobile Menu Slide-over -->
    <USlideover
      v-model="isMobileMenuOpen"
      class="mobile-nav-slideover"
      :ui="{
        background: '!bg-transparent',
        base: '!bg-transparent',
        overlay: { background: 'bg-black/30' },
      }"
    >
      <div
        class="p-6 h-full flex flex-col min-h-full w-full bg-white/40 dark:bg-black/40 backdrop-blur-lg border-l border-white/20 dark:border-white/10"
      >
        <div class="flex items-center justify-between mb-8">
          <span
            class="text-2xl font-serif font-bold text-temple-red-500 dark:text-gray-400"
            >Menu</span
          >
          <div class="flex items-center gap-2">
            <UButton
              color="gray"
              variant="ghost"
              :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              :aria-label="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
              class="-my-1"
              @click="toggleColorMode"
            />
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isMobileMenuOpen = false"
            />
          </div>
        </div>

        <nav class="flex-1 space-y-2 overflow-y-auto">
          <template v-for="item in navLinks" :key="item.label">
            <!-- Expandable dropdown for items with children -->
            <div v-if="item.children" class="py-1">
              <button
                type="button"
                class="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 text-gray-900 dark:text-gray-100 font-medium transition-colors"
                @click="toggleMobileSubmenu(item.label)"
              >
                <span class="flex items-center space-x-3">
                  <UIcon :name="item.icon" class="w-5 h-5" />
                  <span>{{ item.label }}</span>
                </span>
                <UIcon
                  :name="
                    'i-heroicons-chevron-' +
                    (expandedMenu === item.label ? 'up' : 'down') +
                    '-20-solid'
                  "
                  class="w-5 h-5 flex-shrink-0 transition-transform"
                />
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-show="expandedMenu === item.label" class="overflow-hidden">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.label"
                    :to="child.to"
                    class="block pl-12 pr-4 py-2.5 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium text-sm"
                    @click="closeMobileMenu"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </Transition>
            </div>
            <!-- Standard link -->
            <NuxtLink
              v-else
              :to="item.to"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/30 dark:hover:bg-white/10 text-gray-900 dark:text-gray-100 font-medium"
              :class="
                isActive(item.to)
                  ? 'bg-golden-50/80 dark:bg-golden-900/30 text-golden-700 dark:text-golden-400'
                  : ''
              "
              @click="closeMobileMenu"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </nav>

        <div
          class="pt-6 border-t border-white/20 dark:border-white/10 italic text-center text-sm text-gray-700 dark:text-gray-300"
        >
          Shree KS Swaminarayan Temple Woolwich
        </div>
      </div>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
const { scrollToTop } = useScrollToTop();
const route = useRoute();
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const isMobileMenuOpen = ref(false);
const expandedMenu = ref<string | null>(null);
const isActive = (path: string) => route.path === path;
const isDropdownActive = (item: { to?: string; children?: unknown[] }) =>
  item.to ? isActive(item.to) : false;

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  expandedMenu.value = null;
  scrollToTop();
};

const toggleMobileSubmenu = (label: string) => {
  expandedMenu.value = expandedMenu.value === label ? null : label;
};

watch(isMobileMenuOpen, (open: boolean) => {
  if (!open) expandedMenu.value = null;
});

const navLinks = [
  { label: "HOME", to: "/", icon: "i-heroicons-home" },
  {
    label: "BHAKTIRAS",
    to: "https://www.bhaktiras.sksswoolwich.org",
    icon: "i-heroicons-information-circle",
  },
  {
    label: "OUR TEMPLE",
    icon: "i-heroicons-information-circle",
    children: [
      { label: "ABOUT", to: "/our-temple/our-temple" },
      { label: "YUVAK MANDAL", to: "/our-temple/yuvak-mandal" },
      { label: "SWAMINARAYAN EDUCATION", to: "/our-temple/swaminarayan-education" },
      { label: "WEDDING HALL", to: "/wedding-hall" },
      { label: "CAREERS", to: "/our-temple/careers" },
    ],
  },
  { label: "ACTIVITIES", to: "/activities", icon: "i-heroicons-list-bullet" },
  { label: "EVENTS", to: "/events", icon: "i-heroicons-calendar" },
  { label: "DONATE", to: "/donate", icon: "i-heroicons-heart" },
  { label: "CONTACT US", to: "/contact-us", icon: "i-heroicons-phone" },
];
</script>
