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
    <div class="row gallery-row">
      <div id="lightgallery">
        <div
          v-for="(photo, index) in album.photo"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
        >
          <div class="imgbox">
            <a :href="photo.url_o">
              <img :src="photo.url_o" class="category-banner img-responsive" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Album",
  async asyncData({ $axios, params }) {
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
        photoset_id: params.uid,
        extras: "url_n, url_o",
      },
    });

    const album = set.data.photoset;

    return {
      album,
    };
  },
  mounted() {
    const el = document.getElementById("lightgallery");
    window.lightGallery(el, { selector: "a" });
  },
};
</script>
