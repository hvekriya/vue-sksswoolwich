<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <div v-if="album">
      <header class="page-header">
        <h1 class="title">{{ album.title }}</h1>
      </header>
      <ol class="breadcrumb">
        <li>
          <NuxtLink to="/events/past">Past events</NuxtLink>
        </li>
        <li class="active">{{ album.title }}</li>
      </ol>
      <div class="row">
        <div id="lightgallery">
          <template
            v-for="(photo, index) in album.photo"
            class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
          >
            <a :href="photo.url_o">
              <v-lazy-image
                :src="photo.url_n || ''"
                class="img-responsive category-banner"
                style="border: none; padding: 5px"
              />
            </a>
          </template>
        </div>
      </div>
      <br />
      <br />
    </div>
    <div v-else>
      <header class="page-header">
        <h1 class="title">{{ eventDetails.data.event_title[0].text }}</h1>
      </header>
      <ol class="breadcrumb">
        <li>
          <NuxtLink to="/events">Events</NuxtLink>
        </li>
        <li class="active">{{ eventDetails.data.event_title[0].text }}</li>
      </ol>
      <prismic-rich-text :field="eventDetails.data.event_description" />
      <br />
      <div class="col-lg-6" style="padding: 0">
        <a :href="eventDetails.data.poster.url">
          <v-lazy-image
            :src="eventDetails.data.poster.url || ''"
            :alt="eventDetails.data.poster.alt || ''"
            class="img-responsive"
            style="border: none; padding: 5px"
          />
        </a>
      </div>
      <div class="col-lg-6" style="padding: 0">
        <template v-if="eventDetails.data.poster_2.url">
          <a :href="eventDetails.data.poster_2.url">
            <v-lazy-image
              :src="eventDetails.data.poster_2.url || ''"
              :alt="eventDetails.data.poster_2.alt || ''"
              loading="lazy"
              class="img-responsive"
              style="border: none; padding: 5px"
            />
          </a>
        </template>
      </div>
      <br />
      <div class="alert alert-info" role="alert">
        <p>
          No photo's found for this event. Please try again later when they are uploaded.
        </p>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image/v2";

export default {
  name: "Event",
  components: {
    VLazyImage,
  },
  head() {
    return {
      title: `${this.eventDetails.data.event_title[0].text} | Woolwich Temple`,
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "keywords",
          content: `${this.eventDetails.data.event_title[0].text} | Woolwich Temple`,
        },
        {
          hid: "description",
          name: "description",
          content: this.$prismic.asText(this.eventDetails.data.event_description),
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: `${this.eventDetails.data.event_title[0].text} | Woolwich Temple`,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.$prismic.asText(this.eventDetails.data.event_description),
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.eventDetails.data.poster.url,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: `${this.eventDetails.data.event_title[0].text} | Woolwich Temple`,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-title",
          property: "og:title",
          content: `${this.eventDetails.data.event_title[0].text} | Woolwich Temple`,
        },
        {
          hid: "og-desc",
          property: "og:description",
          content: this.$prismic.asText(this.eventDetails.data.event_description),
        },
        {
          hid: "og-image",
          property: "og:image",
          content: this.eventDetails.data.poster.url,
        },
        {
          hid: "og-url",
          property: "og:url",
          content: `www.sksswoolwich.org/events/${this.eventDetails.uid}`,
        },
      ],
    };
  },
  async asyncData({ $prismic, $axios, params, error }) {
    try {
      // Event details

      const eventDetails = await $prismic.api.getByUID("events", params.event);

      // Event photos
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
          method: "flickr.photosets.getPhotos",
          photoset_id: params.id,
          extras: "url_n, url_o",
        },
      });

      const album = set.data.photoset;

      return {
        album,
        eventDetails,
      };
    } catch (e) {
      console.log(error);
    }
  },
  errorCaptured(err, vm, info) {
    console.log(err);
  },
  mounted() {
    const el = document.getElementById("lightgallery");
    window.lightGallery(el);
  },
};
</script>
