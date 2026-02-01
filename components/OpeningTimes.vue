<template>
  <div class="h-full">
    <UCard
      class="glass-effect overflow-hidden border-golden-500/20 h-full flex flex-col"
      :ui="{
        header: { base: 'bg-golden-500/10 border-b border-golden-500/20' },
        body: { padding: 'p-0 flex flex-col flex-1' },
      }"
    >
      <template #header>
        <div class="flex items-center space-x-2">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-temple-red-500" />
          <h3 class="font-serif font-bold text-gray-400">Mandir Darshan Timings</h3>
        </div>
      </template>

      <div class="divide-y divide-gray-100">
        <!-- Weekdays Section -->
        <div class="p-6">
          <h4
            class="text-xs font-bold text-temple-gray-400 uppercase tracking-widest mb-4"
          >
            Weekdays (Mon-Fri)
          </h4>
          <div class="grid grid-cols-2 gap-x-8 gap-y-4">
            <div v-for="time in weekdayTimings" :key="time.label" class="flex flex-col">
              <span class="text-xs text-gray-400 font-medium tracking-wide">{{
                time.label
              }}</span>
              <span class="text-sm font-bold text-gray-400">{{ time.value }}</span>
            </div>
          </div>
        </div>

        <!-- Weekend Section -->
        <div class="p-6">
          <h4
            class="text-xs font-bold text-temple-gray-400 uppercase tracking-widest mb-4"
          >
            Weekend (Sat-Sun)
          </h4>
          <div class="grid grid-cols-2 gap-x-8 gap-y-4">
            <div v-for="time in weekendTimings" :key="time.label" class="flex flex-col">
              <span class="text-xs text-gray-400 font-medium tracking-wide">{{
                time.label
              }}</span>
              <span class="text-sm font-bold text-gray-400">{{ time.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-start space-x-2 text-xs text-gray-400 italic">
          <UIcon
            name="i-heroicons-information-circle"
            class="w-4 h-4 text-temple-red-500 flex-shrink-0"
          />
          <p>On festival/bank holidays times may vary.</p>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const weekdayTimings = [
  { label: "Morning Darshan", value: "7:00 AM - 10:30 AM" },
  { label: "Evening Darshan", value: "4:00 PM - 8:00 PM" },
  { label: "Morning Aarti", value: "9:30 AM" },
  { label: "Evening Aarti", value: "7:00 PM" },
  { label: "Morning Sabha", value: "9:00 AM - 10:30 AM" },
  { label: "Evening Sabha", value: "7:00 PM - 8:30 PM" },
];

const weekendTimings = [
  { label: "Morning Darshan", value: "7:00 AM - 11:00 AM" },
  { label: "Evening Darshan", value: "4:00 PM - 8:00 PM" },
  { label: "Morning Aarti", value: "9:00 AM" },
  { label: "Evening Aarti", value: "6:00 PM" },
  { label: "Morning Sabha", value: "9:00 AM - 10:30 AM" },
  { label: "Evening Sabha", value: "6:00 PM - 7:30 PM" },
];
</script>
