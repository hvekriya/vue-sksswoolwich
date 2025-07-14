<template>
  <div class="events-page-wrapper container">
    <header class="page-header">
      <h1 class="page-title"><i class="fas fa-calendar-alt"></i> Upcoming events</h1>
    </header>

    <nav class="events-nav">
      <ul class="nav nav-pills events-tab-nav">
        <li class="nav-item">
          <NuxtLink to="/events" class="nav-link" active-class="is-active"
            >Upcoming Events</NuxtLink
          >
        </li>
        <li class="nav-item">
          <NuxtLink to="/events/past" class="nav-link" active-class="is-active"
            >Past Events</NuxtLink
          >
        </li>
      </ul>
    </nav>

    <section class="upcoming-events-list-section">
      <h2 class="section-heading">Discover Our Upcoming Events</h2>
      <p class="section-description">
        Stay informed about our exciting upcoming events and activities.
      </p>

      <UpcomingEvents
        :upcomingEvents="upcomingEvents"
        v-if="upcomingEvents && upcomingEvents.length"
      />
      <p v-else class="no-events-message">
        No upcoming events are currently scheduled. Please check back soon!
      </p>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import UpcomingEvents from "../../components/UpcomingEvents"; // Ensure correct path to component

export default {
  name: "UpcomingEventsPage", // Renamed for clarity
  components: {
    UpcomingEvents,
  },
  async asyncData({ $prismic, error }) {
    try {
      // Get event data from Prismic
      const document = await $prismic.api.getSingle("home");
      const eventsFromPrismic = await $prismic.api.query(
        $prismic.predicates.at("document.type", "events")
      );
      const today = moment().format("YYYY-MM-DD").toString();
      const events = eventsFromPrismic.results;

      // Filter the events based on past and future
      const upcomingEvents = events.filter((event) => {
        return moment(event.data.event_date).isSameOrAfter(today);
      });
      upcomingEvents.sort(function (a, b) {
        a = new Date(a.data.event_date);
        b = new Date(b.data.event_date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * -1;
      });

      return {
        upcomingEvents,
      };
    } catch (e) {
      console.error("Error fetching upcoming events:", e);
      error({ statusCode: 500, message: "Failed to load upcoming events." });
    }
  },
  head() {
    return {
      title: "Upcoming Events - SKSS Temple Woolwich",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Stay informed about upcoming events and activities at SKSS Temple Woolwich.",
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
    color: $primary-solid-fallback;
    margin-bottom: 10px;

    i {
      margin-right: 15px; // Space for the icon
      color: $primary-solid-fallback;
    }

    @media (max-width: 767px) {
      font-size: 2.2rem;
      i {
        margin-right: 10px;
      }
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
        // This class will be applied by NuxtLink for the active route
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

/* --- Upcoming Events List Section --- */
.upcoming-events-list-section {
  // Renamed from past-events-list-section for clarity
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 767px) {
    padding: 25px;
  }

  .section-heading {
    font-family: "Montserrat", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    text-align: center;
    margin-bottom: 15px;

    @media (max-width: 767px) {
      font-size: 1.7rem;
    }
  }

  .section-description {
    font-size: 1.1rem;
    color: $secondary-gray;
    text-align: center;
    margin-bottom: 30px;

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
