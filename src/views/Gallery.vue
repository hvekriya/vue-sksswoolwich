<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Gallery</h1>
    </header>
    <div class="row">
      <div
        class="cold-xs-12 col-sm-4 col-md-2 col-lg-2"
        v-for="(item, index) in albums"
        :key="'album-' + index"
      >
        <a :href="item.link">
          <div class="imgbox">
            <img :src="item.cover_photo" class="category-banner img-responsive" />
            <span class="imgbox-desc">
              {{item.name}}
              <span class="imgbox-meta">{{item.date}}</span>
            </span>
          </div>
        </a>
      </div>
    </div>
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
      albums: []
    };
  },
  methods: {},
  created() {
    axios
      .get(
        `https://graph.facebook.com/v5.0/216354315082607?fields=albums.limit(500)%7Bcover_photo%2Cname%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
      )
      .then(response => {
        this.fb_albums = response.data.albums.data;
        this.fb_albums.map(item => {
          axios
            .get(
              `https://graph.facebook.com/v5.0/${item.cover_photo.id}?fields=picture&access_token=${process.env.VUE_APP_FB_ACCESS}`
            )
            .then(response => {
              return this.albums.push({
                link: `/gallery/${item.id}`,
                name: item.name,
                date: moment(item.cover_photo.created_time).format(
                  "DD/MM/YYYY"
                ),
                cover_photo: response.data.picture
              });
            });
        });
      });
  }
};
</script>
