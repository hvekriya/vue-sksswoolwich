<template>
  <footer id="footer" class="footer">
    <div id="contact" class="contact">
      <div class="container">
        <h2>Follow us for all the updates!</h2>
        <ul
          class="list-inline list-social"
          itemscope
          itemtype="http://schema.org/Organization"
        >
          <li class="social">
            <a
              itemprop="sameAs"
              href="https://www.facebook.com/WoolwichTemple/"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li class="social">
            <a
              itemprop="sameAs"
              href="https://www.twitter.com/WoolwichTemple/"
              rel="noopener"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="social">
            <a
              itemprop="sameAs"
              href="https://www.instagram.com/WoolwichTemple/"
              rel="noopener"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li class="social">
            <a
              itemprop="sameAs"
              href="https://www.youtube.com/woolwichtemple"
              rel="noopener"
            >
              <i class="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="copy-right">
      <Map />
      <div class="row">
        <p class="text-center" style="padding: 15px">
          &copy; Shree Kutch Satsang Swaminarayan Temple Woolwich
          {{ new Date().getFullYear() }}
          <br />
          <router-link
            to="/our-temple/privacy-policy"
            @click.native="$scrollToTop"
            >Privacy Policy</router-link
          >
        </p>
        <a
          href="https://www.sksswoolwich.org/our-sampraday/stories/story-clues"
        >
          <img
            class="footerLogo"
            src="/img/WoolwichMandirLogo.png"
            width="10%"
            alt="WoolwichMandirLogo"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import Map from "../components/Map";
export default {
  name: "MainFooter",
  components: {
    Map,
  },
};
</script>
