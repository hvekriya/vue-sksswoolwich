/**
 * Shared “Upcoming” vs “Past” tab highlighting across /events, /events/past, /events/year/:year
 */
export function useEventsSubnav() {
  const route = useRoute();

  const upcomingActive = computed(() => route.path === "/events");

  const pastActive = computed(
    () =>
      route.path.startsWith("/events/past") ||
      route.path.startsWith("/events/year/")
  );

  return { upcomingActive, pastActive };
}
