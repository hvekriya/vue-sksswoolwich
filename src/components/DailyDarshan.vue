<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <legend>
      <center>Insta Feed</center>
    </legend>
    <ul id="dailydarshan">
      <template v-for="(dd, index) in dailydarshan">
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
import axios from "axios";
export default {
  name: "DailyDarshan",
  data() {
    return {
      dailydarshan: null
    };
  },
  methods: {
    getInsta() {
      axios
        .get(
          `https://graph.facebook.com/v5.0/17841400662948582/media?fields=media_url%2Ctimestamp%2Cthumbnail_url%2Ccaption&access_token=${process.env.VUE_APP_FB_ACCESS}`
        )
        .then(response => {
          this.dailydarshan = response.data.data;
          //   this.loadNext = response.data.albums.paging.next;
          //   this.fb_albums = response.data.albums.data;
          //   this.fb_albums
          //     .map(item => item)
          //     .filter(item => {
          //       return (
          //         item.name !== "Timeline Photos" &&
          //         item.name !== "Mobile Uploads" &&
          //         item.name !== "Profile pictures"
          //       );
          //     })
          //     .map(item => {
          //       axios
          //         .get(
          //           `https://graph.facebook.com/v5.0/${item.id}?fields=photos.limit(4000)%7Bimages%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
          //         )
          //         .then(response => {
          //           const all_albums = response.data.photos.data.map(items => {
          //             return items.images;
          //           });
          //           const thumbnails = all_albums.map(nested =>
          //             nested.map(element => element)
          //           );
          //           this.isLoading = false;
          //           this.albums.push({
          //             link: `/media/gallery/album/${item.id}`,
          //             name: item.name,
          //             date: item.cover_photo.created_time,
          //             cover_photo: thumbnails[0][0].source
          //           });
          //         });
          //     });
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
};
</script>
