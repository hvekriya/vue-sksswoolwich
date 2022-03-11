<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
    <div itemscope itemtype="http://schema.org/OpeningHoursSpecification">
      <meta itemprop="openingHours" content="Mon-Fri Morning 7:00 - 11:00" />
      <meta itemprop="openingHours" content="Mon-Fri Evening 16:00 - 20:00" />

      <legend>
        <center>Mandir Darshan Timings</center>
      </legend>
      <table class="table table-striped">
        <thead>
          <tr class="highlighted-row">
            <th>Weekdays</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Morning Darshan</td>
            <td>From 7am - 10:30am</td>
            <td>Evening Darshan</td>
            <td>From 4pm</td>
          </tr>
          <tr>
            <td>Morning Aarti</td>
            <td>9:30am</td>
            <td>Evening Aarti</td>
            <td>7pm</td>
          </tr>
          <tr>
            <td>Morning Sabha</td>
            <td>9am - 10:30am</td>
            <td>Evening Sabha</td>
            <td>7pm - 8:30pm</td>
          </tr>
          <tr class="highlighted-row">
            <th>Weekend</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>Morning Darshan</td>
            <td>From 7am - 11am</td>
            <td>Evening Darshan</td>
            <td>From 4pm</td>
          </tr>
          <tr>
            <td>Morning Aarti</td>
            <td>9am</td>
            <td>Evening Aarti</td>
            <td>6pm</td>
          </tr>
          <tr>
            <td>Morning Sabha</td>
            <td>9am - 10:30am</td>
            <td>Evening Sabha</td>
            <td>6pm - 7:30pm</td>
          </tr>
        </tbody>
      </table>
      <small>
        <!--<p>Sunday with Thakarthali and Festival Days with Special Evening Prayers the Aarti time is 7:30PM<p>-->
        <p>
          Please note that on festival days the times may vary. Please contact
          the Temple if you need more information
        </p>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpeningTimes",
};
</script>

<style lang="sass" scoped>
tbody td:nth-child(odd)
  background-color: var(--fc-neutral-bg-color, rgba(208, 208, 208, 0.3))
</style>
