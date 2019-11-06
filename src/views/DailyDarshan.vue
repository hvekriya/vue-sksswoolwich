<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Daily Darshan</h1>
    </header>

    <div class="row">
      <div id="dailydarshan-all">
        <div v-for="(dd, index) in dailydarshan" class="col-xs-12 col-sm-4 col-md-2 col-lg-2">
          <a :href="dd.images.standard_resolution.url">
            <div class="imgbox">
              <img :src="dd.images.thumbnail.url" class="category-banner img-responsive" />
              <span class="imgbox-desc">{{dd.caption.text}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DailyDarshan",
  data() {
    return {
      access_token: process.env.VUE_APP_INSTA_TOKEN,
      insta_api: process.env.VUE_APP_INSTA_API,
      dailydarshan: null
    };
  },
  methods: {
    getInsta() {
      axios
        .get(this.insta_api + "?access_token=" + this.access_token)
        .then(({ data }) => {
          this.dailydarshan = data.data
            .map(posts => posts)
            .filter(image => image.tags.includes("dailydarshan"));
        })
        .catch(function(error) {
          console.log(error);
          this.error = true;
        });
    }
  },
  created() {
    this.getInsta();
  },
  filters: {
    replace: function(value) {
      return value.replace("#DailyDarshan", "");
    }
  },
  updated() {
    $("#dailydarshan-all").lightGallery({
      gallery: true,
      selector: "a"
    });
  }
};
</script>
