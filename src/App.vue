<template>
  <div id="app">
    <Header />
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
  import Footer from './components/MainFooter'
  import Header from './components/Header'

  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    watch: {
      '$route'() {
        $('#bs-example-navbar-collapse-1').collapse('hide');
      }
    }
  }

</script>

<style lang="sass">
  @import "./assets/styles/main.scss";

</style>

<style>
  #app {
    margin-top: 50px;
  }

  .wrapper {
    margin-left: auto;
    margin-right: auto;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .title {
    font-size: 32px;
  }

  .description {
    margin-top: 40px;
  }

  .description h2 {
    font-size: 24px;
  }

  .description h2:not(:first-child) {
    margin-top: 20px;
  }

  .description p {
    line-height: 1.5;
  }

  .description p:not(:first-child) {
    margin-top: 10px;
  }

  .description a {
    color: #404e9f;
  }

  .description a:hover {
    text-decoration: underline;
  }

  .cta-wrapper {
    margin-top: 40px;
  }

  .cta {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    background-color: #404e9f;
    color: white;
  }

  .icon-wrapper {
    margin-top: 40px;
  }

  .icon {
    max-width: 100%;
  }

</style>
