<template>
  <div class="events-page-wrapper">
    <!-- Header Section -->
    <section class="relative bg-gray-900 overflow-hidden py-20 lg:py-32">
      <!-- Background Ornament -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div
          class="absolute -top-24 -left-24 w-96 h-96 bg-golden-500 rounded-full blur-[120px]"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-96 h-96 bg-temple-red-500 rounded-full blur-[120px]"
        ></div>
      </div>

      <UContainer>
        <div class="text-center relative z-10">
          <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
            Mandir <span class="text-golden-500">Events</span>
          </h1>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Join us in celebrating our rich spiritual heritage and community spirit
            through our various festivals and events.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Navigation Sub-Menu -->
    <div
      class="sticky top-16 lg:top-20 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800"
    >
      <UContainer>
        <div class="flex items-center justify-center space-x-1 py-4">
          <UButton
            to="/events"
            variant="ghost"
            color="golden"
            label="Upcoming Events"
            class="px-6 rounded-full font-bold"
            :class="isActive('/events') ? 'bg-golden-50 text-golden-700' : ''"
          />
          <UButton
            to="/events/past"
            variant="ghost"
            color="gray"
            label="Past Events"
            class="px-6 rounded-full font-bold"
            :class="isActive('/events/past') ? 'bg-golden-50 text-golden-700' : ''"
          />
        </div>
      </UContainer>
    </div>

    <UContainer class="py-16">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div>
          <h2 class="text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Upcoming Events
          </h2>
          <div class="w-16 h-1 bg-golden-500 rounded-full mt-2"></div>
        </div>
        <p class="text-white-500 max-w-md">
          Explore our upcoming festivals, satsangs, and community activities scheduled for
          the coming weeks.
        </p>
      </div>

      <UpcomingEvents :upcoming-events="upcomingEvents" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();
const { isSameOrAfter } = useFilters();
const route = useRoute();

const isActive = (path: string) => route.path === path;

const { data: upcomingEvents } = await useAsyncData("upcoming-events-list", async () => {
  const eventsFromCms = await cms.getAllEvents();
  const today = new Date().toISOString().split("T")[0];
  const upcoming = eventsFromCms.filter((event: any) =>
    isSameOrAfter(event.data.event_date, today)
  );
  // Show soonest first for upcoming events
  upcoming.sort(
    (a: any, b: any) =>
      new Date(a.data.event_date).getTime() - new Date(b.data.event_date).getTime()
  );
  return upcoming;
});

useHead({
  title: "Upcoming Events | Woolwich Temple",
  meta: [
    {
      name: "description",
      content:
        "Discover upcoming festivals, celebrations, and community events at Shree Swaminarayan Mandir Woolwich.",
    },
  ],
});
</script>
