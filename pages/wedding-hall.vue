<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.asText(fields.title) }}
      </h1>
    </header>

    <ImageSlider :fields="fields" />

    <section class="content-section">
      <prismic-rich-text :field="fields.description" class="description" />

      <div class="cta-wrapper">
        <prismic-link :field="fields.ctaLink" class="btn btn-primary">
          {{ $prismic.asText(fields.ctaText) }}
        </prismic-link>
      </div>

      <div class="icon-wrapper">
        <prismic-image :field="fields.icon" class="icon" />
      </div>
    </section>

    <WeddingContact />
    <br /><br />
  </div>
</template>

<script>
import WeddingContact from "../components/WeddingContact";
import ImageSlider from "../components/ImageSlider";
export default {
  name: "WeddingHall",
  components: {
    WeddingContact,
    ImageSlider,
  },
  data() {
    return {
      documentId: "",
      fields: {
        title: null,
        description: null, // This is document.data.content in your API call
        ctaLink: null,
        ctaText: null,
        icon: null, // Added icon to data
        slices: [], // This is document.data.body in your API call
      },
    };
  },
  head() {
    // Dynamic SEO based on Prismic data
    const title = this.fields.title
      ? `${this.$prismic.asText(this.fields.title)} | SKSS Temple Woolwich`
      : "Wedding Hall | SKSS Temple Woolwich";
    const description = this.fields.description
      ? this.$prismic.asText(this.fields.description).substring(0, 160)
      : "Explore the beautiful wedding hall at SKSS Temple Woolwich for your special event.";

    return {
      title: title,
      meta: [{ hid: "description", name: "description", content: description }],
    };
  },
  methods: {
    getContent() {
      this.$prismic.api
        .getByUID("our-temple", "wedding-hall")
        .then((document) => {
          if (document) {
            this.documentId = document.id;
            this.fields.title = document.data.title;
            this.fields.description = document.data.content; // Mapped from 'content' field in Prismic
            this.fields.ctaLink = document.data.cta_link;
            this.fields.ctaText = document.data.cta_text;
            this.fields.icon = document.data.icon; // Assuming you have an 'icon' field in Prismic
            this.fields.slices = document.data.body;
          } else {
            this.$router.push({
              name: "not-found",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching Prismic document:", error);
          this.$router.push({ name: "not-found" });
        });
    },
  },
  created() {
    this.getContent();
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent();
    next();
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

  .title {
    // Applies to the h1
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

/* --- Main Content Section (Prismic Description, CTA, Icon) --- */
.content-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 40px; // Spacing from image slider
  margin-bottom: 40px; // Spacing before WeddingContact

  @media (max-width: 767px) {
    padding: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 575px) {
    padding: 20px 15px; // Reduced padding for very small screens
  }
}

/* --- Description (Prismic Rich Text) --- */

.description {
  line-height: 1.6;
  margin-bottom: 30px;
  color: $dark-text;

  // Basic styling for content within Prismic Rich Text
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $font-heading;
    color: $dark-text;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  p {
    margin-bottom: 1em;
  }

  // --- Styling for UL/LI elements from Prismic ---
  ul {
    list-style: none; /* Remove default bullet points */
    padding-left: 0; /* Remove default padding */
    margin-bottom: 1.5em; /* Spacing below the list */
    margin-top: 1.5em; /* Spacing above the list */
  }

  li {
    position: relative;
    padding-left: 25px; /* Space for the custom bullet */
    margin-bottom: 10px; /* Space between list items */
    line-height: 1.6; /* Ensure good line spacing */
    font-family: $font-body; // Ensure consistent font

    &:last-child {
      margin-bottom: 0; // No bottom margin on the last item
    }

    &::before {
      content: "\2022"; /* Unicode for a solid circle bullet */
      color: $primary-solid-fallback; /* Use your primary color for the bullet */
      position: absolute;
      left: 0;
      top: 0;
      line-height: inherit; // Inherit line-height to align vertically
    }
  }
}

/* --- CTA Button Styling (Reused from Contact Us) --- */
.cta-wrapper {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 40px; // Spacing before icon or next section
}

.btn-primary {
  // Applying the general btn-primary style
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

  @media (max-width: 575px) {
    display: block; // Full width on extra small screens
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

/* --- Icon Styling --- */
.icon-wrapper {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px; // Space before WeddingContact
}

.icon {
  max-width: 120px; // Control max size of the icon
  height: auto;
  display: inline-block; // Center if smaller than max-width
}
</style>
