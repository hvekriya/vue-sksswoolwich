<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Calendar</h1>
    </header>

    <Calendar />
    <br />
    <br />
  </div>
</template>

<script>
import Calendar from "../../components/Calendar";

export default {
  name: "CalendarFull",
  components: {
    Calendar
  },
};
</script>
