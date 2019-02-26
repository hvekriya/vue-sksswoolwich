<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Footer /> -->
  </div>
</template>

<script>
  // import Footer from './components/Footer.vue'
  import Header from './components/Header.vue'

  export default {
    name: 'App',
    components: {
      Header,
      // Footer
    }
  }

</script>

<style lang="sass">
  @import "./assets/styles/main.scss";

</style>
