<template>
  <div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import moment from "moment";

export default {
  name: "Calendar",
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        initialView: "listMonth",
        themeSystem: "bootstrap",
        height: "600px",
        plugins: [listPlugin, dayGridPlugin, googleCalendarPlugin],
        stickyHeaderDates: false,
        events: {
          googleCalendarApiKey: process.env.google_api_key,
          googleCalendarId: "admin@bhujdham.org",
        },
      },
    };
  },
  mounted() {
    let calendarApi = this.$refs.fullCalendar.getApi();
    calendarApi.today();
  },
};
</script>

<style lang="scss">
.fc-day-past {
  display: none;
}
.fc-event-past {
  display: none;
}
</style>
