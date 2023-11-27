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
            >Privacy Policy
          </router-link>
          <span style="margin-left: 4px; margin-right: 4px">|</span>
          <a
            href="https://prismic-io.s3.amazonaws.com/sksswoolwich/e1d9742d-a7ff-4fbc-bfdb-d2913465066c_Complaints+Policy+and+Procedures.pdf"
            target="_blank"
            >Complaints Policy and Procedures</a
          >
          <span style="margin-left: 4px; margin-right: 4px">|</span>
          <a
            href="https://prismic-io.s3.amazonaws.com/sksswoolwich/9f87356c-dc03-4175-8355-840a3cb6b7fd_SKSSTW+Complaints+Form.pdf"
            target="_blank"
            >Complaints Form</a
          >
          <span style="margin-left: 4px; margin-right: 4px">|</span>
          <a
            href="https://prismic-io.s3.amazonaws.com/sksswoolwich/4c041e32-62d7-440c-87eb-870b028bf3f9_Photography+and+Video+Policy.pdf"
            target="_blank"
            >Photography and Video Policy</a
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
