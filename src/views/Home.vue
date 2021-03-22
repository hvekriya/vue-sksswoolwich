<template>
  <main id="content" role="main">
    <ImageSlider :fields="fields" />
    <LiveStream :fields="fields" />
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
      <!-- <header class="page-header">
        <h2>Gallery</h2>
      </header>
      <div class="row">
        <Gallery :limit="galleryLimit" />
        <center>
          <a href="/media/gallery" class="btn btn-primary" style="width: 30%"
            >Load more</a
          >
        </center>
        <br />
        <br />
      </div> -->
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
// import Gallery from "../components/Gallery";
import ImageSlider from "../components/ImageSlider";
import Alert from "../components/Alert";

export default {
  name: "Home",
  components: {
    DailyDarshan,
    OpeningTimes,
    Calendar,
    WeeklySchedule,
    LiveStream,
    // Gallery,
    ImageSlider,
    Alert,
  },
  data() {
    return {
      fields: {
        slices: [],
      },
      galleryLimit: 6,
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client.getSingle("home").then((document) => {
        if (document) {
          this.fields.slices = document.data.body;
        } else {
          this.$router.push({
            name: "not-found",
          });
        }
      });
    },
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
};
</script>
