<template>
  <div>
    <div class="row" style="margin-left: -20px;">
      <div
        class="col-xs-6 col-sm-4 col-md-2 col-lg-2"
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
    </div>
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <center>
        <button
          class="btn btn-primary"
          @click="loadMoreAlbums"
          v-if="loadNext != undefined && limit === undefined"
          style="width: 30%"
        >Load more</button>
      </center>
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
  props: ["limit"],
  methods: {
    loadAlbums: function() {
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
                  this.albums.push({
                    link: `/media/gallery/album/${item.id}`,
                    name: item.name,
                    date: item.cover_photo.created_time,
                    cover_photo: thumbnails[0][0].source
                  });
                });
            });
        });
    },
    loadMoreAlbums: function() {
      this.isLoading = true;
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
                    link: `/media/gallery/album/${item.id}`,
                    name: item.name,
                    date: item.cover_photo.created_time,
                    cover_photo: thumbnails[0][0].source
                  });
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
        .reverse()
        .slice(0, this.limit || this.albums.length); // Limit the albums for home page
    }
  },
  created() {
    this.loadAlbums();
  }
};
</script>