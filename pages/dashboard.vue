<template>
  <div>
    <video id="background-video" autoplay loop muted>
      <source
        src="https://prismic-io.s3.amazonaws.com/sksswoolwich/cf0a62e4-39cf-4cdd-8524-fe796ad2807a_Dashboard-BG-Video.mp4"
        type="video/mp4"
      />
    </video>
    <div class="wrapper container-fluid">
      <div class="row" style="margin-top: 10px">
        <div class="col-md-6">
          <!-- Fixed posters -->

          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_label == 'weekly_activities'">
              <hooper
                :progress="false"
                :infiniteScroll="false"
                :autoPlay="true"
                :playSpeed="8000"
                :wheelControl="false"
                style="height: 100%; margin-bottom: 20px"
                class="hooper-slider"
              >
                <slide v-for="(item, index) in slice.items" :key="'photo-' + index">
                  <prismic-image
                    :field="item.image"
                    class="img-responsive dashboard-slider"
                  />
                </slide>
                <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
              </hooper>
            </template>
          </template>

          <!-- Pinned posters -->
          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_label == 'pinned_posters'">
              <hooper
                :progress="false"
                :infiniteScroll="false"
                :autoPlay="true"
                :playSpeed="8000"
                :wheelControl="false"
                style="height: 100%; margin-bottom: 20px"
                class="hooper-slider"
              >
                <slide v-for="(item, index) in slice.items" :key="'photo-' + index">
                  <prismic-image
                    :field="item.gallery_image"
                    class="img-responsive dashboard-slider"
                  />
                </slide>
                <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
              </hooper>
            </template>
          </template>
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
    return {};
  },
  async asyncData({ $prismic, error }) {
    try {
      // Get event data from Prismic
      const document = await $prismic.api.getSingle("dashboard");
      return {
        marqueeText: document.data.marquee_text,
        fields: {
          slices: document.data.body,
        },
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },

  mounted() {
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
.dashboard_layout {
  background: transparent;
}

.dashboard-slider {
  width: 100;
  height: auto;
  margin: auto;
  display: block;
}

#background-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}
</style>
