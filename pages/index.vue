<template>
  <main id="content" role="main">
    <ImageSlider :fields="fields" />
    <LiveStream :fields="fields" />
    <!-- <CallToAction /> -->
    <div class="wrapper container">
      <br />
      <div class="row">
        <Alert :fields="fields" />
      </div>
      <div class="row">
        <!-- <DailyDarshan :dailydarshan="dailydarshan" /> -->
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <legend>
            <center>Annoucements</center>
          </legend>
          <div class="announcements-container">
            <AnnouncementList class="announcements-list" />
          </div>
        </div>
        <OpeningTimes />
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <legend>
            <center>Events calendar</center>
          </legend>
          <Calendar class="fc-calendar" />
        </div>
      </div>
      <LazyUpcomingEvents :upcomingEvents="upcomingEvents" style="margin-top: 20px" />
      <NuxtLink to="events/past" class="btn btn-primary view-all-events">
        View past events</NuxtLink
      >
      <div class="row">
        <header class="page-header">
          <h2>Photostream</h2>
        </header>
        <p>
          Daily Darshan Photos and photos from events we have celebrated recently. See if
          you can spot yourself or someone you know in the pictures!
        </p>
        <LazyRecentUploads :recentUploads="recentUploads" />
        <br />
        <a
          href="https://www.flickr.com/photos/sksswoolwich/"
          class="btn btn-primary view-all-events"
          target="_blank"
        >
          View all photos</a
        >
      </div>
      <br />
      <br />
    </div>
  </main>
</template>

<script>
import DailyDarshan from "../components/DailyDarshan";
import OpeningTimes from "../components/OpeningTimes";
import Calendar from "../components/Calendar";
import UpcomingEvents from "../components/UpcomingEvents";
import RecentUploads from "../components/RecentUploads";
import LiveStream from "../components/LiveStream";
import ImageSlider from "../components/ImageSlider";
import Alert from "../components/Alert";
import CallToAction from "../components/CallToAction.vue";
import moment from "moment";
import AnnouncementList from "../components/AnnouncementList.vue";

export default {
  name: "Index",
  components: {
    DailyDarshan,
    OpeningTimes,
    Calendar,
    LiveStream,
    ImageSlider,
    Alert,
    CallToAction,
    UpcomingEvents,
    RecentUploads,
    AnnouncementList,
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
      upcomingEvents.sort(function (a, b) {
        a = new Date(a.data.event_date);
        b = new Date(b.data.event_date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * -1;
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
          per_page: 14,
          extras: "url_n, url_o, tags",
        },
      });
      const recentUploads = set.data.photos.photo;

      const dd = await $axios.get(flickrUrl, {
        params: {
          ...flickrConfig,
          method: "flickr.photosets.getPhotos",
          photoset_id: "72177720300123646",
          extras: "url_n, url_o, date_upload, date_taken",
          per_page: "10",
        },
      });

      const dailydarshan = dd.data.photoset;

      return {
        upcomingEvents,
        recentUploads,
        dailydarshan,
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

<style lang="scss" scoped>
@mixin respond-to($media) {
  @if $media==handhelds {
    @media only screen and (max-width: 768px) {
      @content;
    }
  } @else if $media==medium-screens {
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      @content;
    }
  } @else if $media==wide-screens {
    @media only screen and (min-width: 1024px) {
      @content;
    }
  }
}

main {
  margin-top: 50px;
}

.fc-toolbar .fc-left {
  display: none;
}
.fc-scroller {
  height: 400px !important;
}

.view-all-events {
  width: 20%;
  @include respond-to(handhelds) {
    width: 100%;
  }
}

.announcements-container {
  height: 500px;
  padding: 3px;
}

.announcements-list {
  height: 480px;
  overflow: auto;
}
</style>
