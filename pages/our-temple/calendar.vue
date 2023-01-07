<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Utsavs calendar</h1>
    </header>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    <br />
    <br />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default {
  name: "CalendarFull",
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        plugins: [listPlugin, dayGridPlugin, googleCalendarPlugin],
        select: this.handleDateClick,
        stickyHeaderDates: false,
        events: {
          googleCalendarId:
            "c_1cb9e7ffe7dcf521b3845a216054ded6372636a8d55cca21b64b2477ccc261b6@group.calendar.google.com",
        },
        // validRange: {
        //   start: "2017-05-01",
        //   end: "2017-06-01",
        // },
        customButtons: {
          myCustomButton: {
            text: "Full page",
            click: () => this.$router.push({ path: "/our-temple/calendar" }),
          },
        },
        headerToolbar: {
          left: "prev",
          center: "title",
          right: "next",
        },
        footerToolbar: {
          left: "today listMonth dayGridMonth",
          center: "",
          right: "",
        },
      },
    };
  },
  methods: {
    handleDateClick: function (arg) {
      console.log("date click! " + arg.dateStr);
    },
  },
};
</script>
