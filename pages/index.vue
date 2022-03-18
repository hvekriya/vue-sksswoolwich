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
            <center>Events calendar</center>
          </legend>
          <Calendar class="fc-calendar" />
        </div>
      </div>
      <UpcomingEvents :upcomingEvents="upcomingEvents" />
      <div class="row">
        <header class="page-header">
          <h2>Past events</h2>
        </header>
        <p>
          View events we have celebrated recently. See if you can spot yourself
          or someone you know in the pictures!
        </p>
        <RecentUploads :recentUploads="recentUploads" />
        <br />
        <a href="/events" class="btn btn-primary"> View all events</a>
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
import UpcomingEvents from "../components/UpcomingEvents";
import RecentUploads from "../components/RecentUploads";
import WeeklySchedule from "../components/WeeklySchedule";
import LiveStream from "../components/LiveStream";
import ImageSlider from "../components/ImageSlider";
import Alert from "../components/Alert";
import CallToAction from "../components/CallToAction.vue";
import moment from "moment";

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
    UpcomingEvents,
    RecentUploads,
  },
  async asyncData({ $prismic, params, error, $axios }) {
    try {
      // Get event data from Prismic
      const document = await $prismic.api.getSingle("home");
      const eventsFromPrismic = await $prismic.api.query(
        $prismic.predicates.at("document.type", "events")
      );
      const today = moment().format("YYYY-MM-DD").toString();
      const events = eventsFromPrismic.results;

      // Filter the events based on past and future
      const upcomingEvents = events.filter((event) => {
        return moment(event.data.event_date).isSameOrAfter(today);
      });
      var d = new Date();
      const recentUploadTime = d.getDate() - 5; // Last 30 days
      const unixTimeStamp = Math.floor(Date.now() / 1000);

      // Get recent uploads data
      const flickrConfig = {
        api_key: process.env.flickrApiKey,
        user_id: process.env.flickrUserId,
        format: "json",
        nojsoncallback: 1,
      };
      const flickrUrl = process.env.flickrUrl;
      const set = await $axios.get(flickrUrl, {
        params: {
          ...flickrConfig,
          method: "flickr.photos.search",
          min_date_upload: unixTimeStamp,
          per_page: 6,
          extras: "url_n, url_o",
        },
      });
      const recentUploads = set.data.photos.photo;

      return {
        upcomingEvents,
        recentUploads,
        fields: {
          slices: document.data.body,
        },
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
