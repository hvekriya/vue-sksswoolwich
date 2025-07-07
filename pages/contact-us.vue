<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Contact us</h1>
    </header>

    <div class="main-content-section">
      <div class="row contact-content-row">
        <div class="col-md-7 form-section">
          <h2 class="section-title">Send us a message</h2>
          <form
            name="contactus"
            action="/thanks"
            method="post"
            netlify
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contactus" />
            <p class="hidden">
              <label
                >Don’t fill this out if you’re human: <input name="bot-field"
              /></label>
            </p>

            <div class="form-group">
              <label for="name">Full name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                name="name"
                placeholder="Full name including surname"
                aria-describedby="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                name="email"
                placeholder="Your email"
                aria-describedby="email"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                class="form-control"
                name="message"
                placeholder="Your message or enquiry"
                aria-describedby="message"
                rows="6"
              />
            </div>

            <button type="submit" value="Send message" class="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>

        <div class="col-md-5 info-section">
          <h2 class="section-title">Our Details</h2>

          <div class="contact-card">
            <h3 class="card-title"><i class="fas fa-map-marker-alt"></i> Our Location</h3>
            <address>
              <strong>SKSS Temple Woolwich</strong><br />
              St. Margarets Grove,<br />
              London, SE18 7RL
            </address>
            <p class="link-text">
              <a
                href="https://maps.app.goo.gl/YourTempleGoogleMapsLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps <i class="fas fa-external-link-alt"></i>
              </a>
            </p>
          </div>

          <div class="contact-card">
            <h3 class="card-title"><i class="fas fa-envelope"></i> Admin Enquiries</h3>
            <address>
              Email:<br />
              <a href="mailto:info@sksswoolwich.org" class="link-email"
                >info@sksswoolwich.org</a
              >
            </address>
          </div>

          <div class="contact-card">
            <h3 class="card-title"><i class="fas fa-users"></i> Planning a Visit?</h3>
            <p>
              If you are planning to visit us in a big group then please use
              <a href="mailto:visits@sksswoolwich.org" class="link-email"
                >visits@sksswoolwich.org</a
              >
              to book your visit.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="map-section">
      <h2 class="section-title text-center">Find us on the map</h2>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.77391919869!2d0.0862085764024563!3d51.4729094717904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a87b1c4b22c7%3A0xc47e3a2c5a0a3b2b!2sShree%20Kutch%20Swaminarayan%20Temple%20(SKSS)%20Woolwich!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  head() {
    return {
      title: "Contact Us | SKSS Temple Woolwich",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Contact SKSS Temple Woolwich for enquiries, visits, or general information. Find our location and send us a message.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #8b184c;
$secondary-gray: #6c757d;
$light-gray-bg: #f8f9fa;
$dark-text: #343a40;
$border-color: #dee2e6;
$card-bg: #ffffff;

$font-heading: "Montserrat", sans-serif;
$font-body: "Open Sans", sans-serif;

/* Mixins for responsiveness */
@mixin media-breakpoint-up($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $breakpoint == xl {
    @media (min-width: 1200px) {
      @content;
    }
  }
}

/* --- General Page Structure --- */
.wrapper {
  padding-top: 50px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  font-family: $font-body;
  color: $dark-text;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

/* --- Page Header --- */
.page-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;

  h1 {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 700;
    color: $primary-solid-fallback;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background-color: $primary-solid-fallback;
    margin: 10px auto 0;
    border-radius: 2px;
  }
}

/* --- Main Content Section (Form & Info) --- */
.main-content-section {
  background-color: $card-bg;
  padding: 40px; // Default large padding
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;

  @media (max-width: 767px) {
    // Standard mobile padding for main content section
    padding: 25px;
    margin-bottom: 30px;
  }

  @media (max-width: 575px) {
    // Adjust padding for very small screens to fit content better
    padding: 20px 15px; // Reduced vertical and horizontal padding for phones
  }

  .contact-content-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    // Ensure no negative margins from row that could cause overflow on mobile
    margin-left: 0;
    margin-right: 0;
  }

  // Define column behavior for medium devices and up
  @media (min-width: 768px) {
    .col-md-7,
    .col-md-5 {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  // Ensure columns are full width on mobile, taking their padding from main-content-section
  @media (max-width: 767px) {
    .col-md-7,
    .col-md-5 {
      padding-left: 0; // Remove Bootstrap's default column padding
      padding-right: 0; // Remove Bootstrap's default column padding
      width: 100%; // Ensure they span full width
      max-width: 100%; // Ensure they span full width
      flex: 0 0 100%; // Flexbox property for full width
    }
  }

  .form-section,
  .info-section {
    // Add vertical spacing when columns stack on smaller screens
    @media (max-width: 991px) {
      margin-bottom: 30px;
    }
    @media (max-width: 767px) {
      margin-bottom: 25px;
    }
  }

  // Remove bottom margin from the last stacked column on mobile
  @media (max-width: 991px) {
    .col-md-5:last-child {
      margin-bottom: 0;
    }
  }

  .section-title {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    margin-bottom: 25px;
  }
}

/* --- Form Group Styling --- */
.form-group {
  margin-bottom: 25px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: $dark-text;
    font-size: 1.05rem;
  }
}

/* --- Form Control (Input/Textarea) Styling --- */
.form-control {
  display: block;
  width: 100%; // Crucial for filling the available space
  padding: 12px 15px;
  font-size: 1rem;
  line-height: 1.5;
  color: $dark-text;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid $border-color;
  border-radius: 8px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;

  &:focus {
    color: $dark-text;
    background-color: #fff;
    border-color: lighten($primary-solid-fallback, 20%);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba($primary-solid-fallback, 0.25);
  }

  &::placeholder {
    color: $secondary-gray;
    opacity: 0.7;
  }
}

/* --- Contact Info Cards --- */
.contact-card {
  background-color: lighten($border-color, 3%);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid $border-color;

  &:last-child {
    margin-bottom: 0;
  }

  .card-title {
    font-family: $font-heading;
    font-size: 1.25rem;
    font-weight: 600;
    color: $primary-solid-fallback;
    margin-top: 0;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    i {
      margin-right: 10px;
      font-size: 1.1em;
    }
  }

  address {
    margin-bottom: 10px;
    font-style: normal;
    line-height: 1.6;

    strong {
      display: block;
      margin-bottom: 5px;
    }
  }

  p {
    margin-bottom: 0;
    line-height: 1.6;
  }

  .link-text a,
  .link-email {
    color: $primary-solid-fallback;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: darken($primary-solid-fallback, 10%);
      text-decoration: underline;
    }

    i {
      margin-left: 5px;
      font-size: 0.8em;
    }
  }
}

/* --- Map Section --- */
.map-section {
  margin-top: 40px;
  margin-bottom: 50px;

  @media (max-width: 767px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .section-title {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    margin-bottom: 25px;
  }

  .map-container {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background-color: $card-bg;
    iframe {
      display: block;
      width: 100%;
      height: 450px;
      border: 0;
      @media (max-width: 767px) {
        height: 300px;
      }
    }
  }
}

/* --- Buttons --- */
.btn-primary {
  display: inline-block;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 8px;
  background-image: $primary-gradient;
  background-color: $primary-solid-fallback;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba($primary-solid-fallback, 0.2);
  margin-top: 15px;

  @media (max-width: 575px) {
    display: block;
    width: 100%;
    padding: 10px 20px;
    font-size: 1rem;
  }

  &:hover {
    background-image: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
    box-shadow: 0 6px 15px rgba($primary-solid-fallback, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    background-image: linear-gradient(
      to right,
      darken(#8b184c, 10%),
      darken(#da1b60, 10%)
    );
    box-shadow: 0 2px 5px rgba($primary-solid-fallback, 0.4);
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.hidden {
  display: none;
}
</style>
