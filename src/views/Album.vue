<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>{{this.getAlbumName}}</h1>
    </header>
    <ol class="breadcrumb">
      <li>
        <a href="/media/gallery">Gallery</a>
      </li>
      <li class="active">Album</li>
    </ol>
    <div class="row gallery-row">
      <div id="album">
        <div v-for="(photo, index) in getPhotos" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <div class="imgbox">
            <a :href="photo[0].source" target="_blank">
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
          @click="getMorePhotos"
          v-if="getNextSetOfPhotos != undefined"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

// Store functions
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Album",
  data() {
    return {};
  },

  computed: {
    ...mapGetters("FB_Photos", [
      "getPhotos",
      "getNextSetOfPhotos",
      "getAlbumName",
    ]),
  },
  methods: {
    ...mapActions("FB_Photos", ["getFBAlbum", "getMorePhotos"]),
  },
  created() {
    this.getFBAlbum(this.$route.params.id);
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