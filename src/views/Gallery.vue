<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Gallery</h1>
    </header>

    <div class="row">
      <div v-for="(item, index) in albums" :key="'album-' + index">
        <img :src="item.cover_photo" />
        <div>
          <h3>{{item.name}}</h3>
          <div>
            <p>{{item.date}}</p>
          </div>
          <a :href="item.link">View</a>
        </div>
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
        `https://graph.facebook.com/v5.0/216354315082607?fields=albums%7Bcover_photo%2Cname%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
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
                date: item.cover_photo.created_time,
                cover_photo: response.data.picture
              });
            });
        });
      });
  }
};
</script>
