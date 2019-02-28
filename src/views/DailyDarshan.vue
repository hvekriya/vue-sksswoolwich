<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Daily Darshan</h1>
    </header>

    <div class="row">
      <div id="dailydarshan-all">
        <template v-for="(dd, index) in dailydarshan">
          <a :href="dd.images.standard_resolution.url">
            <img :src="dd.images.thumbnail.url" style="margin:16px;" />
          </a>
        </template>
      </div>
    </div>
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
      $('#dailydarshan-all').lightGallery({
        gallery: true
      });
    },
  }

</script>
