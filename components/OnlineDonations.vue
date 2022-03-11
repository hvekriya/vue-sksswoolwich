<template>
  <div>
    <h3>Online Donation</h3>
    <div>
      Make a secure online donation at any time, either one off donations or regular monthly donation.
      <br />
      <br />Click on Donate with PayPal to get started.
      <br />
      <br />Enter Donation Amount
      <br />
      <br />Select Type of Donation. E.g. Patotsav | Janmastmi | Diwali/Ankoot | Hindola | Dhanurmaas etc.
      <br />
      <br />Ensure the Gift Aid box is ticked if you’re a tax payer.
      <br />

      <!-- <h3>Online Fundraising:</h3>Why not try fundraising for Mandir and spread the word to friends and family to
      donate, by clicking on the create a Fundraiser page with MyDonate.-->

      <br />
      <br />

      <div class="row">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="TN9K7L42E2GRE" />
          <button
            class="btn btn-primary"
            type="submit"
            value="Donate with PayPal"
            border="0"
            name="submit"
            style="width:220px"
          >
            Donate with
            <img
              src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom-white.svg"
              alt="paypal logo"
              style="width: 80px; margin-left: 8px;"
            />
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnlineDonations",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>