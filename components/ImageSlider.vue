<template>
  <div class="image-slider-component">
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_type === 'image_gallery'">
        <hooper
          :progress="true"
          :infiniteScroll="true"
          :autoPlay="true"
          :playSpeed="4000"
          :wheelControl="false"
          class="hooper-cover-style"
        >
          <slide
            v-for="(item, slideIndex) in slice.items"
            :key="'photo-' + index + '-' + slideIndex"
          >
            <prismic-image :field="item.gallery_image" class="slider-image" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          <hooper-pagination slot="hooper-addons"></hooper-pagination>
        </hooper>
      </template>
    </template>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from "hooper";
import "hooper/dist/hooper.css"; // Ensure this is imported for base styles
export default {
  name: "ImageSlider",
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination, // Added pagination for better UX
  },
  props: ["fields"],
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #da1b60;
$secondary-gray: #6c757d;
$light-gray-bg: #f8f9fa;
$dark-text: #343a40;
$card-bg: #ffffff; // Keeping this though not directly used for the slider background
$border-color: #dee2e6;

$font-heading: "Montserrat", sans-serif;
$font-body: "Open Sans", sans-serif;

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

.image-slider-component {
  width: 100%;
  margin-top: 40px; // Spacing from page header
  margin-bottom: 40px; // Spacing before the next content section
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); // Subtle shadow

  @media (max-width: 767px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}

.hooper-cover-style {
  height: 550px; // Default height for large screens

  @media (max-width: 991px) {
    // Tablets and small desktops
    height: 450px;
  }

  @media (max-width: 767px) {
    // Mobile devices
    height: 300px;
  }
}

/* Style for the actual image within each slide */
.slider-image {
  display: block; // Remove any extra space below the image
  width: 100%;
  height: 100%;
  object-fit: cover; // This is the core property for "cover style"
  object-position: center; // Centers the image within the frame, good for cropping
}

/* Override default hooper navigation styles to match design */
.hooper-next,
.hooper-prev {
  background-color: rgba($primary-solid-fallback, 0.7); // Semi-transparent background
  border-radius: 50%; // Make them round
  color: #fff; // White arrows
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-solid-fallback; // Solid on hover
  }

  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
    font-size: 0.8em; // Smaller arrows on mobile
  }
}

.hooper-next {
  right: 15px; // Position from right edge
}

.hooper-prev {
  left: 15px; // Position from left edge
}

/* Style for pagination dots */
.hooper-pagination {
  bottom: 15px; // Position from bottom edge
  padding: 0 10px; // Add some padding around dots
}

.hooper-indicator {
  background-color: rgba(
    $primary-solid-fallback,
    0.4
  ); // Lighter semi-transparent default dot
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px; // Spacing between dots
  transition: background-color 0.3s ease, transform 0.3s ease;

  &.is-active {
    background-color: $primary-solid-fallback; // Solid primary color for active dot
    transform: scale(1.2); // Slightly larger active dot
  }

  &:hover {
    background-color: rgba($primary-solid-fallback, 0.7); // Darker on hover
  }
}
</style>
