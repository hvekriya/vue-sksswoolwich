<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">Utsavs Calendar</h1>
    </header>

    <section class="main-content-section calendar-section">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </section>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
// No need for moment with FullCalendar v5+, it has its own date handling
// import moment from "moment";

export default {
  name: "UtsavsCalendarPage", // Renamed for clarity
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        initialView: "listMonth", // Starts with a list view for the current month
        themeSystem: "bootstrap", // Uses Bootstrap 4 styling (requires Bootstrap CSS loaded globally)
        plugins: [listPlugin, dayGridPlugin, googleCalendarPlugin],
        // eventClick: this.handleEventClick, // Example: uncomment if you need to handle event clicks
        stickyHeaderDates: false, // Prevents dates from sticking to top in list view
        googleCalendarApiKey: process.env.google_api_key, // Your Google Calendar API key
        events: {
          googleCalendarId:
            "c_1cb9e7ffe7dcf521b3845a216054ded6372636a8d55cca21b64b2477ccc261b6@group.calendar.google.com",
        },
        customButtons: {
          myCustomButton: {
            text: "Full Page", // Text displayed on the button
            click: () => this.$router.push({ path: "/our-temple/calendar" }), // Example action
          },
        },
        headerToolbar: {
          left: "prev", // Previous button
          center: "title", // Calendar title (e.g., "August 2025")
          right: "next", // Next button
        },
        footerToolbar: {
          left: "today listMonth dayGridMonth", // Today, List Month, Day Grid Month view buttons
          center: "", // Empty center
          right: "myCustomButton", // Your custom button
        },
        // Optional: customize text for buttons/views if needed
        buttonText: {
          today: "Today",
          month: "Month",
          list: "List",
        },
        noEventsText: "No Utsavs or events scheduled for this period.", // Custom text when no events
      },
    };
  },
  methods: {
    // Example event handler (uncomment and use if needed)
    // handleEventClick: function (info) {
    //   alert('Event: ' + info.event.title + '\nDate: ' + info.event.startStr);
    //   // info.jsEvent.preventDefault(); // don't let the browser navigate
    // },
  },
  mounted() {
    // You can access the FullCalendar API here if needed
    // let calendarApi = this.$refs.fullCalendar.getApi();
    // calendarApi.gotoDate('2025-07-01'); // Example: go to a specific date on mount
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
$calendar-border-radius: 8px; // Slightly smaller border-radius for calendar elements

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
  min-height: calc(100vh - 100px); // Adjust based on your actual header/footer heights
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

/* --- Main Content Section (for the calendar itself) --- */
.main-content-section.calendar-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 40px;
  margin-bottom: 40px;
  max-width: 1200px; // Limit max width for better readability on very large screens
  margin-left: auto; // Center the container
  margin-right: auto; // Center the container

  @media (max-width: 767px) {
    padding: 25px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media (max-width: 575px) {
    padding: 20px 15px;
  }
}

/* --- FullCalendar Overrides --- */

// General calendar container
.fc {
  font-family: $font-body; // Apply main body font
}

// Toolbar styling (header and footer)
.fc .fc-toolbar {
  flex-wrap: wrap; // Allow toolbar items to wrap on smaller screens
  padding: 15px 0;
  margin-bottom: 20px; // Space below header toolbar
  border-bottom: 1px solid $border-color; // Separator for header toolbar

  .fc-toolbar-title {
    font-family: $font-heading;
    font-size: 1.8rem;
    color: $dark-text;
    margin: 10px 0; // Add margin for spacing when wrapped
    flex-grow: 1; // Allow title to take available space
    text-align: center; // Center title by default

    @media (min-width: 768px) {
      font-size: 2rem;
      text-align: left; // Align left on larger screens
    }
  }

  // Ensure button groups wrap gracefully
  .fc-toolbar-chunk {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; // Center buttons on mobile
    margin: 5px 0; // Spacing between button chunks
  }

  @media (min-width: 768px) {
    .fc-toolbar-chunk {
      justify-content: flex-start; // Align left/right on larger screens
      &:last-child {
        justify-content: flex-end;
      }
    }
  }
}

.fc-footer-toolbar {
  margin-top: 20px; // Space above footer toolbar
  border-top: 1px solid $border-color; // Separator for footer toolbar
  padding-top: 15px;
}

// All FullCalendar buttons (including default and custom)
.fc .fc-button {
  background-image: $primary-gradient;
  background-color: $primary-solid-fallback; // Fallback for no gradient
  color: #fff;
  border: none;
  border-radius: $calendar-border-radius;
  padding: 8px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 5px; // Space between buttons
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba($primary-solid-fallback, 0.2);
  text-transform: capitalize; // Default button text might be uppercase, make it consistent

  &:hover {
    background-image: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
    box-shadow: 0 4px 8px rgba($primary-solid-fallback, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    background-image: linear-gradient(
      to right,
      darken(#8b184c, 10%),
      darken(#da1b60, 10%)
    );
    box-shadow: 0 1px 3px rgba($primary-solid-fallback, 0.4);
    transform: translateY(0);
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba($primary-solid-fallback, 0.25);
    outline: none; // Remove default focus outline
  }

  &.fc-button-active {
    background-image: linear-gradient(
      to right,
      darken(#8b184c, 10%),
      darken(#da1b60, 10%)
    );
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    border-color: darken(
      $primary-solid-fallback,
      15%
    ); // Stronger border for active state
  }
}

// Specific overrides for FullCalendar's Bootstrap theme
// This ensures our custom styles take precedence over Bootstrap's defaults for FC buttons
.fc-theme-bootstrap .fc-button {
  border-color: transparent !important; // Prevent Bootstrap's border from showing
  // Add other !important if necessary to override Bootstrap button specifics
}

/* --- List View Specific Styles (listMonth) --- */
.fc-list-table {
  width: 100%;
  border-collapse: collapse;
}

.fc-list-day {
  background-color: lighten(
    $primary-solid-fallback,
    45%
  ); // Light background for day headers
  font-family: $font-heading;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  color: $dark-text;
  padding: 10px 15px;
  border-radius: $calendar-border-radius;
  margin-bottom: 10px; // Space below day header
}

.fc-list-event {
  background-color: $light-gray-bg; // Light background for events
  border: 1px solid $border-color;
  border-radius: $calendar-border-radius;
  margin-bottom: 10px;
  padding: 15px;
  display: flex; // Use flexbox for layout of time and title
  align-items: flex-start;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.fc-list-event-time {
  font-weight: 600;
  color: $primary-solid-fallback;
  margin-right: 15px; // More space between time and title
  white-space: nowrap; // Keep time on one line
  flex-shrink: 0; // Prevent time from shrinking
}

.fc-list-event-title {
  color: $dark-text;
  font-weight: 500;
  word-break: break-word; // Allow long words to wrap
}

// Message when no events are found
.fc-list-empty {
  text-align: center;
  color: $secondary-gray;
  font-style: italic;
  padding: 20px;
  background-color: lighten($light-gray-bg, 3%);
  border-radius: $calendar-border-radius;
}

/* --- Day Grid View Specific Styles (dayGridMonth) --- */
.fc-daygrid-body {
  border-color: $border-color;
  border-radius: $calendar-border-radius;
  overflow: hidden; // Ensures rounded corners are visible for the grid
}

// Cell borders
.fc-daygrid-day {
  border-color: $border-color;
}

.fc-daygrid-day-frame {
  padding: 5px; // Padding inside each day cell
}

.fc-daygrid-day-number {
  color: $dark-text;
  font-family: $font-heading;
  font-weight: 600;
  padding: 5px;
  display: block;
  text-align: right; // Align day number to the top-right

  @media (max-width: 767px) {
    font-size: 0.8rem; // Smaller font on mobile
    padding: 3px;
  }
}

// Day names header (Mon, Tue, etc.)
.fc-col-header-cell {
  background-color: lighten($primary-solid-fallback, 45%);
  color: $dark-text;
  font-family: $font-heading;
  font-weight: 600;
  border-color: $border-color;
  padding: 10px 5px;

  @media (max-width: 767px) {
    font-size: 0.9rem; // Smaller font on mobile
    padding: 8px 3px;
  }
}

// Events in month view
.fc-daygrid-event {
  border-radius: 4px;
  padding: 2px 5px;
  margin-bottom: 2px;
  font-size: 0.85rem;
  line-height: 1.3;
  word-break: break-all; // Break long words if they don't fit

  background-color: rgba($primary-solid-fallback, 0.85); // Event background
  border-color: rgba($primary-solid-fallback, 0.85); // Event border
  color: #fff; // Event text color

  .fc-event-main {
    color: #fff; // Ensure main text is white
  }
  .fc-event-time {
    color: lighten(#fff, 20%); // Slightly lighter time text for contrast
    font-weight: 500;
  }

  &:hover {
    background-color: $primary-solid-fallback; // Solid color on hover
    border-color: $primary-solid-fallback;
  }
}

.fc-event-title-container {
  padding-left: 2px; // Small padding for event titles
}

// Styling for today's date in dayGridMonth
.fc-day-today {
  background-color: rgba(
    $primary-solid-fallback,
    0.1
  ); // Light background highlight for today
  border: 1px solid $primary-solid-fallback; // Primary color border for today
  box-shadow: inset 0 0 0 1px $primary-solid-fallback; // Inner shadow for today
  border-radius: $calendar-border-radius; // Ensure rounded corners for today's cell

  .fc-daygrid-day-number {
    font-weight: 700;
    color: $primary-solid-fallback; // Primary color for today's date number
  }
}
</style>
