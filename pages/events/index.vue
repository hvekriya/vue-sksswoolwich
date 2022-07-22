<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Events</h1>
    </header>

    <ul class="nav nav-pills">
      <li class="active">
        <a href="#1" data-toggle="tab">Upcoming events</a>
      </li>
      <li>
        <a href="#2" data-toggle="tab">Past events</a>
      </li>
    </ul>

    <div class="tab-content clearfix">
      <div class="tab-pane active" id="1">
        <!-- Upcoming events -->
        <UpcomingEvents :upcomingEvents="upcomingEvents" />
      </div>
      <div class="tab-pane" id="2">
        <PastEvents :pastEvents="pastEvents" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import UpcomingEvents from "../../components/UpcomingEvents";
import PastEvents from "../../components/PastEvents";
export default {
  name: "Events",
  components: {
    UpcomingEvents,
    PastEvents,
  },
  async asyncData({ $prismic, $axios, error }) {
    try {
      // Get event data from Prismic
      const currentYear = moment().year();
      const eventsFromPrismic = await $prismic.api.query([
        $prismic.predicates.year(
          "document.first_publication_date",
          currentYear
        ),
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
<style lang="scss" scoped>
.dropdown {
  float: right;
  margin-top: 20px;
  margin-bottom: 10px;
}
.nav-pills {
  li.active {
    position: relative;
    background: $main-gradiant;
  }
  li.active a {
    color: white !important;
  }
}
</style>