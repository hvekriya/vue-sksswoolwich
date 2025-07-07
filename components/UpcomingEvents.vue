<template>
  <div class="upcoming-events-section">
    <div class="events-grid">
      <div
        class="event-card"
        v-for="(event, index) in upcomingEvents"
        :key="'upcoming-event-' + index"
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
          <div class="event-description-short">
            <prismic-rich-text :field="event.data.event_description_short" />
          </div>

          <div class="event-actions-bottom">
            <NuxtLink
              :to="{
                path: `/events/${event.uid}`,
              }"
              class="btn event-details-btn"
            >
              View More Details
              <i class="fas fa-arrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
      <p v-if="!upcomingEvents || upcomingEvents.length === 0" class="no-events-message">
        No upcoming events currently scheduled. Please check back soon!
      </p>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image/v2";
import moment from "moment"; // Import moment for filter

export default {
  name: "UpcomingEvents",
  props: {
    upcomingEvents: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VLazyImage,
  },
  filters: {
    // Define the moment filter if it's not globally available
    moment: function (date, format) {
      if (!date) return "";
      return moment(date).format(format);
    },
  },
};
</script>

<style lang="scss" scoped>
/* --- Color Definitions (Consistency is Key!) --- */
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
// Using mobile-first approach for @media rules
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

/* --- Upcoming Events Section Layout --- */
.upcoming-events-section {
  padding: 15px 0; // Consistent padding with PastEvents
  @include media-breakpoint-up(md) {
    padding: 20px 0;
  }
}

.events-grid {
  display: grid;
  gap: 20px; // Consistent gap with PastEvents
  grid-template-columns: 1fr; // Default: Single column on mobile

  @include media-breakpoint-up(sm) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    ); // 2+ columns on larger mobiles/tablets
    gap: 25px;
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(320px, 1fr)
    ); // Back to 3+ columns on desktop
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
  min-height: 280px; // Keep minimum height for consistency

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
    background: $primary-gradient; // Apply gradient
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

  /* --- Event Cover Image (consistent with PastEvents) --- */
  .event-cover-image-link {
    display: block;
    width: 100%;
    height: 180px;
    overflow: hidden;
    background-color: $border-light;

    @include media-breakpoint-up(md) {
      height: 200px;
    }
  }

  .event-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
    @media (hover: none) {
      &:hover {
        transform: none;
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

  .event-description-short {
    // Renamed for clarity, as it's specifically "short"
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
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid $border-light;
    text-align: center;
  }

  .event-details-btn {
    // Renamed button class for clarity (details vs pictures)
    width: 100%;
    max-width: 250px;
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 25px;
    background: $primary-gradient;
    color: white;
    border: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin: 0 auto;

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

.no-events-message {
  // Generic message for both upcoming and past if no events
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
