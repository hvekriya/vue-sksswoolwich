<template>
  <main id="content" role="main">
    <ImageSlider :fields="fields" />
    <LiveStream :fields="fields" />
    <CallToAction />
    <div class="wrapper container">
      <br />
      <div class="row">
        <Alert :fields="fields" />
      </div>
      <div class="row">
        <DailyDarshan />
        <OpeningTimes />
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <legend>
            <center>Upcoming Events</center>
          </legend>
          <Calendar class="fc-calendar" />
        </div>
      </div>
      <div class="row">
        <WeeklySchedule :fields="fields" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.fc-toolbar .fc-left {
  display: none;
}
.fc-scroller {
  height: 400px !important;
}
</style>


<script>
import DailyDarshan from "../components/DailyDarshan";
import OpeningTimes from "../components/OpeningTimes";
import Calendar from "../components/Calendar";
// import UpcomingEvents from "../components/UpcomingEvents";
import WeeklySchedule from "../components/WeeklySchedule";
import LiveStream from "../components/LiveStream";
import ImageSlider from "../components/ImageSlider";
import Alert from "../components/Alert";
import CallToAction from "../components/CallToAction.vue";

export default {
  name: "Index",
  components: {
    DailyDarshan,
    OpeningTimes,
    Calendar,
    WeeklySchedule,
    LiveStream,
    ImageSlider,
    Alert,
    CallToAction,
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const document = await $prismic.api.getSingle("home");
      return {
        fields: {
          slices: document.data.body,
        },
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
