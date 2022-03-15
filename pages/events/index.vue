<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Events</h1>
    </header>
    <!-- Upcoming events -->
    <header class="page-header">
      <h2 class="title">Upcoming events</h2>
    </header>
    <div class="row">
      <ul class="event-list">
        <li
          class="important"
          v-for="(event, index) in futureEvents"
          :key="'event-' + index"
        >
          <time>
            <span class="month">{{ event.data.event_date | moment }}</span>
          </time>
          <div class="info">
            <div class="col-lg-8">
              <prismic-rich-text :field="event.data.event_title" />
              <prismic-rich-text :field="event.data.event_description" />
            </div>
            <div class="col-lg-2"></div>
            <div id="lightgallery" class="col-lg-2" style="padding: 0">
              <a :href="event.data.poster.url">
                <img
                  :src="event.data.poster.url"
                  :alt="event.data.poster.alt"
                  class="img-responsive"
                  style="border: none; padding: 5px"
                />
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <header class="page-header">
      <h2 class="title">Past events</h2>
    </header>
    <div class="row">
      <ul class="event-list">
        <li
          class="important"
          v-for="(event, index) in pastEvents"
          :key="'event-' + index"
        >
          <time>
            <span class="month">{{ event.data.event_date | moment }}</span>
          </time>
          <div class="info">
            <div class="col-lg-8">
              <prismic-rich-text :field="event.data.event_title" />
              <prismic-rich-text :field="event.data.event_description" />
            </div>
            <div class="col-lg-2"></div>
            <div id="lightgallery" class="col-lg-2" style="padding: 0">
              <a :href="event.data.poster.url">
                <img
                  :src="event.data.poster.url"
                  :alt="event.data.poster.alt"
                  class="img-responsive"
                  style="border: none; padding: 5px"
                />
              </a>
              <NuxtLink
                :to="'/event/' + event.data.flicker_album_id"
                class="btn btn-secondary"
                style="width: 100%"
                >View pictures</NuxtLink
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Events",
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
      const futureEvents = events.filter((event) => {
        return moment(event.data.event_date).isAfter(today);
      });
      console.log(futureEvents);
      return {
        futureEvents,
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

<style scoped>
@media (min-width: 768px) {
  .event-list > li > img,
  .event-list > li > time {
    width: 80px;
    height: 110px;
    padding: 0;
    margin: 0;
  }
}
</style>
 