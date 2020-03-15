<template>
  <div class="wrapper container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-8">
        <div class="contact-map">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdjmyr18LtJcXbb2SQfA8ZjMV9u49zLbkztET8sURT-VqtI_w/viewform?embedded=true"
            width="100%"
            height="1200"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >Loading...</iframe>
        </div>
      </div>

      <div class="col-md-4">
        <form>
          <legend>
            <span class="glyphicon glyphicon-map-marker"></span> Our Location
          </legend>
          <address>
            <strong>SKSS Temple Woolwich</strong>
            <br />St. Margarets Grove,
            <br />London, SE18 7RL
            <br />
            <abbr title="Phone">P:</abbr>
            <a href="tel:+442088540823" itemprop="telephone">+442088540823</a>
          </address>
          <address>
            <strong>Admin</strong>
            <br />
            <a href="mailto:info@sksswoolwich.org">info@sksswoolwich.org</a>
          </address>
          <address>
            <strong>Visiting us?</strong>
            <br />
            <p>
              If you are planning to visit us in a big group then please use
              <a
                href="mailto:info@sksswoolwich.org"
              >visits@sksswoolwich.org</a> to book your visit.
            </p>
          </address>
        </form>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Donation"
};
</script>

<style>
iframe {
  background: white;
}
</style>
