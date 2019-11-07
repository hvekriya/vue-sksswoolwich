<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>{{this.album_name}}</h1>
    </header>
    <ol class="breadcrumb">
      <li>
        <a href="/gallery">Gallery</a>
      </li>
      <li class="active">Album</li>
    </ol>
    <div class="row">
      <div id="album">
        <template v-for="(photo, index) in photos">
          <div v-for="(item, index) in photo" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
            <a :href="item.source">
              <div class="imgbox">
                <img :src="item.source" class="category-banner img-responsive" />
              </div>
            </a>
          </div>
        </template>
      </div>
    </div>
    <div class="row">
      <ol class="breadcrumb">
        <li>
          <a href="/gallery">Gallery</a>
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
      isLoading: true
    };
  },
  methods: {
    getFbAlbum(id) {
      axios
        .get(
          `https://graph.facebook.com/v5.0/${id}?fields=photos.limit(500)%7Bimages%2Calbum%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
        )
        .then(response => {
          this.isLoading = false;
          this.album_name = response.data.photos.data[0].album.name;
          this.album = response.data.photos.data.map(items => {
            return items.images;
          });
          this.photos = this.album.map(nested =>
            nested.map(element => element).filter(photo => photo.width >= 1080)
          );
        })
        .catch(err => {
          if (err.msg) {
            this.loading = false;
          }
        });
    }
  },
  created() {
    this.getFbAlbum(this.$route.params.id);
  },
  updated() {
    $("#album").lightGallery({
      selector: "a",
      gallery: true,
      zoom: true
    });
  }
};
</script>