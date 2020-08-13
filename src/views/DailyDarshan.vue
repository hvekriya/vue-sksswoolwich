<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Daily Darshan</h1>
    </header>

    <div class="row">
      <div id="dailydarshan-all">
        <div v-for="(dd, index) in dailydarshan" class="col-xs-6 col-sm-4 col-md-2 col-lg-2">
          <a :href="dd.media_url">
            <div class="imgbox">
              <img :src="dd.media_url" class="category-banner img-responsive" />
              <span class="imgbox-desc">{{dd.caption | replace()}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <center>
        <a class="btn btn-primary" href="/media/gallery" style="width: 30%">See the gallery for more</a>
      </center>
    </div>
    <br />
    <br />
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
    $("#dailydarshan-all").lightGallery({
      gallery: true,
      selector: "a",
    });
  },
};
</script>
