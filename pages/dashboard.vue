<template>
  <div class="wrapper container">
    <div class="row">
      <div class="col-md-6">
        <div>
          <header class="page-header">
            <h2>Weekly Activities</h2>
          </header>
          <WeeklySchedule :fields="fields" />
        </div>
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
        <header class="page-header">
          <h2>Utsav calendar</h2>
        </header>
        <Calendar />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "../components/CalendarList.vue";
import WeeklySchedule from "../components/WeeklySchedule.vue";
export default {
  layout: "dashboard",
  name: "Dashboard",
  components: { Calendar, WeeklySchedule },
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
      const document = await $prismic.api.getByUID("our-temple", "activities");
      return {
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
  .list-group-item {
    font-size: 20px;
    color: $primary;
    small {
      color: $gray-700;
    }
  }
}
</style>