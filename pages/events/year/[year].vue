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
        Events Archive:
        <span class="text-golden-500">{{ year }}</span>
      </h1>
      <p
        class="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white drop-shadow-md"
      >
        Relive the vibrant celebrations and cherished moments from {{ year }}.
      </p>
    </CommonPageHero>

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
      <div class="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div class="flex items-center space-x-4">
          <div class="rounded-2xl bg-golden-50 p-3">
            <UIcon name="i-heroicons-calendar" class="h-6 w-6 text-golden-600" />
          </div>
          <h2 class="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            Events from {{ year }}
          </h2>
        </div>

        <PastYears />
      </div>

      <PastEvents :past-events="(pastEvents as any[]) || []" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const cms = useCms();
const route = useRoute();
const { upcomingActive, pastActive } = useEventsSubnav();

const year = route.params.year as string;

const { data: pastEvents } = await useAsyncData(`events-${year}`, async () => {
  const startOfYear = `${year}-01-01`;
  const endOfYear = `${year}-12-31`;

  const all = await cms.getAllEvents();
  const inYear = all.filter((e: any) => {
    const d = e.data.event_date;
    return d >= startOfYear && d <= endOfYear;
  });
  inYear.sort(
    (a: any, b: any) =>
      new Date(b.data.event_date).getTime() - new Date(a.data.event_date).getTime()
  );
  return inYear;
});

useHead({
  title: `Events in ${year} | Woolwich Temple`,
  meta: [
    {
      name: "description",
      content: `Browse events and celebrations from the year ${year} at Shree Swaminarayan Mandir Woolwich.`,
    },
  ],
});
</script>
