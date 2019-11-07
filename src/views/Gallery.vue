<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Gallery</h1>
    </header>
    <div class="row">
      <div
        class="col-xs-12 col-sm-4 col-md-2 col-lg-2"
        v-for="(item, index) in sortedAlbums"
        :key="'album-' + index"
      >
        <a :href="item.link">
          <div class="imgbox">
            <img :src="item.cover_photo" class="category-banner img-responsive" />
            <span class="imgbox-desc">
              {{item.name}}
              <span class="imgbox-meta">{{item.date | formatDate}}</span>
            </span>
          </div>
        </a>
      </div>

      <loading :active.sync="isLoading"></loading>
    </div>
    <br />
    <br />
    <div class="row">
      <button class="btn btn-primary" @click="loadMoreAlbums" v-if="loadNext != undefined">Load more</button>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Gallery",
  data() {
    return {
      fb_albums: null,
      albums: [],
      isLoading: true,
      loadNext: null
    };
  },
  methods: {
    loadMoreAlbums: function() {
      if (this.loadNext != undefined) {
        axios.get(this.loadNext).then(response => {
          this.loadNext = response.data.paging.next;
          this.fb_albums.push(response.data.data);
          response.data.data
            .map(item => item)
            .map(item => {
              axios
                .get(
                  `https://graph.facebook.com/v5.0/${item.id}?fields=photos.limit(4000)%7Bimages%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
                )
                .then(response => {
                  const all_albums = response.data.photos.data.map(items => {
                    return items.images;
                  });
                  const thumbnails = all_albums.map(nested =>
                    nested.map(element => element)
                  );
                  this.isLoading = false;

                  return this.albums.push({
                    link: `/gallery/album/${item.id}`,
                    name: item.name,
                    date: item.cover_photo.created_time,
                    cover_photo: thumbnails[0][0].source
                  });
                })
                .catch(err => {
                  if (err.msg) {
                    this.loading = false;
                  }
                });
            });
        });
      }
    }
  },
  computed: {
    sortedAlbums: function() {
      return this.albums
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reverse();
    }
  },
  created() {
    axios
      .get(
        `https://graph.facebook.com/v5.0/216354315082607?fields=albums%7Bcover_photo%2Cname%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
      )
      .then(response => {
        this.loadNext = response.data.albums.paging.next;
        this.fb_albums = response.data.albums.data;
        this.fb_albums
          .map(item => item)
          .filter(item => {
            return (
              item.name !== "Timeline Photos" &&
              item.name !== "Mobile Uploads" &&
              item.name !== "Profile pictures"
            );
          })
          .map(item => {
            axios
              .get(
                `https://graph.facebook.com/v5.0/${item.id}?fields=photos.limit(4000)%7Bimages%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
              )
              .then(response => {
                const all_albums = response.data.photos.data.map(items => {
                  return items.images;
                });
                const thumbnails = all_albums.map(nested =>
                  nested.map(element => element)
                );
                this.isLoading = false;

                return this.albums.push({
                  link: `/gallery/album/${item.id}`,
                  name: item.name,
                  date: item.cover_photo.created_time,
                  cover_photo: thumbnails[0][0].source
                });
              })
              .catch(err => {
                if (err.msg) {
                  this.loading = false;
                }
              });
          });
      });
  }
};
</script>
