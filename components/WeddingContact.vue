<template>
  <!-- START THE FEATURETTES -->
  <div class="row">
    <div class="contact-page">
      <header class="page-header">
        <h1>Get in touch now</h1>
      </header>
      <div class="col-md-8">
        <form
          name="wedding-hall"
          action="/thanks"
          method="post"
          netlify
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contactus" />

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
            <span class="form-group-addon" id="email">Email</span>
            <input
              type="text"
              class="form-control"
              name="email"
              placeholder="Your email"
              aria-describedby="email"
              required
            />
          </div>

          <div class="form-group">
            <span class="form-group-addon" id="phone-number">Phone number</span>
            <input
              type="text"
              class="form-control"
              name="phone-number"
              placeholder="Phone number"
              aria-describedby="phone-number"
              required
            />
          </div>

          <div class="form-group">
            <span class="form-group-addon" id="event-date">Event date</span>
            <input
              type="text"
              class="form-control"
              name="event-date"
              placeholder="Event date"
              aria-describedby="event-date"
              required
            />
          </div>

          <div class="form-group">
            <span class="form-group-addon" id="message">Message</span>
            <textarea
              type="text"
              class="form-control"
              name="message"
              placeholder="Any extra info"
              aria-describedby="message"
            />
          </div>

          <button type="submit" value="Send message" class="btn btn-primary">
            Send request
          </button>
        </form>

        <!-- <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScazA3UOEFfnCiPM7eaiE_BOGIcpbdfygDgOeqQleUQHGHwIg/viewform?embedded=true"
            width="100%"
            height="1000"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            >Loading...</iframe
          > -->
      </div>

      <div class="col-md-4">
        <legend>
          <span class="glyphicon glyphicon-map-marker"></span> Our Location
        </legend>
        <address>
          <strong>SKSS Temple Woolwich</strong>
          <br />
          St. Margarets Grove, <br />
          London, SE18 7RL
          <br />
          <!-- <abbr title="Phone">
                    P:</abbr>
                    <a href="tel:+4402034756869">020 3475 6869</a> -->
        </address>
        <address>
          <strong>Events Team</strong>
          <br />
          <a href="mailto:bookings@sksswoolwich.org"
            >bookings@sksswoolwich.org</a
          >
        </address>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeddingContact",
};
</script>
