<template>
  <div class="events-page-wrapper">
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
      <h1 class="mb-6 text-5xl font-serif font-bold text-white lg:text-7xl">
        Memory <span class="text-golden-500">Archive</span>
      </h1>
      <p
        class="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white drop-shadow-md"
      >
        Relive the vibrant celebrations and cherished moments from our past events and
        festivals.
      </p>
    </CommonPageHero>

    <!-- Same sub-nav as Upcoming page (scrolls with page — not sticky) -->
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
            class="rounded-full px-6 font-bold"
            :class="upcomingActive ? 'bg-golden-50 text-golden-700' : ''"
          />
          <UButton
            to="/events/past"
            variant="ghost"
            color="golden"
            label="Past Events"
            class="rounded-full px-6 font-bold"
            :class="pastActive ? 'bg-golden-50 text-golden-700' : ''"
          />
        </div>
      </UContainer>
    </div>

    <UContainer class="py-16">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-golden-50 rounded-2xl">
            <UIcon name="i-heroicons-archive-box" class="w-6 h-6 text-golden-600" />
          </div>
          <h2 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            Historical Events
          </h2>
        </div>

        <!-- Filter Integration -->
        <PastYears />
      </div>

      <!-- Provide default empty array if pastEvents is null (to avoid PropType warning) -->
      <PastEvents :past-events="pastEvents ?? []" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();
const route = useRoute();

/** Default “Past events” opens current year archive; ?all=1 shows every past year */
if (route.path === "/events/past" && route.query.all !== "1") {
  const y = new Date().getFullYear();
  await navigateTo(`/events/year/${y}`, { replace: true });
}

const { upcomingActive, pastActive } = useEventsSubnav();

const { data: pastEvents } = await useAsyncData(
  "past-events-all-years",
  async () => {
    const today = new Date().toISOString().split("T")[0];
    const all = await cms.getAllEvents();
    const past = all.filter((e: any) => e.data.event_date < today);
    past.sort(
      (a: any, b: any) =>
        new Date(b.data.event_date).getTime() - new Date(a.data.event_date).getTime()
    );
    return past;
  },
  {
    watch: [() => route.query.all],
  }
);

useHead({
  title: "Past Events Archive | Woolwich Temple",
  meta: [
    {
      name: "description",
      content:
        "Relive the beautiful celebrations and moments from the history of Shree Swaminarayan Mandir Woolwich.",
    },
  ],
});
</script>
