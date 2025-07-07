<template>
  <div class="past-events-section">
    <div class="events-grid">
      <div
        class="event-card"
        v-for="(event, index) in pastEvents"
        :key="'past-event-' + index"
      >
        <div class="event-card-header">
          <time class="event-date">
            <span class="day">{{ event.data.event_date | moment("DD") }}</span>
            <span class="month-year">{{
              event.data.event_date | moment("MMM YYYY")
            }}</span>
          </time>
          <div class="event-title-wrap">
            <prismic-rich-text :field="event.data.event_title" class="event-title" />
          </div>
        </div>

        <a
          :href="event.data.poster.url"
          target="_blank"
          rel="noopener noreferrer"
          class="event-cover-image-link"
          v-if="event.data.poster && event.data.poster.url"
        >
          <v-lazy-image
            :src="event.data.poster.url"
            :alt="event.data.poster.alt || 'Event Poster'"
            class="event-cover-image"
          />
        </a>

        <div class="event-card-body">
          <div class="event-description">
            <prismic-rich-text :field="event.data.event_description" />
          </div>

          <div class="event-actions-bottom">
            <NuxtLink
              v-if="event.data.flicker_album_id"
              :to="{
                path: `/events/${event.uid}/${event.data.flicker_album_id}`,
              }"
              class="btn event-view-btn"
            >
              View Pictures
              <i class="fas fa-camera"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
      <p v-if="!pastEvents || pastEvents.length === 0" class="no-past-events-message">
        No past events to display.
      </p>
    </div>
  </div>
</template>

<script>
import PastYears from "./PastYears";
import VLazyImage from "v-lazy-image/v2";
import moment from "moment";

export default {
  name: "PastEvents",
  props: {
    pastEvents: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PastYears,
    VLazyImage,
  },
  filters: {
    moment: function (date, format) {
      if (!date) return "";
      return moment(date).format(format);
    },
  },
};
</script>

<style lang="scss" scoped>
/* --- Color Definitions --- */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #da1b60; // A solid color from the gradient for fallback/text
$text-dark: #343a40;
$text-light-gray: #6c757d;
$border-light: #e9ecef;
$card-bg: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.08);

$font-heading: "Montserrat", sans-serif;
$font-body: "Open Sans", sans-serif;

/* --- Mixins for responsiveness --- */
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

/* --- Past Events Section Layout --- */
.past-events-section {
  padding: 15px 0;
  @include media-breakpoint-up(md) {
    padding: 20px 0;
  }
}

.past-years-filter {
  margin-bottom: 25px;
  @include media-breakpoint-up(md) {
    margin-bottom: 30px;
  }
}

.events-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @include media-breakpoint-up(sm) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }
}

/* --- Individual Event Card Styling --- */
.event-card {
  background-color: $card-bg;
  border-radius: 10px;
  box-shadow: 0 4px 15px $shadow-color;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 280px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
  @media (hover: none) {
    &:hover {
      transform: none;
      box-shadow: 0 4px 15px $shadow-color;
    }
  }

  /* --- Card Header (Date & Title) --- */
  .event-card-header {
    display: flex;
    align-items: center;
    background: $primary-gradient;
    color: white;
    padding: 15px;
    position: relative;

    @include media-breakpoint-up(md) {
      padding: 15px 20px;
    }

    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      margin-right: 12px;

      @include media-breakpoint-up(md) {
        width: 70px;
        height: 70px;
        margin-right: 15px;
      }
      font-family: $font-heading;

      .day {
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1;

        @include media-breakpoint-up(md) {
          font-size: 2.2rem;
        }
      }
      .month-year {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        @include media-breakpoint-up(md) {
          font-size: 0.85rem;
        }
      }
    }

    .event-title-wrap {
      flex-grow: 1;
      .event-title {
        margin: 0;
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          font-family: $font-heading;
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin: 0;
          line-height: 1.3;
          @include media-breakpoint-up(md) {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  /* --- NEW: Event Cover Image --- */
  .event-cover-image-link {
    display: block; // Make the link cover the whole image area
    width: 100%;
    // Define an aspect ratio for the image container
    // Using padding-bottom trick for responsive aspect ratio (e.g., 66% for 3:2 ratio)
    // Or, for simplicity and common use, just a fixed height with object-fit
    height: 180px; // Fixed height for consistency
    overflow: hidden; // Ensures image doesn't spill out if rounded corners are added to parent
    background-color: $border-light; // Placeholder background while loading

    @include media-breakpoint-up(md) {
      height: 200px; // Slightly taller on larger screens
    }
  }

  .event-cover-image {
    width: 100%;
    height: 100%; // Make image fill the container
    object-fit: cover; // Crucial: crops image to cover the area without distortion
    display: block; // Remove extra space below image
    transition: transform 0.3s ease; // Smooth zoom on hover

    &:hover {
      transform: scale(1.05); // Subtle zoom effect on hover
    }
    @media (hover: none) {
      &:hover {
        transform: none; // Disable zoom on touch devices
      }
    }
  }

  /* --- Card Body (Description & Actions) --- */
  .event-card-body {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(md) {
      padding: 20px;
    }
  }

  .event-description {
    margin-bottom: 15px;
    font-family: $font-body;
    font-size: 0.9rem;
    color: $text-dark;
    line-height: 1.5;
    flex-grow: 1;

    @include media-breakpoint-up(md) {
      margin-bottom: 20px;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    :deep(p) {
      margin-bottom: 0.5em;
    }
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      font-family: $font-body;
      font-weight: 600;
      color: $text-dark;
      margin-top: 1em;
      margin-bottom: 0.5em;
      font-size: 1rem;
      @include media-breakpoint-up(md) {
        font-size: 1.1rem;
      }
    }
    :deep(ul),
    :deep(ol) {
      padding-left: 20px;
      margin-bottom: 1em;
    }
  }

  .event-actions-bottom {
    // Renamed from event-media-actions as media is now separate
    margin-top: auto; // Pushes buttons to the bottom
    padding-top: 10px; // Add a bit of padding above buttons
    border-top: 1px solid $border-light; // A subtle line to separate actions
    text-align: center; // Center the button if it's the only element
  }

  .event-view-btn {
    width: 100%;
    max-width: 250px; // Keep a max-width for aesthetic appeal, button centers if smaller
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 25px;
    background: $primary-gradient;
    color: white;
    border: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: inline-flex; // Use inline-flex to allow centering
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin: 0 auto; // Center the button

    @include media-breakpoint-up(md) {
      font-size: 0.95rem;
      padding: 12px 20px;
      max-width: 280px;
    }

    i {
      margin-left: 8px;
      font-size: 1em;
    }

    &:hover {
      background: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
      transform: translateY(-2px);
    }
    @media (hover: none) {
      &:hover {
        background: $primary-gradient;
        transform: none;
      }
      &:active {
        background: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
        transform: translateY(1px);
      }
    }
  }
}

.no-past-events-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 30px;
  font-size: 1.1rem;
  color: $text-light-gray;
  background-color: $card-bg;
  border-radius: 10px;
  box-shadow: 0 2px 10px $shadow-color;
  @include media-breakpoint-up(md) {
    padding: 40px;
    font-size: 1.2rem;
  }
}
</style>
