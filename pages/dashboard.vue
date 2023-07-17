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
          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_type === 'images_slider'">
              <div class="iframe-container">
                <iframe
                  style="border: 1px solid rgba(0, 0, 0, 0.1)"
                  width="800"
                  height="450"
                  id="figma-frame"
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F34VQlVH9uW5nabviromCSY%2FPosters%3Fpage-id%3D4519%253A4342%26type%3Ddesign%26node-id%3D4519-4363%26viewport%3D1161%252C252%252C0.09%26t%3DKVzbBCeuAIBPlcLK-1%26scaling%3Dscale-down-width%26starting-point-node-id%3D4519%253A4433%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1"
                ></iframe>
              </div>

              <!-- %26hide-ui%3D1 at the end of figma src url hides figma UI-->
              <div class="iframe-container">
                <iframe
                  style="border: 1px solid rgba(0, 0, 0, 0.1)"
                  width="800"
                  height="450"
                  src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F34VQlVH9uW5nabviromCSY%2FPosters%3Fpage-id%3D4519%253A4342%26type%3Ddesign%26node-id%3D4519-4511%26viewport%3D1161%252C252%252C0.09%26t%3DKVzbBCeuAIBPlcLK-1%26scaling%3Dscale-down-width%26starting-point-node-id%3D4519%253A4433%26mode%3Ddesign%26hide-ui%3D1"
                ></iframe>
              </div>
            </template>
          </template>
        </div>
        <div class="col-md-6">
          <AnnouncementList
            id="announcements"
            style="overflow: auto; height: 700px"
          />
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "../components/CalendarList.vue";
import AnnouncementList from "../components/AnnouncementList.vue";
export default {
  layout: "dashboard",
  name: "Dashboard",
  components: {
    Calendar,
    AnnouncementList,
  },
  data() {
    return {};
  },
  async asyncData({ $prismic, error, $axios }) {
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
    this.onScroll();
  },

  methods: {
    onScroll() {
      var up = false;
      var div = document.getElementById("announcements");

      var interval = setInterval(function () {
        if (up) {
          div.scrollTop -= 1;
        } else {
          div.scrollTop += 1;
        }
        if (div.scrollTop === div.scrollHeight - div.clientHeight) {
          up = true;
        } else if (div.scrollTop === 0) {
          up = false;
        }
      }, 50);
    },
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

.iframe-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  margin-bottom: 25px;
  height: 0;
}
.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
