<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Events</h1>
    </header>
    <!-- Upcoming events -->
    <!-- Past events -->
    <div class="row gallery-row">
      <div
        class="col-xs-6 col-sm-4 col-md-2 col-lg-2"
        v-for="(album, index) in albums"
        :key="'album-' + index"
      >
        <a :href="'/events/' + album.id">
          <div class="imgbox">
            <img
              :src="album.primary_photo_extras.url_o"
              class="category-banner img-responsive"
            />
            <span class="imgbox-desc">
              {{ album.title._content }}
              <span class="imgbox-meta">{{ album.datetaken | moment }}</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  async asyncData({ $axios }) {
    const params = {
      api_key: process.env.flickrApiKey,
      user_id: process.env.flickrUserId,
      format: "json",
      nojsoncallback: 1,
    };

    const flickrUrl = process.env.flickrUrl;

    const flickrAlbums = await $axios.get(flickrUrl, {
      params: {
        ...params,
        method: "flickr.photosets.getList",
        primary_photo_extras: "url_n, url_o, date_taken",
      },
    });
    const albums = flickrAlbums.data.photosets.photoset;

    return {
      albums,
    };
  },
};
</script>
