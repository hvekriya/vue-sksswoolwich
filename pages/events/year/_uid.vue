<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <div class="row">
        <div class="col-lg-4">
          <h1 class="title">Past events {{ year }}</h1>
        </div>
        <div class="col-lg-8">
          <PastYears />
        </div>
      </div>
    </header>
    <ol class="breadcrumb">
      <li>
        <NuxtLink to="/events">Events </NuxtLink>
      </li>
      <li class="active">{{ year }}</li>
    </ol>
    <!-- Filter -->
    <br />
    <PastEvents :pastEvents="pastEvents" />
  </div>
</template>

<script>
import moment from "moment";
import UpcomingEvents from "../../../components/UpcomingEvents";
import PastEvents from "../../../components/PastEvents";
import PastYears from "../../../components/PastYears";
export default {
  name: "Events",
  components: {
    UpcomingEvents,
    PastEvents,
    PastYears,
  },
  async asyncData({ $prismic, $axios, error, params }) {
    try {
      // Get event data from Prismic
      const currentYear = moment().year();
      const eventsFromPrismic = await $prismic.api.query([
        $prismic.predicates.year("document.first_publication_date", params.uid),
        $prismic.predicates.at("document.type", "events"),
      ]);
      const today = moment().format("YYYY-MM-DD").toString();
      const events = eventsFromPrismic.results;

      // Filter the events based on past and future
      const pastEvents = events.filter((event) => {
        return moment(event.data.event_date).isBefore(today);
      });
      pastEvents.sort(function (a, b) {
        a = new Date(a.data.event_date);
        b = new Date(b.data.event_date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * 1;
      });

      const upcomingEvents = events.filter((event) => {
        return moment(event.data.event_date).isSameOrAfter(today);
      });
      upcomingEvents.sort(function (a, b) {
        a = new Date(a.data.event_date);
        b = new Date(b.data.event_date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * -1;
      });
      return {
        year: params.uid,
        upcomingEvents,
        pastEvents,
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>