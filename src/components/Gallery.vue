<template>
  <div>
    <div class="row gallery-row">
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
          @click="getMoreFBAlbums"
          v-if="getNextSetOfAlbums != undefined && limit === undefined"
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

// Store functions
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Gallery",
  data() {
    return {
      fb_albums: null,
      albums: [],
      isLoading: false,
      loadNext: null,
    };
  },
  props: ["limit"],
  computed: {
    ...mapGetters("FB_Albums", ["getAlbums", "getNextSetOfAlbums"]),
    sortedAlbums: function () {
      return this.getAlbums
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reverse()
        .slice(0, this.limit || this.getAlbums.length); // Limit the albums for home page
    },
  },
  methods: {
    ...mapActions("FB_Albums", ["getFBAlbums", "getMoreFBAlbums"]),
  },
  created() {
    this.getFBAlbums();
  },
};
</script>