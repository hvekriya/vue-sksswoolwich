<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Daily Darshan</center>
    </legend>
    <ul id="dailydarshan">
      <template v-for="(dd, index) in dailydarshan">
        <li :data-thumb="dd.images.thumbnail.url" :data-src="dd.images.standard_resolution.url">
          <img :src="dd.images.standard_resolution.url" style="width:100%" :alt="dd.caption.text | replace()" />
          <div class="dd-caption"><span>{{ dd.caption.text | replace() }}</span></div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'DailyDarshan',
    data() {
      return {
        access_token: '549270098.1677ed0.9f232fea9d4f4540a86093cc2496df4b',
        insta_api: 'https://api.instagram.com/v1/users/self/media/recent/',
        dailydarshan: null
      }
    },
    methods: {
      getInsta() {
        axios.get(this.insta_api + "?access_token=" + this.access_token)
          .then(({
            data
          }) => {
            this.dailydarshan = data.data
              .map(posts => posts)
              .filter(image => image.tags.includes('dailydarshan'))
          })
          .catch(function (error) {
            console.log(error)
            this.error = true
          });
      }
    },
    created() {
      this.getInsta()
    },
    filters: {
      replace: function (value) {
        return value.replace("#DailyDarshan", "")
      }
    },
    updated() {
      $('#dailydarshan').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////
        speed: 600, //ms'
        auto: true,
        slideEndAnimation: true,
        pause: 2000,
        onSliderLoad: function (el) {
          el.lightGallery({
            selector: '#dailydarshan .lslide'
          });
        }
      });
    }
  }

</script>
