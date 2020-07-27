<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Insta Feed</center>
    </legend>
    <ul id="dailydarshan">
      <template v-for="(dd, index) in getDD">
        <li :data-thumb="dd.media_url" :data-src="dd.media_url">
          <img :src="dd.media_url" style="width:100%" :alt="dd.caption | replace()" />
          <div class="dd-caption">
            <span>{{ dd.caption | replace() }}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "DailyDarshan",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("dd", ["getDD"])
  },
  filters: {
    replace: function(value) {
      return value.replace("#DailyDarshan", "");
    }
  },
  methods: {
    slider: () => {
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
        onSliderLoad: function(el) {
          el.lightGallery({
            selector: "#dailydarshan .lslide"
          });
        }
      });
    }
  },
  mounted() {
    this.slider();
  },
  beforeUpdate() {
    this.slider();
  }
};
</script>
