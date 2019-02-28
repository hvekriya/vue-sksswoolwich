<template>
  <div class="wrapper container">
    <header class="page-header">
      <!-- <h1>Contact Us</h1> -->
    </header>
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <a type="button" class="close" aria-label="Close" href="/"><span aria-hidden="true">&times;</span></a>
            <h4 class="modal-title">Jay Shree Swaminarayan</h4>
          </div>
          <div class="modal-body">
            <p>Your form was submmited.</p>
          </div>
          <div class="modal-footer">
            <a type="button" class="btn btn-default" href="/">Close</a>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="row">
      <div class="col-md-8">
        <div class="contact-map">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdjmyr18LtJcXbb2SQfA8ZjMV9u49zLbkztET8sURT-VqtI_w/viewform?embedded=true"
            width="100%" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading...
          </iframe>
        </div>
      </div>

      <div class="col-md-4">
        <form>
          <legend><span class="glyphicon glyphicon-map-marker"></span> Our Location</legend>
          <address>
            <strong>SKSS Temple Woolwich</strong><br>
            St. Margarets Grove,<br>
            London, SE18 7RL<br>
            <abbr title="Phone">
              P:</abbr>
            <a href="tel:+442088540823" itemprop="telephone">+442088540823</a>
          </address>
          <address>
            <strong>Admin</strong><br>
            <a href="mailto:info@sksswoolwich.org">info@sksswoolwich.org</a>
          </address>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="well well-sm">
          <div class="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.6453562534543!2d0.07314551568701687!3d51.48302367963115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a8dcb1090817%3A0x7f680ca13d5a3426!2sSwaminarayan+Temple!5e0!3m2!1sen!2suk!4v1482005105620"
              frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="width: 100%; height: 360px;"></iframe>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <legend><span class="glyphicon glyphicon-time"></span> Opening Times</legend>
        <table class="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Aarti Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mon - Sun [Morning]</td>
              <td>07:00 AM</td>
              <td>11:00 AM</td>
              <td>09:30 AM</td>
            </tr>
            <tr>
              <td>Mon - Sun [Evening]</td>
              <td>04:00 PM</td>
              <td>08:00 PM</td>
              <td>06:00 PM</td>
            </tr>
          </tbody>
        </table> <small>
          <!--<p>Sunday with Thakarthali and Festival Days with Special Evening Prayers the Aarti time is 7:30PM<p>-->
          <p>Please note that on festival days the times may vary. Please contact the Temple if you need more
            information</p>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Donation'
  }

</script>
