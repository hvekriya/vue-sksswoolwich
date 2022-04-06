<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Weekly schedule</h1>
    </header>
    <div class="row">
      <WeeklySchedule :fields="fields" />
    </div>
  </div>
</template>

<script>
import WeeklySchedule from "../components/WeeklySchedule";
export default {
  name: "Activities",
  components: {
    WeeklySchedule,
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
};
</script>