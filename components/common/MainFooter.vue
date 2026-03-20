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
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            A spiritual home dedicated to the teachings of Lord Swaminarayan, serving the
            community through devotion, education, and service. Under
            <a
              href="https://www.swaminarayan.faith/"
              class="text-golden-500 hover:text-golden-600 transition-colors"
              >Shree Nar Narayan Dev Temple Bhuj</a
            >. <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
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
              <span>St Margaret's Grove, <br />Plumstead, London <br />SE18 7RL</span>
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
        class="mt-8 border-t border-gray-800 pt-8 text-sm text-gray-500 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8"
      >
        <p class="max-w-3xl text-balance text-center md:text-left">
          &copy; {{ new Date().getFullYear() }} Shree Kutch Satsang Swaminarayan Temple
          Woolwich. All rights reserved. Charity Registration No. 292934.
        </p>
        <nav aria-label="Legal and policies">
          <ul
            class="m-0 flex list-none flex-col items-center gap-y-2 p-0 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 md:justify-end"
          >
            <li class="shrink-0">
              <NuxtLink
                to="https://sksswoolwich.cdn.prismic.io/sksswoolwich/e1d9742d-a7ff-4fbc-bfdb-d2913465066c_Complaints+Policy+and+Procedures.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block text-center text-gray-400 underline-offset-2 hover:text-white hover:underline sm:text-left"
              >
                Complaints Policy
              </NuxtLink>
            </li>
            <li class="shrink-0">
              <NuxtLink
                to="https://sksswoolwich.cdn.prismic.io/sksswoolwich/9f87356c-dc03-4175-8355-840a3cb6b7fd_SKSSTW+Complaints+Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block text-center text-gray-400 underline-offset-2 hover:text-white hover:underline sm:text-left"
              >
                Complaints Form
              </NuxtLink>
            </li>
            <li class="max-w-xs shrink-0 sm:max-w-none">
              <NuxtLink
                to="https://sksswoolwich.cdn.prismic.io/sksswoolwich/4c041e32-62d7-440c-87eb-870b028bf3f9_Photography+and+Video+Policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block text-center text-gray-400 underline-offset-2 hover:text-white hover:underline sm:text-left"
              >
                Photography and Video Policy
              </NuxtLink>
            </li>
          </ul>
        </nav>
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
