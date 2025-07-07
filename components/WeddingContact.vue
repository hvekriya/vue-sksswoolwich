<template>
  <div class="main-content-section">
    <header class="page-header">
      <h1>Get in touch now</h1>
    </header>

    <div class="row contact-content-row">
      <div class="col-md-7 form-section">
        <h2 class="section-title">Enquiry Form</h2>
        <form
          name="wedding-hall"
          action="/thanks"
          method="post"
          netlify
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="wedding-hall" />
          <p class="hidden">
            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
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
            <label for="phone-number">Phone number</label>
            <input
              type="tel"
              id="phone-number"
              class="form-control"
              name="phone-number"
              placeholder="Phone number"
              aria-describedby="phone-number"
              required
            />
          </div>

          <div class="form-group">
            <label for="event-date">Event date</label>
            <input
              type="text"
              id="event-date"
              class="form-control"
              name="event-date"
              placeholder="DD/MM/YYYY or desired date"
              aria-describedby="event-date"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              class="form-control"
              name="message"
              placeholder="Any extra info or event details"
              aria-describedby="message"
              rows="6"
            />
          </div>

          <button type="submit" value="Send message" class="btn btn-primary">
            Send request
          </button>
        </form>
      </div>

      <div class="col-md-5 info-section">
        <h2 class="section-title">Contact Details</h2>

        <div class="contact-card">
          <h3 class="card-title"><i class="fas fa-map-marker-alt"></i> Our Location</h3>
          <address>
            <strong>SKSS Temple Woolwich</strong><br />
            St. Margarets Grove,<br />
            London, SE18 7RL
          </address>
        </div>

        <div class="contact-card">
          <h3 class="card-title"><i class="fas fa-envelope"></i> Events Team</h3>
          <address>
            Email:<br />
            <a href="mailto:bookings@sksswoolwich.org" class="link-email"
              >bookings@sksswoolwich.org</a
            >
          </address>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeddingContact",
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #da1b60;
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

/* --- Main Content Section (Component's main container) --- */
.main-content-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 40px; // Spacing when used in parent
  margin-bottom: 40px; // Spacing when used in parent
  font-family: $font-body;
  color: $dark-text;

  @media (max-width: 767px) {
    padding: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 575px) {
    padding: 20px 15px; // Reduced padding for very small screens
  }

  .page-header {
    text-align: center;
    margin-bottom: 30px;
    position: relative;

    h1 {
      font-family: $font-heading;
      font-size: 2.5rem; // Slightly smaller H1 for a component header
      font-weight: 700;
      color: $primary-solid-fallback;
      margin-bottom: 10px;
      line-height: 1.2;
    }

    &::after {
      content: "";
      display: block;
      width: 60px; // Slightly smaller underline
      height: 4px;
      background-color: $primary-solid-fallback;
      margin: 10px auto 30px; // Add bottom margin here
      border-radius: 2px;
    }
  }

  .contact-content-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-left: 0; // Remove Bootstrap's default negative margins
    margin-right: 0; // Remove Bootstrap's default negative margins
  }

  // Define column behavior for medium devices and up
  @media (min-width: 768px) {
    .col-md-7,
    .col-md-5 {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  // Ensure columns are full width on mobile, without Bootstrap's default inner padding
  @media (max-width: 767px) {
    .col-md-7,
    .col-md-5 {
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      max-width: 100%;
      flex: 0 0 100%;
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
    text-align: left; // Align titles within the sections
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
  }
}

/* --- Form Control (Input/Textarea) Styling --- */
.form-control {
  display: block;
  width: 100%;
  padding: 12px 15px;
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

/* --- Buttons --- */
.btn-primary {
  display: inline-block;
  padding: 12px 30px;
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
