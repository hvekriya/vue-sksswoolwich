<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>{{this.album_name}}</h1>
    </header>

    <div class="row">
      <div id="dailydarshan-all">
        <template v-for="(photo, index) in photos">
          <template v-for="(item, index) in photo">
            <a :href="item.source">
              <img :src="item.source" style="margin:16px;" width="155px" />
            </a>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Album",
  data() {
    return {
      album: null,
      photos: [],
      album_name: null
    };
  },
  methods: {
    getFbAlbum(id) {
      axios
        .get(
          `https://graph.facebook.com/v5.0/${id}?fields=photos%7Bimages%2Calbum%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
        )
        .then(response => {
          this.album_name = response.data.photos.data[0].album.name;
          this.album = response.data.photos.data.map(items => {
            return items.images;
          });
          this.photos = this.album.map(nested =>
            nested.map(element => element).filter(photo => photo.width === 720)
          );
        });
    }
  },
  created() {
    this.getFbAlbum(this.$route.params.id);
  },
  updated() {
    $("#dailydarshan-all").lightGallery({
      gallery: true
    });
  }
};
</script>
