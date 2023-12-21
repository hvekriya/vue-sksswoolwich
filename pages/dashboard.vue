<template>
  <div>
    <div class="wrapper container-fluid">
      <div class="row" style="margin-top: 10px">
        <div class="col-md-6">
          <!-- Fixed posters -->
          <hooper
            :progress="false"
            :infiniteScroll="false"
            :autoPlay="true"
            :playSpeed="8000"
            :wheelControl="false"
            style="height: 100%; margin-bottom: 20px"
            class="hooper-slider"
          >
            <slide v-for="(item, index) in slideshow" :key="'photo-' + index">
              <img :src="item" class="img-responsive dashboard-slider" />
            </slide>
            <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
          </hooper>

          <hooper
            :progress="false"
            :infiniteScroll="false"
            :autoPlay="true"
            :playSpeed="8000"
            :wheelControl="false"
            style="height: 100%; margin-bottom: 20px"
            class="hooper-slider"
          >
            <slide v-for="(item, index) in pinnedPosters" :key="'photo-' + index">
              <img :src="item" class="img-responsive dashboard-slider" />
            </slide>
            <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
          </hooper>
        </div>
        <div class="col-md-6">
          <AnnouncementList id="announcements" style="overflow: auto; height: 700px" />
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnnouncementList from "../components/AnnouncementList.vue";
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Navigation as HooperNavigation,
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  layout: "dashboard",
  name: "Dashboard",
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperNavigation,
    AnnouncementList,
  },
  data() {
    return {
      slideshow: [],
      pinnedPosters: [],
    };
  },
  // async asyncData({ $prismic, error }) {
  //   try {
  //     // Get event data from Prismic
  //     const document = await $prismic.api.getSingle("dashboard");
  //     return {
  //       marqueeText: document.data.marquee_text,
  //       fields: {
  //         slices: document.data.body,
  //       },
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     error({ statusCode: 404, message: "Page not found" });
  //   }
  // },

  methods: {
    getSlideshow() {
      // Get firebase images
      const fireStorage = this.$fire.storage.ref("slideshow/");
      fireStorage
        .listAll()
        .then((res) => {
          let _slideshow = [];
          res.items.forEach((itemRef) => {
            this.$fire.storage
              .ref(itemRef.fullPath)
              .getDownloadURL()
              .then((url) => {
                _slideshow.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          this.slideshow = _slideshow;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPinnedPosters() {
      // Get firebase images
      const fireStorage = this.$fire.storage.ref("pinned-posters/");
      fireStorage
        .listAll()
        .then((res) => {
          let _pinnedPosters = [];
          res.items.forEach((itemRef) => {
            this.$fire.storage
              .ref(itemRef.fullPath)
              .getDownloadURL()
              .then((url) => {
                _pinnedPosters.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          this.pinnedPosters = _pinnedPosters;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.getSlideshow();
    this.getPinnedPosters();
    $(document).ready(function () {
      var up = false;
      var lastPosition;

      var interval = setInterval(function () {
        var $container = $("#announcements");
        var position = $container.scrollTop();
        var height = $container[0].scrollHeight;

        // If we haven't moved, switch direction
        if (position === lastPosition) up = !up;
        lastPosition = position;

        if (up) {
          // Going up
          $container.animate({ scrollTop: position - 10 });
        } else {
          // Going down
          $container.animate({ scrollTop: position + 10 });
        }
      }, 800);
    });
  },
};
</script>

<style lang="scss" scoped>
.dashboard-slider {
  width: 100;
  height: auto;
  margin: auto;
  display: block;
}
</style>
