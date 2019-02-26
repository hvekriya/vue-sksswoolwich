<template>
  <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation" id="header">
    <div class="container-fluid topnav">
      <div class="navbar-header animated fadeInDown">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </button>
        <a class="navbar-brand topnav hidden-md hidden-lg" href="/">SKSS Temple Woolwich</a>
      </div>
      <div class="collapse navbar-collapse animated fadeInDown" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-left">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle " data-toggle="dropdown" aria-expanded="false">Our Temple <i class="fa fa-angle-down"></i></a>
            <ul class="dropdown-menu multi-level" role="menu">
              <li><a href="/our-temple/daily-darshan">Daily Darshan</a></li>
              <li><a href="/our-temple/our-temple">Our Temple</a></li>
              <li><a href="/our-temple/past-events">History</a></li>
              <li><a href="/our-temple/murtis">Murtis</a></li>
              <li><a href="/our-temple/weekly-schedule">Weekly Schedule</a></li>
              <li><a href="/our-temple/calendar">Calendar</a></li>
              <li><a href="/our-temple/yuvak-mandal">Yuvak Mandal</a></li>
              <li><a href="/our-temple/swaminarayan-education">Swaminarayan Education</a></li>
              <li><a href="/our-temple/careers">Careers</a></li>
            </ul>
          </li>
          <li class="dropdown%}active{% endif %}">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Our Sampraday <i class="fa fa-angle-down"></i></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="/blog/post/swaminarayan-sampraday">Swaminarayan Sampraday</a></li>
              <li><a href="/articles/lord-swaminarayan">Lord Swaminarayan</a></li>
              <li><a href="/articles/satsang-philosophy">Satsang Philosophy</a></li>
              <li><a href="/articles/nand-santos">Nand Santos</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Media <i class="fa fa-angle-down"></i></a>
            <ul class="dropdown-menu" role="menu">
              <!-- <li><a href="/daily-darshan">Daily Darshan</a></li> -->
              <li><a href="https://www.facebook.com/pg/WoolwichTemple/photos/?tab=albums">Photo Gallery</a></li>
              <li><a href="http://listen.bhujmandir.org/" target="_blank" rel="noopener">Music Player</a></li>
              <!-- <li><a href="/wallpapers">Wallpapers</a></li> -->
            </ul>
          </li>

          <!-- <li> <a href="/utsav">Nutan Mandir</a> </li> -->
          <li>
            <router-link to="/blog">Mission Dharma Blog</router-link>
          </li>
          <li><a href="/wedding-hall">Wedding Hall</a></li>
          <li><a href="/nursery">Nursery</a></li>
          <li><a href="/donation">Donation</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>

        <ul class="hidden-md nav navbar-nav navbar-right socialbar">
          <li> <a class="social"><span class="network-name">Follow Us</span></a> </li>
          <li> <a href="https://www.facebook.com/WoolwichTemple/" class="social"><i class="fab fa-facebook-f"></i>
              <!-- <span class="network-name">Facebook</span> --> </a> </li>
          <li> <a href="https://www.twitter.com/WoolwichTemple/" class="social"><i class="fab fa-twitter"></i>
              <!-- <span class="network-name">Twitter</span> --></a> </li>
          <li> <a href="https://www.instagram.com/WoolwichTemple/" class="social"><i class="fab fa-instagram"></i>
              <!-- <span class="network-name">Instagram</span> --></a> </li>
          <li> <a href="https://www.youtube.com/woolwichtemple" class="social"><i class="fab fa-youtube"></i>
              <!-- <span class="network-name">YouTube</span>--> </a> </li>
          <li> <a href="tel:+447437001008" class="social whatsapp"><i class="fab fa-whatsapp"></i>
              <!-- <span class="network-name">YouTube</span>--> </a> </li>
          <!-- <li> <a href="https://www.snapchat.com/add/woolwichtemple" class="social"><i class="fab fa-snapchat-ghost"></i>
                        <span class="network-name">YouTube</span> </a> </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Header',

  }

</script>
