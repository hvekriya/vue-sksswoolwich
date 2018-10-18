<template>
  <div id="app">
    <router-view></router-view>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from '@/components/nav'
export default {
  name: 'app',
  components: {
    Nav: Nav
  },
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1'}
    ]
  }
}
</script>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";
  @import "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js";
  @import "./assets/sass/libs/jquery.fb.albumbrowser.css";
  @import "https://use.fontawesome.com/releases/v5.4.1/css/all.css";
</style>

<style lang="scss">
  @import "./assets/sass/main.scss";
</style>
