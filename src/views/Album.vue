<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>{{this.album_name}}</h1>
    </header>
    <ol class="breadcrumb">
      <li>
        <a href="/media/gallery">Gallery</a>
      </li>
      <li class="active">Album</li>
    </ol>
    <div class="row gallery-row">
      <div id="album">
        <div v-for="(photo, index) in photos" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <div class="imgbox">
            <a :href="photo[0].source">
              <img :src="photo[0].source" class="category-banner img-responsive" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <center>
        <button
          class="btn btn-primary"
          @click="loadMoreAlbums"
          v-if="loadNext != undefined"
          style="width: 30%"
        >Load more</button>
      </center>
    </div>
    <br />
    <br />
    <div class="row">
      <ol class="breadcrumb">
        <li>
          <a href="/media/gallery">Gallery</a>
        </li>
        <li class="active">Album</li>
      </ol>
      <loading :active.sync="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Album",
  data() {
    return {
      album: null,
      photos: [],
      album_name: null,
      isLoading: true,
      loadNext: null,
    };
  },
  methods: {
    getFbAlbum(id) {
      axios
        .get(
          `https://graph.facebook.com/v5.0/${id}?fields=photos%7Bimages%2Calbum%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
        )
        .then((response) => {
          this.loadNext = response.data.photos.paging.next;
          this.album_name = response.data.photos.data[0].album.name;
          this.album = response.data.photos.data.map((items) => {
            return items.images;
          });

          this.photos = this.album.map((nested) =>
            nested
              .map((element) => element)
              .filter((photo) => photo.width >= 700)
          );
          console.log(this.album);
          this.isLoading = false;
        })
        .catch((err) => {
          if (err.msg) {
            this.loading = false;
          }
        });
    },
    loadMoreAlbums: function () {
      if (this.loadNext != undefined) {
        this.isLoading = true;
        axios
          .get(this.loadNext)
          .then((response) => {
            response.data.data
              .map((item) => item)
              .map((item) => {
                return this.photos.push(item.images);
              });
            this.loadNext = response.data.paging.next;

            this.isLoading = false;
          })
          .catch((err) => {
            if (err.msg) {
              this.loading = false;
            }
          });
      }
    },
  },
  created() {
    this.getFbAlbum(this.$route.params.id);
  },
  updated() {
    $("#album").lightGallery({
      selector: "a",
      gallery: true,
      zoom: true,
    });
  },
};
</script>