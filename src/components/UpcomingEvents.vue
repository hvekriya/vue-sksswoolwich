<template>
  <div>
    <header class="page-header">
      <h2>Upcoming events</h2>
    </header>
    <div class="row">
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "UpcomingEvents",
  data() {
    return {
      events: null
    };
  },
  created() {
    axios
      .get(
        `https://graph.facebook.com/v5.0/216354315082607/events?access_token=${process.env.VUE_APP_FB_ACCESS}`
      )
      .then(response => {
        console.log(response);
      });
  }
};
</script>
