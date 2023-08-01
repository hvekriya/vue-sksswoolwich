<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Ways to donate</h1>
    </header>

    <ul class="nav nav-pills">
      <li class="active">
        <a href="#1" data-toggle="tab">Online Donation</a>
      </li>
      <li>
        <a href="#2" data-toggle="tab">Bank Transfer</a>
      </li>
      <li>
        <a href="#3" data-toggle="tab">Standing Order</a>
      </li>
      <li>
        <a href="#4" data-toggle="tab">Cheque & Cash</a>
      </li>
      <li>
        <a href="#5" data-toggle="tab">Gift Aid</a>
      </li>
    </ul>

    <div class="tab-content clearfix active">
      <div class="tab-pane active" id="1">
        <h3>
          Online transfer via
          <img
            class="img-responsive"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c530.png"
            alt="PayPal Logo"
            style="display: inline; width: 20%"
          />
        </h3>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=QD9GCZ7PDY3XE"
          class="btn btn-primary"
        >
          Donate now</a
        >
      </div>
      <div class="tab-pane" id="2">
        <h3>Bank Transfer</h3>
        <div>
          Bank Transfer (BACS) can be accepted to the below Temple’s Bank
          Account:
          <h4>Bank Name:</h4>
          <code>Barclays Bank Plc</code>
          <h4>Bank Sort Code:</h4>
          <code>20-98-57</code>
          <h4>Bank Account Number:</h4>
          <code>80813745</code>
          <h4>SWIFT Code:</h4>
          <code>BARCGB22</code>
          <h4>IBAN Number:</h4>
          <code>GB23 BARC 2098 5780 8137 45</code>
          <h4>Reference:</h4>
          <code>Your Full name</code>
        </div>
      </div>
      <div class="tab-pane" id="3">
        <h3>Standing Order</h3>
        <div>
          For regular standing order donations on a monthly basis, you can setup
          a standing order via:
          <br />
          <br />Your Bank Branch using form below
          <br />
          <br />Your Bank Online Banking website using details below
          <br />
          <br />MyDonate (see Online Donation and selecting regular once logged
          in at MyDonate)
          <h3>Via Own Bank Branch:</h3>
          Please download and complete the
          <a
            href="https://prismic-io.s3.amazonaws.com/sksswoolwich/3fb4e9de-49a3-43b6-9696-35db02c3fc28_standing_order.pdf"
          >
            Standing Order Form
          </a>
          using the reference field as your own: DOOR NUMBER_POSTCODE_FIRSTNAME
          and send a copy to us at
          <code>
            <a href="mailto:donations@sksswoolwich.org"
              >donations@sksswoolwich.org</a
            >
          </code>
          <br />
          <br />
          <code>Important:</code> Take the bottom part of the form to your own
          bank to enable the standing order to be setup
          <h3>Via Online Banking:</h3>
          Use the Temple’s Bank Details on your own Online Banking website:
          <br />
          <br />Account Number: <code>80813745</code> Sort-Code:
          <code>20-98-57</code>
          <br />
          <br />Please quote your reference as: DOOR NUMBER_POSTCODE_FIRSTNAME
          <br />
          <br />
          <code>Important:</code> Ensure you complete the Gift Aid Form still as
          will help us as well.
        </div>
      </div>
      <div class="tab-pane" id="4">
        <h3>Cheque & Cash</h3>
        <div>
          Cheques can be made payable to ‘SKSS Temple SE London’ and handed or
          posted to ‘SKSS Temple, St Margarets Grove, Plumstead, London, SE18
          7RL’
          <br />
          <br />Include your full name, address and a contact number with the
          cheque if sending by post, so we can send receipt to you.
          <h3>Cash</h3>
          Cash can be accepted in person at SKSS Temple, St Margarets Grove,
          Plumstead, London, SE18 7RL
        </div>
      </div>
      <div class="tab-pane" id="5">
        <h3>Gift Aid</h3>

        <a
          href="/gift-aid-form"
          class="btn btn-secondary"
          >Complete the Gift Aid Form online</a
        >

        <br><br>

        <p>
        Alternatively you can download and complete the form here:
        <a
          href="https://prismic-io.s3.amazonaws.com/sksswoolwich/c4961f65-b640-4a81-ab64-0ace552c3c39_Gift+Aid+Form_v5.pdf"
          >Gift Aid Form</a
        >
        and send it to
        <code>
          <a href="mailto:donations@sksswoolwich.org"
            >donations@sksswoolwich.org</a
          > </code
        >, so we can claim back gift aid for all your donations.
        <br />
        <br />If you’re contact details or circumstances changes for tax
        purposes, please complete the
        <a
          href="https://prismic-io.s3.amazonaws.com/sksswoolwich/2e151f79-804f-42c8-8e44-722926e1f1e0_Gift+Aid+Alteration+Form.pdf"
        >
          Gift Aid Alteration Form
        </a>
        and send it to
        <code>
          <a href="mailto:donations@sksswoolwich.org"
            >donations@sksswoolwich.org</a
          >
        </code>
        <h3>Tax Benefits of Charitable Donations:</h3>
        There are various tax benefits of charitable donations, whether you are
        an individual, sole trader or limited company.
        <br />
        <br />Each has different requirements in order to qualify for tax relief
        under the Gift Aid Scheme, so please take a moment to take a look at our
        Tax Benefits of
        <a
          href="https://prismic-io.s3.amazonaws.com/sksswoolwich/f6a46186-d4ae-44de-9545-6c391587f1be_charitable_donations_tax_benefits.pdf"
        >
          Charitable Giving Leaflet
        </a>
        prepared specially for us by McBrides Chartered Accountants.</p>
      </div>
    </div>
  </div>
</template>

<script>
import OnlineDonations from "../components/OnlineDonations";
export default {
  name: "Donation",
  components: {
    OnlineDonations,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
