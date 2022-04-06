<template>
  <nav
    class="navbar navbar-default navbar-fixed-top topnav"
    role="navigation"
    id="header"
  >
    <div class="container-fluid topnav">
      <div class="navbar-header animated fadeInDown">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          v-bind:class="{ 'is-active': menuIsActive }"
          v-on:click="toggleNav"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </button>
        <a class="navbar-brand topnav" href="/">
          <img alt="Brand" class="brand" src="/img/WoolwichMandirLogo.png" />
        </a>
      </div>
      <div
        class="collapse navbar-collapse animated fadeInDown"
        id="bs-example-navbar-collapse-1"
      >
        <ul class="nav navbar-nav navbar-left">
          <li>
            <NuxtLink to="/" @click.native="$scrollToTop"
              ><fa :icon="['fas', 'house']" /> HOME
            </NuxtLink>
          </li>
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              :class="{
                'NuxtLink-exact-active': subIsActive('/our-temple'),
              }"
            >
              <fa :icon="['fas', 'circle-info']" /> OUR TEMPLE
            </a>
            <ul class="dropdown-menu multi-level" role="menu">
              <li>
                <NuxtLink
                  to="/our-temple/our-temple"
                  @click.native="$scrollToTop"
                  >ABOUT</NuxtLink
                >
              </li>
              <li>
                <a href="/our-temple/calendar">UTSAVS CALENDAR</a>
              </li>
              <li>
                <NuxtLink
                  to="/our-temple/yuvak-mandal"
                  @click.native="$scrollToTop"
                  >YUVAK MANDAL</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/our-temple/swaminarayan-education"
                  @click.native="$scrollToTop"
                >
                  SWAMINARAYAN EDUCATION
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/wedding-hall" @click.native="$scrollToTop"
                  >WEDDING HALL</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/our-temple/careers" @click.native="$scrollToTop"
                  >CAREERS</NuxtLink
                >
              </li>
            </ul>
          </li>
          <li>
            <NuxtLink to="/activities" @click.native="$scrollToTop">
              <fa :icon="['fas', 'table-list']" /> ACTIVITIES
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/events" @click.native="$scrollToTop">
              <fa :icon="['fas', 'calendar']" /> EVENTS
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/donate" @click.native="$scrollToTop">
              <fa :icon="['fas', 'heart']" /> DONATE
            </NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink to="/blog" @click.native="$scrollToTop">Blog</NuxtLink>
          </li> -->
          <li>
            <NuxtLink to="/contact-us" @click.native="$scrollToTop">
              <fa :icon="['fas', 'phone']" /> CONTACT US</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuIsActive: false,
    };
  },
  watch: {
    async $route() {
      // Collapse the navbar on click of menu item
      $("#bs-example-navbar-collapse-1").collapse("hide");
    },
  },
  methods: {
    toggleNav() {
      this.menuIsActive = !this.menuIsActive;
    },
    subIsActive(input) {
      console.log(input);
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0;
      });
    },
  },
};
</script>
