<template>
  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
        <!-- Brand Section -->
        <div>
          <img
            src="/img/WoolwichMandirLogo.png"
            alt="Logo"
            class="h-16 w-auto mb-6 brightness-0 invert"
          />
          <h3 class="text-xl font-serif font-bold mb-4 text-white">
            Shree KS Swaminarayan Temple Woolwich
          </h3>
          <p class="text-gray-900 text-sm leading-relaxed mb-6">
            A spiritual home dedicated to the teachings of Lord Swaminarayan, serving the
            community through devotion, education, and service.
          </p>
          <div class="flex space-x-4">
            <UButton
              icon="i-simple-icons-facebook"
              color="gray"
              variant="ghost"
              class="hover:text-golden-900"
            />
            <UButton
              icon="i-simple-icons-instagram"
              color="gray"
              variant="ghost"
              class="hover:text-golden-900"
            />
            <UButton
              icon="i-simple-icons-youtube"
              color="gray"
              variant="ghost"
              class="hover:text-golden-900"
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4
            class="text-lg font-bold mb-6 border-b border-golden-500/30 pb-2 inline-block"
          >
            Quick Links
          </h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-gray-400 hover:text-golden-500 transition-colors flex items-center space-x-2"
              >
                <UIcon name="i-heroicons-chevron-right" class="w-3 h-3" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4
            class="text-lg font-bold mb-6 border-b border-golden-500/30 pb-2 inline-block"
          >
            Contact Us
          </h4>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3 text-gray-400">
              <UIcon
                name="i-heroicons-map-pin"
                class="w-5 h-5 text-golden-500 flex-shrink-0"
              />
              <span>St Margaret's Grove, <br />Plumstead, London <br />SE18 7RA</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-400">
              <UIcon
                name="i-heroicons-phone"
                class="w-5 h-5 text-golden-500 flex-shrink-0"
              />
              <span>+44 20 8854 0823</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-400">
              <UIcon
                name="i-heroicons-envelope"
                class="w-5 h-5 text-golden-500 flex-shrink-0"
              />
              <span>info@sksswoolwich.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
      >
        <p>&copy; {{ new Date().getFullYear() }} Woolwich Temple. All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy-policy" class="hover:text-white"
            >Privacy Policy</NuxtLink
          >
          <NuxtLink to="/terms" class="hover:text-white">Terms of Use</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerSearch = ref("");
const router = useRouter();

const handleSearch = () => {
  if (footerSearch.value.trim()) {
    router.push({
      path: "/search_results",
      query: { search: footerSearch.value },
    });
    footerSearch.value = "";
  }
};

const quickLinks = [
  { label: "About Us", to: "/our-temple/our-temple" },
  { label: "Activities", to: "/activities" },
  { label: "Wedding Hall", to: "/wedding-hall" },
  { label: "Donate Now", to: "/donate" },
  { label: "Careers", to: "/our-temple/careers" },
];
</script>
