<template>
  <div class="events-page-wrapper container">
    <header class="page-header">
      <h1 class="page-title">Past events</h1>
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
        <h2 class="section-heading">Browse Our Past Events</h2>
        <!-- PastYears component integrated here -->
        <PastYears class="events-year-filter" />
      </div>
      <p class="section-description">
        Relive moments from our cherished events and activities.
      </p>

      <PastEvents :pastEvents="pastEvents" v-if="pastEvents && pastEvents.length" />
      <p v-else class="no-events-message">No past events found at this time.</p>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import PastEvents from "../../components/PastEvents"; // Ensure correct path to component
import PastYears from "../../components/PastYears"; // Import the PastYears component

export default {
  name: "PastEventsPage",
  components: {
    PastEvents,
    PastYears, // Register the PastYears component
  },
  async asyncData({ $prismic, error, route }) {
    // Added route to access params
    try {
      // Get the year from the route parameters, default to current year if not present
      // This allows for /events/past and /events/year/2022
      const filterYear = route.params.year ? parseInt(route.params.year) : null;

      const predicates = [$prismic.predicates.at("document.type", "events")];

      // Add year filtering if a specific year is selected
      if (filterYear) {
        // Filter events within the selected year
        const startOfYear = moment()
          .year(filterYear)
          .startOf("year")
          .format("YYYY-MM-DD");
        const endOfYear = moment().year(filterYear).endOf("year").format("YYYY-MM-DD");
        predicates.push(
          $prismic.predicates.dateAfter("my.events.event_date", startOfYear)
        );
        predicates.push(
          $prismic.predicates.dateBefore("my.events.event_date", endOfYear)
        );
      }

      const eventsFromPrismic = await $prismic.api.query(
        predicates,
        { orderings: "[my.events.event_date desc]" } // Order by event_date descending directly from Prismic
      );

      const today = moment().format("YYYY-MM-DD");
      const events = eventsFromPrismic.results;

      const pastEvents = events.filter((event) => {
        return moment(event.data.event_date).isBefore(today);
      });

      return {
        pastEvents,
      };
    } catch (e) {
      console.error("Error fetching past events:", e);
      error({ statusCode: 500, message: "Failed to load past events." });
    }
  },
  head() {
    return {
      title: "Past Events - SKSS Temple Woolwich",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Browse a collection of past events and activities at SKSS Temple Woolwich.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap",
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
    color: $primary-solid-fallback; // Use solid color for text
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
    background-color: $primary-solid-fallback; // Use solid color for line
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
        color: $primary-solid-fallback; // Use solid color for hover
      }

      &.is-active {
        background: $primary-gradient; // Use gradient for active tab
        color: white;
        box-shadow: 0 2px 8px rgba($primary-solid-fallback, 0.3);

        &:hover {
          background: linear-gradient(
            to right,
            darken(#8b184c, 5%),
            darken(#da1b60, 5%)
          ); // Darken gradient on hover
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
    flex-wrap: wrap; // Allow wrapping on small screens
    margin-bottom: 20px; // Space below this header block

    @media (max-width: 767px) {
      flex-direction: column; // Stack heading and filter on mobile
      align-items: flex-start; // Align to start when stacked
    }
  }

  .section-heading {
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    text-align: left; // Align left within its flex container
    margin-bottom: 0; // Reset margin for flex item
    flex-grow: 1; // Allow heading to take space

    @media (max-width: 767px) {
      font-size: 1.7rem;
      margin-bottom: 15px; // Add margin when stacked
      width: 100%; // Take full width when stacked
      text-align: center; // Center heading on mobile
    }
  }

  .events-year-filter {
    // This component has its own scoped styles for float:right on desktop
    // and width:100% on mobile. This parent just needs to ensure it has space.
    margin-left: 20px; // Space from heading on desktop
    flex-shrink: 0; // Prevent filter from shrinking

    @media (max-width: 767px) {
      margin-left: 0; // Remove margin when stacked
      width: 100%; // Take full width when stacked
    }
  }

  .section-description {
    font-size: 1.1rem;
    color: $secondary-gray;
    text-align: center;
    margin-bottom: 30px;

    @media (max-width: 767px) {
      font-size: 1rem;
      margin-bottom: 20px; // Reduced margin on mobile
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
