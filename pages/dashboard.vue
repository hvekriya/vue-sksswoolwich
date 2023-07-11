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
          <!-- <header class="page-header">
            <h3>Activities</h3>
          </header> -->
          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_type === 'images_slider'">
              <!-- <hooper
                :progress="true"
                :infiniteScroll="false"
                :autoPlay="true"
                :playSpeed="8000"
                :wheelControl="false"
                style="height: 100%"
                class="hooper-slider"
              >
                <slide
                  v-for="(item, index) in slice.items"
                  :key="'photo-' + index"
                >
                  <prismic-image
                    :field="item.image"
                    class="img-responsive dashboard-slider"
                  />
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
              </hooper> -->
              <iframe
                style="border: 1px solid rgba(0, 0, 0, 0.1)"
                width="800"
                height="450"
                id="figma-frame"
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F34VQlVH9uW5nabviromCSY%2FPosters%3Fpage-id%3D4519%253A4342%26type%3Ddesign%26node-id%3D4519-4363%26viewport%3D1161%252C252%252C0.09%26t%3DKVzbBCeuAIBPlcLK-1%26scaling%3Dscale-down-width%26starting-point-node-id%3D4519%253A4433%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1"
              ></iframe>

              <!-- %26hide-ui%3D1 at the end of figma src url hides figma UI-->

              <iframe
                style="border: 1px solid rgba(0, 0, 0, 0.1)"
                width="800"
                height="450"
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F34VQlVH9uW5nabviromCSY%2FPosters%3Fpage-id%3D4519%253A4342%26type%3Ddesign%26node-id%3D4519-4511%26viewport%3D1161%252C252%252C0.09%26t%3DKVzbBCeuAIBPlcLK-1%26scaling%3Dscale-down-width%26starting-point-node-id%3D4519%253A4433%26mode%3Ddesign%26hide-ui%3D1"
              ></iframe>
            </template>
          </template>
        </div>
        <div class="col-md-6">
          <AnnouncementList />
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "../components/CalendarList.vue";
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Navigation as HooperNavigation,
} from "hooper";
import "hooper/dist/hooper.css";
import AnnouncementList from "../components/AnnouncementList.vue";
export default {
  layout: "dashboard",
  name: "Dashboard",
  components: {
    Calendar,
    Hooper,
    Slide,
    HooperProgress,
    HooperNavigation,
    AnnouncementList,
  },
  data() {
    return {};
  },
  async asyncData({ $prismic, error, $axios }) {
    try {
      // Get event data from Prismic
      const document = await $prismic.api.getSingle("dashboard");

      // // Recently uploaded photos
      // const flickrConfig = {
      //   api_key: process.env.flickrApiKey,
      //   user_id: process.env.flickrUserId,
      //   format: "json",
      //   nojsoncallback: 1,
      // };

      // const flickrUrl = process.env.flickrUrl;
      // const unixTimeStamp = Math.floor(Date.now() / 1000);

      // const set = await $axios.get(flickrUrl, {
      //   params: {
      //     ...flickrConfig,
      //     method: "flickr.photos.search",
      //     min_date_upload: unixTimeStamp,
      //     per_page: 14,
      //     extras: "url_n, url_o, tags",
      //   },
      // });
      // const recentUploads = set.data.photos.photo;

      return {
        marqueeText: document.data.marquee_text,
        fields: {
          slices: document.data.body,
        },
        // recentUploads,
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard_layout {
  background: transparent;
}

.dashboard-slider {
  width: 100%;
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