<template>
  <div>
    <div class="wrapper container-fluid">
      <div class="row">
        <div class="col-md-6">
          <header class="page-header">
            <h3>Activities</h3>
          </header>
          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_type === 'images_slider'">
              <hooper
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
              </hooper>
            </template>
          </template>
        </div>
        <div class="col-md-6">
          <header class="page-header">
            <h3>Announcements</h3>
          </header>
          <AnnouncementList />
          <!-- <Calendar /> -->
          <br />
          <br />
        </div>
      </div>
    </div>
    <marquee direction="left" behavior="scroll" scrollamount="4">
      <p>
        {{ $prismic.asText(marqueeText) }}
      </p>
    </marquee>
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
};
</script>

<style lang="scss" scoped>
marquee {
  position: fixed;
  bottom: 0%;
  background-color: $poster-red;
  color: white;
  padding: 8px;
  font-size: 16px;
}

.dashboard-slider {
  width: 100%;
  height: auto;
  margin: auto;
  display: block;
}
</style>