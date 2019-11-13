<template>
  <div>
    <!-- <div id="calendar"></div> -->
    <FullCalendar
      ref="fullCalendar"
      :defaultView="defaultView"
      :header="header"
      :footer="footer"
      :plugins="calendarPlugins"
      :events="events"
      :visibleRange="visibleRange"
      :custom-buttons="customButtons"
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
      defaultView: "listMonth",
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
      customButtons: {
        myCustomButton: {
          text: "Full page",
          click: () => this.$router.push({ name: "Calendar" })
        }
      },
      header: {
        left: "prev",
        center: "title",
        right: "next"
      },
      footer: {
        left: "today, listMonth, dayGridMonth",
        center: "",
        right: "myCustomButton"
      }
    };
  },
  mounted() {
    let calendarApi = this.$refs.fullCalendar.getApi();
  }
};
</script>
