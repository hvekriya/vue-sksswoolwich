<template>
  <main id="content" role="main">
    <SlideShow />
    <LiveStream :fields="fields" />
    <div class="wrapper container">
      <br />
      <div class="row">
        <DailyDarshan />
        <OpeningTimes />
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <legend>
            <center>Upcoming Events</center>
          </legend>
          <UpcomingEvents class="fc-calendar" />
          <br />
          <a href="/our-temple/calendar">Full page view</a>
        </div>
      </div>
      <div class="row">
        <WeeklySchedule :fields="fields" />
      </div>
    </div>
  </main>
</template>

<style>
.fc-toolbar .fc-left {
  display: none;
}
.fc-scroller {
  height: 400px !important;
}
</style>


<script>
import SlideShow from "../components/SlideShow";
import DailyDarshan from "../components/DailyDarshan";
import OpeningTimes from "../components/OpeningTimes";
import UpcomingEvents from "../components/UpcomingEvents";
import WeeklySchedule from "../components/WeeklySchedule";
import LiveStream from "../components/LiveStream";

export default {
  name: "Home",
  components: {
    SlideShow,
    DailyDarshan,
    OpeningTimes,
    UpcomingEvents,
    WeeklySchedule,
    LiveStream
  },
  data() {
    return {
      fields: {
        slices: []
      }
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client.getSingle("home").then(document => {
        if (document) {
          this.fields.slices = document.data.body;
        } else {
          this.$router.push({
            name: "not-found"
          });
        }
      });
    }
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  }
};
</script>
