<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Daily Darshan</center>
    </legend>
    <hooper
      :progress="true"
      :infiniteScroll="false"
      :autoPlay="true"
      :playSpeed="6000"
      :wheelControl="true"
      style="height: 100%"
    >
      <slide
        v-for="(photo, index) in dailydarshan.photo"
        :key="'photo-' + index"
      >
        <img :src="photo.url_o" style="width: 100%" />
        <div class="dd-caption">
          <span>{{ photo.datetaken | formatDate }}</span>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
    <div style="margin-top: 10px; margin-bottom: 10px">
      <a href="/our-temple/dailydarshan">View more daily darshan photos</a>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  name: "ImageSlider",
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: ["dailydarshan"],
};
</script>