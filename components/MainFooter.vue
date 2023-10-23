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
            <a itemprop="sameAs" href="https://www.facebook.com/WoolwichTemple/">
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
      <div class="row">
        <p class="text-center" style="padding: 15px">
          &copy; Shree Kutch Satsang Swaminarayan Temple Woolwich
          {{ new Date().getFullYear() }}
          | Registered Charity 292934
          <br />
          <router-link to="/our-temple/privacy-policy" @click.native="$scrollToTop"
            >Privacy Policy</router-link
          >
          <router-link
            href="https://prismic-io.s3.amazonaws.com/sksswoolwich/e1d9742d-a7ff-4fbc-bfdb-d2913465066c_Complaints+Policy+and+Procedures.pdf"
            target="_blank"
            @click.native="$scrollToTop"
            style="margin-left: 4px"
            >Complaints Policy & Procedures</router-link
          >
        </p>
        <img
          class="footerLogo"
          src="/img/WoolwichMandirLogo.png"
          width="10%"
          alt="WoolwichMandirLogo"
        />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>
