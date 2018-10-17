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

<link rel="stylesheet" href="public/css/vendor/fullcalendar.min.css">
<link rel="stylesheet" href="public/css/vendor/jquery.fancybox.css">
<link rel="stylesheet" href="public/css/vendor/animate.css">
<link rel="stylesheet" href="public/css/vendor/jquery.fb.albumbrowser.css">
<link rel="stylesheet" href="public/css/vendor/nanogallery2.min.css"> -->
