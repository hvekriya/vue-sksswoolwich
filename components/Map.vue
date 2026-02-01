<template>
  <div
    class="map-container relative h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d2483.504!2d0.073!3d51.483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a8dcb1090817%3A0x7f680ca13d5a3426!2sShree%20KS%20Swaminarayan%20Temple%20Woolwich!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
      width="100%" height="100%" style="border:0;" :allowfullscreen="true" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="grayscale hover:grayscale-0 transition-all duration-700"></iframe>

    <!-- Floating Info Card -->
    <div
      class="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-80 glass-effect p-6 rounded-3xl border-white/20 shadow-2xl pointer-events-none">
      <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-widest">Woolwich Temple</h4>
      <p class="text-xs text-gray-600 dark:text-gray-900 leading-relaxed mb-4">
        St. Margarets Grove, Plumstead, <br />
        London SE18 7RA, UK
      </p>
      <UButton to="https://www.google.com/maps/dir//Shree+Swaminarayan+Temple+-+Woolwich" target="_blank" size="xs"
        color="golden" variant="soft" label="Get Directions" icon="i-heroicons-map"
        class="rounded-full pointer-events-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Using a clean iframe for maximum reliability and ease of maintenance
</script>