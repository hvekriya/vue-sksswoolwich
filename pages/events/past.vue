<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Past events</h1>
    </header>

    <ul class="nav nav-pills">
      <li>
        <NuxtLink to="/events">Upcoming events</NuxtLink>
      </li>
      <li class="NuxtLink-exact-active">
        <a href="/events/past">Past events</a>
      </li>
    </ul>
    <PastEvents :pastEvents="pastEvents" />
  </div>
</template>

<script>
import moment from "moment";
import PastEvents from "../../components/PastEvents";
export default {
  name: "Events",
  components: {
    PastEvents,
  },
  async asyncData({ $prismic, $axios, error }) {
    try {
      // Get event data from Prismic
      const currentYear = moment().year();
      const eventsFromPrismic = await $prismic.api.query(
        $prismic.predicates.at("document.type", "events")
      );
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
      return {
        pastEvents,
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  float: right;
  margin-top: -40px;
  margin-bottom: 10px;
}
.nav-pills {
  background-color: $gray-300;
  li.active {
    position: relative;
    background: $main-gradiant;
  }
  li.active a {
    color: white !important;
  }
}
</style>