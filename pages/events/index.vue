<template>
  <div class="events-page-wrapper">
    <!-- Header Section: Flickr slider behind hero copy -->
    <CommonPageHero>
      <template #media>
        <div class="absolute inset-0 min-h-full w-full">
          <ClientOnly>
            <EventsHeroFlickrSlider :count="24" />
            <template #fallback>
              <div class="absolute inset-0 bg-gray-950" />
            </template>
          </ClientOnly>
        </div>
      </template>
      <h1 class="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
        Mandir <span class="text-golden-500">Events</span>
      </h1>
      <p
        class="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white drop-shadow-md"
      >
        Join us in celebrating our rich spiritual heritage and community spirit through
        our various festivals and events.
      </p>
    </CommonPageHero>

    <!-- Navigation Sub-Menu (scrolls with page — not sticky) -->
    <div
      class="border-b border-gray-100 bg-white/95 dark:border-gray-800 dark:bg-gray-950/95"
    >
      <UContainer>
        <div class="flex items-center justify-center space-x-1 py-4">
          <UButton
            to="/events"
            variant="ghost"
            color="golden"
            label="Upcoming Events"
            class="px-6 rounded-full font-bold"
            :class="upcomingActive ? 'bg-golden-50 text-golden-700' : ''"
          />
          <UButton
            to="/events/past"
            variant="ghost"
            color="gray"
            label="Past Events"
            class="px-6 rounded-full font-bold"
            :class="pastActive ? 'bg-golden-50 text-golden-700' : ''"
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
        <p class="max-w-md text-gray-600 dark:text-gray-400">
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
const { upcomingActive, pastActive } = useEventsSubnav();

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
