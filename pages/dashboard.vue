<template>
  <div>
    <div class="wrapper container-fluid">
      <div class="row" style="margin-top: 10px">
        <div class="col-md-6">
          <!-- <header class="page-header">
            <h3>Activities</h3>
          </header> -->
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

          <header class="page-header" style="margin-top: 15px">
            <h4>
              Photos from our recent event | View all at
              www.sksswoolwich.org/events/past
            </h4>
          </header>
          <hooper
            :itemsToShow="3"
            :progress="true"
            :infiniteScroll="true"
            :autoPlay="true"
            :playSpeed="8000"
            :wheelControl="false"
            style="height: 100%"
            class="hooper-slider"
          >
            <slide v-for="photo in recentUploads" v-bind:key="photo.id">
              <img :src="photo.url_o" class="category-banner img-responsive" />
            </slide>
          </hooper>
        </div>
        <div class="col-md-6">
          <!-- <header class="page-header">
            <h3>Announcements</h3>
          </header> -->
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
  async asyncData({ $prismic, error, $axios }) {
    try {
      // Get event data from Prismic
      const document = await $prismic.api.getSingle("dashboard");

      // Recently uploaded photos
      const flickrConfig = {
        api_key: process.env.flickrApiKey,
        user_id: process.env.flickrUserId,
        format: "json",
        nojsoncallback: 1,
      };

      const flickrUrl = process.env.flickrUrl;
      const unixTimeStamp = Math.floor(Date.now() / 1000);

      const set = await $axios.get(flickrUrl, {
        params: {
          ...flickrConfig,
          method: "flickr.photos.search",
          min_date_upload: unixTimeStamp,
          per_page: 14,
          extras: "url_n, url_o, tags",
        },
      });
      const recentUploads = set.data.photos.photo;

      return {
        marqueeText: document.data.marquee_text,
        fields: {
          slices: document.data.body,
        },
        recentUploads,
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