<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Calendar</h1>
    </header>

    <UpcomingEvents/>
    <br>
    <br>
  </div>
</template>

<script>
import UpcomingEvents from "../../components/UpcomingEvents";

export default {
  name: "Calendar",
  components: {
    UpcomingEvents
  }
};
</script>
