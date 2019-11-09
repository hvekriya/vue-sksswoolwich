<template>
  <div>
    <!-- <div id="calendar"></div> -->
    <FullCalendar
      ref="fullCalendar"
      defaultView="listMonth"
      :header="header"
      :plugins="calendarPlugins"
      :events="events"
      :visibleRange="visibleRange"
    />
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
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [listPlugin, dayGridPlugin, googleCalendarPlugin],
      events: {
        googleCalendarId: "admin@bhujdham.org",
        googleCalendarApiKey: process.env.VUE_APP_GOOGLE_API_KEY
      },
      visibleRange: function(currentDate) {
        return {
          start: currentDate.clone().subtract(1, "days"),
          end: currentDate.clone().add(3, "days") // exclusive end, so 3
        };
      },
      header: {
        left: "listMonth, dayGridMonth",
        center: "title",
        right: "prev, next today"
      }
    };
  },
  mounted() {
    let calendarApi = this.$refs.fullCalendar.getApi();
  }
};
</script>
