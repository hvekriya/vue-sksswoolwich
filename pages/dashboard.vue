<template>
  <div>
    <div class="wrapper container-fluid">
      <div class="row">
        <div class="col-md-6">
          <header class="page-header">
            <h2>Activities</h2>
          </header>
          <template v-for="(slice, index) in fields.slices">
            <template v-if="slice.slice_type === 'images_slider'">
              <hooper
                :progress="true"
                :infiniteScroll="false"
                :autoPlay="true"
                :playSpeed="4000"
                :wheelControl="false"
                style="height: 100%"
              >
                <slide
                  v-for="(item, index) in slice.items"
                  :key="'photo-' + index"
                >
                  <prismic-image :field="item.image" class="img-responsive" />
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
              </hooper>
            </template>
          </template>
          <img
            src="https://images.prismic.io/sksswoolwich/438225dd-fd4b-46cb-85ad-e15a9d4ecf62_PGPM+Banner.png?auto=compress,format"
            alt="premras"
            class="img-responsive"
          />
          <br />
          <br />
        </div>
        <div class="col-md-6">
          <header class="page-header">
            <h2>Annoucements</h2>
          </header>
          <ul class="list-group">
            <li
              class="list-group-item"
              :class="{ active: index == currentIndex }"
              v-for="(annoucement, index) in announcements"
              :key="index"
            >
              {{ annoucement.title }}
              <br />
              <small>{{ annoucement.description }}</small>
            </li>
          </ul>
          <Calendar />
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
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  layout: "dashboard",
  name: "Dashboard",
  components: { Calendar, Hooper, Slide, HooperNavigation },
  data() {
    return {
      announcements: [],
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(items) {
      let _announcements = [];
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _announcements.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.announcements = _announcements;
    },
    refreshList() {
      this.currentAnnouncements = null;
      this.currentIndex = -1;
    },
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
    this.$fire.database.ref("/annoucements").on("value", this.onDataChange);
  },
  beforeDestroy() {
    this.$fire.database.ref("/annoucements").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin: 0;
  margin-bottom: 20px;
  .list-group-item {
    font-size: 20px;
    color: $white;
    border-radius: 4;
    margin: 4px;
    background: $main-gradiant;
    small {
      color: $gray-200;
    }
  }
}
marquee {
  position: fixed;
  bottom: 0%;
  background-color: $poster-red;
  color: white;
  padding: 8px;
  font-size: 16px;
}
</style>