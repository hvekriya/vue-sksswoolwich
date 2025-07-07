<template>
  <div class="events-page-wrapper container">
    <header class="page-header">
      <h1 class="page-title">Past events - {{ year }}</h1>
    </header>

    <nav class="events-nav">
      <ul class="nav nav-pills events-tab-nav">
        <li class="nav-item">
          <NuxtLink to="/events" class="nav-link">Upcoming Events</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/events/past" class="nav-link" active-class="is-active"
            >Past Events</NuxtLink
          >
        </li>
      </ul>
    </nav>

    <section class="past-events-list-section">
      <div class="section-header-with-filter">
        <h2 class="section-heading">Events from {{ year }}</h2>
        <PastYears class="events-year-filter" />
      </div>

      <NuxtLink to="/events/past" class="back-to-all-link">
        <i class="fas fa-arrow-left"></i> Back to All Past Events
      </NuxtLink>

      <p class="section-description">
        A look back at all the memorable events from {{ year }}.
      </p>

      <PastEvents :pastEvents="pastEvents" v-if="pastEvents && pastEvents.length" />
      <p v-else class="no-events-message">No past events found for {{ year }}.</p>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import PastEvents from "../../../components/PastEvents"; // Adjust path if needed
import PastYears from "../../../components/PastYears"; // Adjust path if needed

export default {
  name: "PastEventsByYearPage",
  components: {
    PastEvents,
    PastYears,
  },
  async asyncData({ $prismic, error, params }) {
    try {
      const filterYear = parseInt(params.uid);

      if (isNaN(filterYear)) {
        error({ statusCode: 400, message: "Invalid year specified." });
        return;
      }

      const today = moment().format("YYYY-MM-DD");

      const predicates = [
        $prismic.predicates.at("document.type", "events"),
        $prismic.predicates.dateAfter(
          "my.events.event_date",
          moment().year(filterYear).startOf("year").format("YYYY-MM-DD")
        ),
        $prismic.predicates.dateBefore(
          "my.events.event_date",
          moment().year(filterYear).endOf("year").format("YYYY-MM-DD")
        ),
      ];

      const eventsFromPrismic = await $prismic.api.query(predicates, {
        orderings: "[my.events.event_date desc]",
      });

      const events = eventsFromPrismic.results;

      const pastEvents = events.filter((event) => {
        return moment(event.data.event_date).isBefore(today);
      });

      pastEvents.sort((a, b) => {
        const dateA = moment(a.data.event_date);
        const dateB = moment(b.data.event_date);
        return dateB.diff(dateA);
      });

      return {
        year: filterYear,
        pastEvents,
      };
    } catch (e) {
      console.error("Error fetching past events for year:", e);
      error({ statusCode: 500, message: "Failed to load events for this year." });
    }
  },
  head() {
    return {
      title: `Past Events ${this.year ? "- " + this.year : ""} - SKSS Temple Woolwich`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Browse a collection of past events and activities from ${this.year} at SKSS Temple Woolwich.`,
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap",
        },
        // Make sure Font Awesome is linked globally in your Nuxt config or here if not
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #8b184c; // A solid color from the gradient for fallback/text
$secondary-gray: #6c757d; // For subtle text
$light-gray-bg: #f8f9fa; // Light background for the page
$dark-text: #343a40; // Main text color
$border-color: #dee2e6; // Border for elements

/* --- General Page Structure --- */
.events-page-wrapper {
  padding-top: 50px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  font-family: "Open Sans", sans-serif;
  color: $dark-text;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

/* --- Page Header --- */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  .page-title {
    font-family: "Montserrat", sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: $primary-solid-fallback;
    margin-bottom: 10px;

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

/* --- Navigation Tabs --- */
.events-nav {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  .events-tab-nav {
    border-radius: 8px;
    background-color: #e9ecef;
    padding: 5px;
    display: inline-flex;

    .nav-item {
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }

    .nav-link {
      color: $dark-text;
      padding: 10px 20px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        background-color: darken(#e9ecef, 5%);
        color: $primary-solid-fallback;
      }

      &.is-active {
        background: $primary-gradient;
        color: white;
        box-shadow: 0 2px 8px rgba($primary-solid-fallback, 0.3);

        &:hover {
          background: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
          color: white;
        }
      }
    }
  }

  @media (max-width: 575px) {
    .events-tab-nav {
      flex-direction: column;
      width: 100%;
      .nav-item {
        margin: 5px 0;
      }
      .nav-link {
        text-align: center;
        width: 100%;
      }
    }
  }
}

/* --- Past Events List Section --- */
.past-events-list-section {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 767px) {
    padding: 25px;
  }

  .section-header-with-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .section-heading {
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    text-align: left;
    margin-bottom: 0;
    flex-grow: 1;

    @media (max-width: 767px) {
      font-size: 1.7rem;
      margin-bottom: 15px;
      width: 100%;
      text-align: center;
    }
  }

  .events-year-filter {
    margin-left: 20px;
    flex-shrink: 0;

    @media (max-width: 767px) {
      margin-left: 0;
      width: 100%;
    }
  }

  // NEW: Styling for the "Back to All Past Events" link
  .back-to-all-link {
    display: inline-flex; // Allows icon and text to sit nicely
    align-items: center;
    margin-bottom: 25px; // Space before description
    color: $primary-solid-fallback;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;

    i {
      margin-right: 8px; // Space between icon and text
      font-size: 0.9em;
      transition: transform 0.2s ease;
    }

    &:hover {
      color: darken($primary-solid-fallback, 10%);
      transform: translateX(-3px); // Subtle slide effect
      i {
        transform: translateX(-3px); // Move icon with text
      }
    }
    &:active {
      transform: translateX(0);
      i {
        transform: translateX(0);
      }
    }

    @media (max-width: 767px) {
      width: 100%;
      justify-content: center; // Center link on mobile
      margin-bottom: 20px; // Reduce margin on mobile
      padding-top: 10px; // Add some top padding to separate from filter if stacked
    }
  }

  .section-description {
    font-size: 1.1rem;
    color: $secondary-gray;
    text-align: center;
    margin-bottom: 30px; // Keep enough space after the description and before event list

    @media (max-width: 767px) {
      font-size: 1rem;
    }
  }

  .no-events-message {
    text-align: center;
    font-size: 1.2rem;
    color: $secondary-gray;
    padding: 50px 0;
  }
}
</style>
