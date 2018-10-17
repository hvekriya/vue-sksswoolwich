<template>
  <div>
    <b-navbar type="dark" variant="info" toggleable>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    
      <b-navbar-brand href="/" class="d-sm-none d-lg-none">SKSS Woolwich</b-navbar-brand>
    
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item-dropdown text="Our Temple">
            <b-dropdown-item href="/our-temple">Our Temple</b-dropdown-item>
            <b-dropdown-item href="/history">History</b-dropdown-item>
            <b-dropdown-item href="/murtis">Murtis</b-dropdown-item>
            <b-dropdown-item href="/weekly-activities">Weekly Activities</b-dropdown-item>
            <b-dropdown-item href="/calendar">Calendar</b-dropdown-item>
            <b-dropdown-item href="/yuvak-mandal">Yuvak Mandal</b-dropdown-item>
            <b-dropdown-item href="/swaminarayan-education">Swaminarayan Education</b-dropdown-item>
            <!-- <b-dropdown-item href="/careers">Careers</b-dropdown-item> -->
          </b-nav-item-dropdown>
        </b-navbar-nav>
    
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item disabled>Follow us</b-nav-item>
          <b-nav-item href="https://www.facebook.com/WoolwichTemple/"><i class="fab fa-facebook-f"></i></b-nav-item>
          <b-nav-item href="https://www.twitter.com/WoolwichTemple/"><i class="fab fa-twitter"></i></b-nav-item>
          <b-nav-item href="https://www.instagram.com/WoolwichTemple/"><i class="fab fa-instagram"></i></b-nav-item>
          <b-nav-item href="https://www.youtube.com/woolwichtemple"><i class="fab fa-youtube"></i></b-nav-item>
          <b-nav-item href="tel:+447437001008"><i class="fab fa-whatsapp"></i></b-nav-item>
          <b-nav-item href="https://www.snapchat.com/add/woolwichtemple"><i class="fab fa-snapchat"></i></b-nav-item>
        </b-navbar-nav>
    
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Nav'
  }
</script>

<style>

</style>