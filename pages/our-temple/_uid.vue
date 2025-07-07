<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.asText(fields.title) }}
      </h1>
    </header>

    <section class="main-content-section">
      <div class="cover-image-wrapper" v-if="fields.cover && fields.cover.url">
        <prismic-image :field="fields.cover" class="cover-image" />
      </div>

      <prismic-rich-text :field="fields.description" class="description" />

      <div class="cta-wrapper" v-if="fields.ctaLink && fields.ctaText">
        <prismic-link :field="fields.ctaLink" class="btn btn-primary">
          {{ $prismic.asText(fields.ctaText) }}
        </prismic-link>
      </div>

      <div class="icon-wrapper" v-if="fields.icon && fields.icon.url">
        <prismic-image :field="fields.icon" class="icon" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "OurTemplePage", // Renamed for clarity as 'Page' might be too generic
  async asyncData({ $prismic, params, error }) {
    try {
      const document = await $prismic.api.getByUID("our-temple", params.uid);
      if (document) {
        return {
          documentId: document.id,
          fields: {
            title: document.data.title,
            cover: document.data.cover_image, // Assuming 'cover_image' from Prismic
            description: document.data.content, // 'content' from Prismic is the rich text
            ctaLink: document.data.cta_link,
            ctaText: document.data.cta_text,
            icon: document.data.icon, // Assuming 'icon' field from Prismic
          },
        };
      } else {
        error({ statusCode: 404, message: "Page not found" });
      }
    } catch (e) {
      console.error("Error fetching Prismic document:", e);
      error({ statusCode: 500, message: "An error occurred while loading the page." });
    }
  },
  head() {
    // Dynamic SEO based on Prismic data
    const title = this.fields.title
      ? `${this.$prismic.asText(this.fields.title)} | SKSS Temple Woolwich`
      : "Page | SKSS Temple Woolwich";
    const description = this.fields.description
      ? this.$prismic.asText(this.fields.description).substring(0, 160)
      : "Learn more about SKSS Temple Woolwich.";

    return {
      title: title,
      meta: [{ hid: "description", name: "description", content: description }],
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

/* --- Main Content Section (for general page content) --- */
.main-content-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 40px; // Spacing from cover image or header
  margin-bottom: 40px; // Spacing at the bottom

  @media (max-width: 767px) {
    padding: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 575px) {
    padding: 20px 15px; // Reduced padding for very small screens
  }
}

/* --- Cover Image Styling --- */
.cover-image-wrapper {
  width: 100%;
  height: 450px; // Default height for cover image
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px; // Space between cover image and main content

  @media (max-width: 991px) {
    height: 350px;
  }

  @media (max-width: 767px) {
    height: 250px;
    margin-bottom: 30px;
  }
}

.cover-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; // Essential for cover style
  object-position: center;
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
  // --- End UL/LI Styling ---
}

/* --- CTA Button Styling --- */
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
  margin-bottom: 20px;
}

.icon {
  max-width: 120px; // Control max size of the icon
  height: auto;
  display: inline-block; // Center if smaller than max-width
}
</style>
