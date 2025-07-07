<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Ways to donate</h1>
    </header>

    <div class="main-content-section">
      <ul class="nav-tabs-custom">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ 'is-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <a :href="`#${tab.id}`">{{ tab.title }}</a>
        </li>
      </ul>

      <div class="tab-content-custom">
        <div class="tab-pane-custom" v-show="activeTab === 'bank-transfer'">
          <h3 class="tab-pane-title">Bank Transfer</h3>
          <p>Bank Transfer (BACS) can be accepted to the below Temple’s Bank Account:</p>
          <div class="bank-details">
            <div class="detail-item">
              <h4>Bank Name:</h4>
              <p><code>Barclays Bank Plc</code></p>
            </div>
            <div class="detail-item">
              <h4>Bank Sort Code:</h4>
              <p><code>20-98-57</code></p>
            </div>
            <div class="detail-item">
              <h4>Bank Account Number:</h4>
              <p><code>80813745</code></p>
            </div>
            <div class="detail-item">
              <h4>Account name:</h4>
              <p>
                <code>S K S Swaminarayan Temple - South East London</code>
              </p>
            </div>
            <div class="detail-item">
              <h4>SWIFT Code:</h4>
              <p><code>BARCGB22</code></p>
            </div>
            <div class="detail-item">
              <h4>IBAN Number:</h4>
              <p><code>GB23 BARC 2098 5780 8137 45</code></p>
            </div>
            <div class="detail-item">
              <h4>Reference:</h4>
              <p><code>Full name - type of donation</code></p>
            </div>
          </div>
        </div>

        <div class="tab-pane-custom" v-show="activeTab === 'online-donation'">
          <h3 class="tab-pane-title">Online Donation</h3>
          <p>You can make an online donation securely via Stripe:</p>
          <div class="stripe-button-container">
            <script async src="https://js.stripe.com/v3/buy-button.js"></script>
            <stripe-buy-button
              buy-button-id="buy_btn_1OtTX8H14DOHzSLbbZ0WNNT6"
              publishable-key="pk_live_51OoPISH14DOHzSLboCq5Dnnp5NSc9we8f0IPBYktNd6EU0g3rade9ajvECEaphSVMhdrdrRVmP16LV51W42YvNJ800pusyxm5X"
            >
            </stripe-buy-button>
          </div>
          <p class="small-text">
            For larger or recurring donations, please consider our Bank Transfer or
            Standing Order options.
          </p>
        </div>

        <div class="tab-pane-custom" v-show="activeTab === 'standing-order'">
          <h3 class="tab-pane-title">Standing Order</h3>
          <p>
            For regular standing order donations on a monthly basis, you can set up a
            standing order via:
          </p>
          <ul class="styled-list">
            <li>Your Bank Branch using form below</li>
            <li>Your Bank Online Banking website using details below</li>
          </ul>

          <h4 class="sub-heading">Via Own Bank Branch:</h4>
          <p>
            Please download and complete the
            <a
              href="https://prismic-io.s3.amazonaws.com/sksswoolwich/3fb4e9de-49a3-43b6-9696-35db02c3fc28_standing_order.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="link-download"
            >
              Standing Order Form <i class="fas fa-download"></i>
            </a>
            using the reference field as your own:
            <strong>DOOR NUMBER_POSTCODE_FIRSTNAME</strong> and send a copy to us at
            <a href="mailto:donations@sksswoolwich.org" class="link-email"
              >donations@sksswoolwich.org</a
            >.
          </p>
          <p class="important-note">
            <strong>Important:</strong> Take the bottom part of the form to your own bank
            to enable the standing order to be setup.
          </p>

          <h4 class="sub-heading">Via Online Banking:</h4>
          <p>Use the Temple’s Bank Details on your own Online Banking website:</p>
          <p class="bank-details-inline">
            Account Number: <code>80813745</code> <br class="mobile-break" />Sort-Code:
            <code>20-98-57</code>
          </p>
          <p>
            Please quote your reference as:
            <strong>DOOR NUMBER_POSTCODE_FIRSTNAME</strong>.
          </p>
          <p class="important-note">
            <strong>Important:</strong> Ensure you complete the Gift Aid Form still as
            will help us as well.
          </p>
        </div>

        <div class="tab-pane-custom" v-show="activeTab === 'cheque-cash'">
          <h3 class="tab-pane-title">Cheque & Cash</h3>
          <h4 class="sub-heading">Cheque:</h4>
          <p>
            Cheques can be made payable to ‘SKSS Temple SE London’ and handed or posted
            to:
            <br />
            <strong>SKSS Temple, St Margarets Grove, Plumstead, London, SE18 7RL</strong>.
          </p>
          <p>
            Include your full name, address and a contact number with the cheque if
            sending by post, so we can send receipt to you.
          </p>

          <h4 class="sub-heading">Cash:</h4>
          <p>
            Cash can be accepted in person at:
            <br />
            <strong>SKSS Temple, St Margarets Grove, Plumstead, London, SE18 7RL</strong>.
          </p>
        </div>

        <div class="tab-pane-custom" v-show="activeTab === 'gift-aid'">
          <h3 class="tab-pane-title">Gift Aid</h3>
          <p>
            If you are a UK taxpayer, Gift Aid allows the Temple to reclaim an extra 25p
            for every £1 you donate, at no extra cost to you.
          </p>
          <a href="/gift-aid-form" class="btn btn-primary"
            >Complete the Gift Aid Form online</a
          >

          <p class="or-separator">Alternatively, you can:</p>

          <p>
            Download and complete the form here:
            <a
              href="https://prismic-io.s3.amazonaws.com/sksswoolwich/c4961f65-b640-4a81-ab64-0ace552c3c39_Gift+Aid+Form_v5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="link-download"
            >
              Gift Aid Form <i class="fas fa-download"></i>
            </a>
            and send it to
            <a href="mailto:donations@sksswoolwich.org" class="link-email"
              >donations@sksswoolwich.org</a
            >, so we can claim back Gift Aid for all your donations.
          </p>
          <p>
            If your contact details or circumstances change for tax purposes, please
            complete the
            <a
              href="https://prismic-io.s3.amazonaws.com/sksswoolwich/2e151f79-804f-42c8-8e44-722926e1f1e0_Gift+Aid+Alteration+Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="link-download"
            >
              Gift Aid Alteration Form <i class="fas fa-download"></i>
            </a>
            and send it to
            <a href="mailto:donations@sksswoolwich.org" class="link-email"
              >donations@sksswoolwich.org</a
            >.
          </p>

          <h4 class="sub-heading">Tax Benefits of Charitable Donations:</h4>
          <p>
            There are various tax benefits of charitable donations, whether you are an
            individual, sole trader or limited company.
          </p>
          <p>
            Each has different requirements in order to qualify for tax relief under the
            Gift Aid Scheme, so please take a moment to take a look at our
            <a
              href="https://prismic-io.s3.amazonaws.com/sksswoolwich/f6a46186-d4ae-44de-9545-6c391587f1be_charitable_donations_tax_benefits.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="link-download"
            >
              Tax Benefits of Charitable Giving Leaflet <i class="fas fa-download"></i>
            </a>
            prepared specially for us by McBrides Chartered Accountants.
          </p>
        </div>

        <div class="tab-pane-custom" v-show="activeTab === 'new-donor-registration'">
          <h3 class="tab-pane-title">New donor registration</h3>
          <p>If you are a new donor, please register your details with us:</p>
          <a href="/new-donor-registration-form" class="btn btn-primary"
            >New donor registration form</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donation",
  data() {
    return {
      activeTab: "bank-transfer", // Set the initially active tab
      tabs: [
        { id: "bank-transfer", title: "Bank Transfer" },
        { id: "online-donation", title: "Online Donation" },
        { id: "standing-order", title: "Standing Order" },
        { id: "cheque-cash", title: "Cheque & Cash" },
        { id: "gift-aid", title: "Gift Aid" },
        { id: "new-donor-registration", title: "New Donor Registration" },
      ],
    };
  },
  head() {
    return {
      title: "Ways to Donate | SKSS Temple Woolwich",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Find out how to donate to SKSS Temple Woolwich through bank transfer, online, standing order, cheque, cash, and Gift Aid options.",
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
  mounted() {
    if (this.$route.hash) {
      const hash = this.$route.hash.substring(1);
      if (this.tabs.some((tab) => tab.id === hash)) {
        this.activeTab = hash;
      }
    }
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

    @media (max-width: 767px) {
      font-size: 2.2rem;
    }
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

/* --- Main Content Area (new wrapper for tabs and content) --- */
.main-content-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;

  @media (max-width: 767px) {
    padding: 25px;
    margin-bottom: 30px;
  }
}

/* --- Custom Tabs Navigation (matching events navigation) --- */
.nav-tabs-custom {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
  border-bottom: 2px solid $border-color;
  justify-content: center;

  // Mobile adjustments for tabs
  @media (max-width: 767px) {
    justify-content: flex-start;
    overflow-x: auto; // Enables horizontal scrolling
    -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
    white-space: nowrap; // Prevents tab titles from wrapping
    margin-left: -20px; // Adjusted for better alignment with new padding
    margin-right: -20px; // Adjusted for better alignment with new padding
    padding: 0 20px; // Adjusted padding for more compact look on mobile
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      /* Chrome, Safari */
      display: none;
    }
  }

  li {
    margin-bottom: -2px;
    transition: all 0.3s ease;

    a {
      display: block;
      padding: 12px 20px; // Default padding
      text-decoration: none;
      color: $secondary-gray;
      font-weight: 600;
      transition: color 0.3s ease, background-color 0.3s ease;
      border-bottom: 2px solid transparent;
      white-space: nowrap; // Ensure text stays on one line

      @media (max-width: 767px) {
        padding: 12px 18px; // Increased padding for tap area on mobile
        font-size: 1rem; // Increased font size for readability on mobile
      }
    }

    &:hover:not(.is-active) {
      a {
        color: darken($secondary-gray, 15%);
        border-color: lighten($border-color, 5%);
      }
    }

    &.is-active {
      a {
        color: $primary-solid-fallback;
        border-color: $primary-solid-fallback;
      }
    }
  }
}

/* --- Tab Content Styling --- */
.tab-content-custom {
  padding-top: 20px;
}

.tab-pane-custom {
  h3.tab-pane-title {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    margin-bottom: 20px;
    text-align: center;

    @media (max-width: 767px) {
      font-size: 1.7rem;
    }
  }

  h4.sub-heading {
    font-family: $font-heading;
    font-size: 1.4rem;
    font-weight: 600;
    color: $dark-text;
    margin-top: 30px;
    margin-bottom: 15px;

    @media (max-width: 767px) {
      font-size: 1.2rem;
    }
  }

  p {
    margin-bottom: 15px;
    line-height: 1.6;
    color: $dark-text;

    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background-color: lighten($border-color, 5%);
    border-radius: 4px;
    padding: 3px 6px;
    font-family: monospace;
    font-size: 0.95em;
    color: $primary-solid-fallback;
  }

  .link-download,
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

  .important-note {
    background-color: #fff3cd;
    border-left: 5px solid #ffc107;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 5px;
    font-size: 0.95rem;
    color: $dark-text;

    strong {
      color: darken($dark-text, 10%);
    }
  }

  .styled-list {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "\2022";
        color: $primary-solid-fallback;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
        position: absolute;
        left: 0;
      }
    }
  }
}

/* --- Bank Details Specific Layout --- */
.bank-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .detail-item {
    background-color: lighten($border-color, 3%);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid $border-color;

    h4 {
      font-family: $font-heading;
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary-solid-fallback;
      margin-top: 0;
      margin-bottom: 8px;
    }
    p {
      margin-bottom: 0;
    }
    code {
      display: block;
      padding: 5px 8px;
      word-break: break-all;
    }
  }
}

.bank-details-inline {
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
  code {
    font-size: 1em;
  }
  .mobile-break {
    display: none;
    @media (max-width: 575px) {
      display: block;
      content: "";
      margin-top: 5px;
    }
  }
}

/* --- Stripe Button Container --- */
.stripe-button-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.small-text {
  font-size: 0.9rem;
  color: $secondary-gray;
  text-align: center;
  margin-top: 15px;
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

.btn-secondary {
  display: inline-block;
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  border: 1px solid $primary-solid-fallback;
  border-radius: 8px;
  background-color: transparent;
  color: $primary-solid-fallback;
  transition: all 0.3s ease;
  margin-top: 15px;

  @media (max-width: 575px) {
    display: block;
    width: 100%;
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: lighten($primary-solid-fallback, 45%);
    color: darken($primary-solid-fallback, 10%);
  }
}

.or-separator {
  text-align: center;
  margin: 30px 0 20px;
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: $border-color;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }

  @media (max-width: 575px) {
    font-size: 0.9rem;
    margin: 20px 0 15px;
    &::before,
    &::after {
      width: 30%;
    }
  }
}
</style>
