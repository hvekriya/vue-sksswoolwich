<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Events</h1>
    </header>
    <!-- Upcoming events -->
    <UpcomingEvents :upcomingEvents="upcomingEvents" />
    <PastEvents :pastEvents="pastEvents" />
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
      const eventsFromPrismic = await $prismic.api.query(
        $prismic.predicates.at("document.type", "events")
      );
      const today = moment().format("YYYY-MM-DD").toString();
      const events = eventsFromPrismic.results;

      // Filter the events based on past and future
      const pastEvents = events.filter((event) => {
        return moment(event.data.event_date).isBefore(today);
      });
      const upcomingEvents = events.filter((event) => {
        return moment(event.data.event_date).isAfter(today);
      });
      return {
        upcomingEvents,
        pastEvents,
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }

    // Get all albums

    // const params = {
    //   api_key: process.env.flickrApiKey,
    //   user_id: process.env.flickrUserId,
    //   format: "json",
    //   nojsoncallback: 1,
    // };
    // const flickrUrl = process.env.flickrUrl;
    // const flickrAlbums = await $axios.get(flickrUrl, {
    //   params: {
    //     ...params,
    //     method: "flickr.photosets.getList",
    //     primary_photo_extras: "url_n, url_o, date_taken",
    //   },
    // });
    // const albums = flickrAlbums.data.photosets.photoset;

    // return {
    //   albums,
    // };
  },
  mounted() {
    const el = document.getElementById("lightgallery");
    window.lightGallery(el, { selector: "a" });
  },
};
</script>