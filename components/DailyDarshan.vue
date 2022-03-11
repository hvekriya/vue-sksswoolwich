<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Daily Darshan</center>
    </legend>
    <ul id="dailydarshan" v-for="(dd, index) in dailydarshan">
      <template v-for="(img, index) in dd.media_url">
        <li :data-thumb="img" :data-src="img">
          <img :src="img" style="width: 100%" />
          <div class="dd-caption">
            <span>{{ dd.lastUpdatedDate }}</span>
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
    getDD() {
      axios.get("https://dd.swaminarayan.faith/api").then((response) => {
        this.dailydarshan = response.data.data
          .filter((id) => {
            return id.id == "woolwich";
          })
          .map((item) => {
            return {
              media_url: item.lastUpdated.images.map((item) => {
                return `https://dd.swaminarayan.faith/api${item}`;
              }),
              lastUpdatedDate: item.lastUpdated.date,
            };
          });
      });
    },
  },
  created() {
    this.getDD();
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
      speed: 900, //ms'
      auto: true,
      slideEndAnimation: true,
      pause: 2000,
      pager: false,
      onSliderLoad: function (el) {
        el.lightGallery({
          selector: "#dailydarshan .lslide",
        });
      },
    });
  },
};
</script>
