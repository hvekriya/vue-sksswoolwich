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
            <router-link to="/" @click.native="$scrollToTop">Home</router-link>
          </li>
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              :class="{
                'router-link-exact-active': subIsActive('/our-temple'),
              }"
            >
              Our Temple
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu multi-level" role="menu">
              <li>
                <router-link
                  to="/our-temple/our-temple"
                  @click.native="$scrollToTop"
                  >About</router-link
                >
              </li>
              <!-- <li><a href="/our-temple/past-events">History</a></li> -->
              <li>
                <router-link
                  to="/our-temple/murtis"
                  @click.native="$scrollToTop"
                  >Murtis</router-link
                >
              </li>
              <li>
                <router-link
                  to="/our-temple/weekly-schedule"
                  @click.native="$scrollToTop"
                  >Weekly Schedule</router-link
                >
              </li>
              <li>
                <a href="/our-temple/calendar">Calendar</a>
              </li>
              <li>
                <router-link
                  to="/our-temple/yuvak-mandal"
                  @click.native="$scrollToTop"
                  >Yuvak Mandal</router-link
                >
              </li>
              <li>
                <router-link
                  to="/our-temple/swaminarayan-education"
                  @click.native="$scrollToTop"
                >
                  Swaminarayan Education
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/our-temple/careers" @click.native="$scrollToTop">Careers</router-link>
              </li>-->
            </ul>
          </li>
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              :class="{
                'router-link-exact-active': subIsActive('/our-sampraday'),
              }"
            >
              Our Sampraday
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <router-link
                  to="/our-sampraday/articles/swaminarayan-sampraday"
                  @click.native="$scrollToTop"
                >
                  Swaminarayan Sampraday
                </router-link>
              </li>
              <li>
                <router-link
                  to="/our-sampraday/lord-swaminarayan"
                  @click.native="$scrollToTop"
                  >Lord Swaminarayan</router-link
                >
              </li>
              <li>
                <router-link
                  to="/our-sampraday/satsang-philosophy"
                  @click.native="$scrollToTop"
                  >Satsang Philosophy</router-link
                >
              </li>
              <li>
                <router-link
                  to="/our-sampraday/nand-santos"
                  @click.native="$scrollToTop"
                  >Nand Santos</router-link
                >
              </li>
              <li>
                <router-link
                  to="/our-sampraday/devotees"
                  @click.native="$scrollToTop"
                  >Great Devotees</router-link
                >
              </li>
            </ul>
          </li>
          <!-- <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              :class="{ 'router-link-exact-active': subIsActive('/media') }"
            >
              Media
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <router-link
                  to="/media/daily-darshan"
                  @click.native="$scrollToTop"
                  >Daily Darshan</router-link
                >
              </li>
              <li>
                <a href="/media/gallery">Photo Gallery</a>
              </li>
              <li>
                <a
                  href="http://listen.bhujmandir.org/"
                  target="_blank"
                  rel="noopener"
                  >Music Player</a
                >
              </li>
            </ul>
          </li> -->
          <li>
            <router-link to="/blog" @click.native="$scrollToTop"
              >Blog</router-link
            >
          </li>
          <li>
            <router-link to="/wedding-hall" @click.native="$scrollToTop"
              >Wedding Hall</router-link
            >
          </li>
          <li>
            <a href="https://balkrishna.org">Nursery</a>
          </li>
          <li>
            <router-link to="/contact-us" @click.native="$scrollToTop"
              >Contact Us</router-link
            >
          </li>
        </ul>

        <ul class="hidden-md nav navbar-nav navbar-right socialbar">
          <li>
            <router-link to="/donate" @click.native="$scrollToTop">
              Donate
              <i class="fas fa-heart"></i>
            </router-link>
          </li>
          <!-- <li>
            <a class="social">
              <span class="network-name">Follow Us</span>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/WoolwichTemple/" class="social">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/WoolwichTemple/" class="social">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/WoolwichTemple/" class="social">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/woolwichtemple" class="social">
              <i class="fab fa-youtube"></i>
            </a>
          </li>-->
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
