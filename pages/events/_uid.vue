<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">{{ album.title }}</h1>
    </header>
    <ol class="breadcrumb">
      <li>
        <a href="/events">Events</a>
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
            <img :src="photo.url_n" class="category-banner img-responsive" />
          </a>
        </template>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Event",
  async asyncData({ $axios, params, query, error }) {
    try {
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
          photoset_id: query.event_id,
          extras: "url_n, url_o",
        },
      });

      const album = set.data.photoset;

      return {
        album,
      };
    } catch (e) {
      error({
        statusCode: 404,
        message:
          "Page not found. You need to use the full link including the event id",
      });
    }
  },
  mounted() {
    const el = document.getElementById("lightgallery");
    window.lightGallery(el);
  },
};
</script>