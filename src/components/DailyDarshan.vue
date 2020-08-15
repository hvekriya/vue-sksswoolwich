<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Daily Darshan</center>
    </legend>
    <ul id="dailydarshan">
      <template v-for="(dd, index) in dailydarshan">
        <li :data-thumb="dd.media_url" :data-src="dd.media_url">
          <img :src="dd.media_url" style="width:100%" :alt="dd.caption | replace()" />
          <div class="dd-caption">
            <span>{{ dd.caption | truncate() }}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DailyDarshan",
  data() {
    return {
      dailydarshan: null,
    };
  },
  methods: {
    getInsta() {
      axios
        .get(
          `https://graph.facebook.com/v5.0/17841400662948582/media?fields=media_url%2Ctimestamp%2Cthumbnail_url%2Ccaption&access_token=${process.env.VUE_APP_FB_ACCESS}`
        )
        .then((response) => {
          console.log(response);
          this.dailydarshan = response.data.data.filter((item) => {
            return item.caption.includes("Daily Darshan");
          });
        });
    },
  },
  created() {
    this.getInsta();
  },
  filters: {
    replace: function (value) {
      return value.replace("#DailyDarshan", "");
    },
  },
  updated() {
    $("#dailydarshan").lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      mode: "slide",
      useCSS: true,
      cssEasing: "ease", //'cubic-bezier(0.25, 0, 0.25, 1)',//
      easing: "linear", //'for jquery animation',////
      speed: 600, //ms'
      auto: true,
      slideEndAnimation: true,
      pause: 2000,
      onSliderLoad: function (el) {
        el.lightGallery({
          selector: "#dailydarshan .lslide",
        });
      },
    });
  },
};
</script>