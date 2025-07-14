<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Manage Prismic Events</h1>
      <div v-if="user" class="header-actions">
        <span>{{ user.email }} | </span>
        <nuxt-link to="/admin-dash" class="back-link">Back to Admin Dashboard</nuxt-link>
        <span> | </span>
        <a @click="logout" class="logout-link">Logout</a>
      </div>
    </header>

    <div class="list row">
      <div class="col-md-12">
        <div class="admin-actions mb-4">
          <nuxt-link to="/admin-dash/events/new" class="btn btn-primary add-event-btn">
            Add New Prismic Event
          </nuxt-link>
        </div>

        <div v-if="loading" class="loading-message">Loading events...</div>
        <div v-else-if="error" class="error-message">Error: {{ error }}</div>
        <div v-else-if="events.length === 0" class="no-events-message">
          No Prismic events found.
        </div>
        <ul v-else class="list-group">
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="event in events"
            :key="event.id"
          >
            <div class="event-info">
              <b>{{ $prismic.asText(event.data.event_title) }}</b>
              <br />
              <small>Date: {{ event.data.event_date | moment("DD MMM YYYY") }}</small>
              <br />
              <small>UID: {{ event.uid }}</small>
            </div>
            <div class="event-actions">
              <nuxt-link
                :to="`/admin-dash/events/${event.uid}`"
                class="btn btn-sm btn-info edit-btn"
                >Edit</nuxt-link
              >
              <button
                @click="confirmDelete(event.id)"
                class="btn btn-sm btn-danger delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PrismicEventsAdmin",
  data() {
    return {
      events: [],
      loading: true,
      error: null,
      user: null, // For Firebase authentication check
    };
  },
  filters: {
    moment: function (date, format) {
      if (!date) return "";
      return moment(date).format(format);
    },
  },
  async fetch() {
    // This runs on server-side and client-side on route visit
    try {
      // Use Prismic Content API to fetch events
      const response = await this.$prismic.client.query(
        this.$prismic.Predicates.at("document.type", "event"),
        { orderings: "[my.event.event_date desc]" }
      );
      this.events = response.results;
    } catch (err) {
      console.error("Error fetching Prismic events:", err);
      this.error = "Failed to load Prismic events.";
    } finally {
      this.loading = false;
    }
  },
  mounted() {
    // Firebase Auth check
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;
      if (!this.user) {
        this.$router.replace("/admin-dash/auth");
      }
      // Re-fetch events if user logs in on this page or during SSR hydration
      if (process.client && !this.loading && this.events.length === 0 && !this.error) {
        this.$fetch();
      }
    });
  },
  methods: {
    async confirmDelete(eventId) {
      if (
        confirm(
          "Are you sure you want to delete this Prismic event? This action cannot be undone."
        )
      ) {
        try {
          // Call your Nuxt server route to delete the event from Prismic
          await this.$axios.delete(`/.netlify/functions/delete-event/${eventId}`);
          alert("Event deleted successfully!");
          this.$fetch(); // Re-fetch events to update the list
        } catch (error) {
          console.error(
            "Error deleting Prismic event:",
            error.response ? error.response.data : error.message
          );
          alert("Failed to delete event. Check console for details.");
        }
      }
    },
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("/admin-dash/auth");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* Re-using styles from your existing admin dashboard, adapting where needed */
.wrapper {
  padding-top: 20px;
  padding-bottom: 40px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 15px;

  h1 {
    font-size: 2.5em;
    color: #343a40;
    margin: 0;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  span {
    color: #6c757d;
    font-size: 0.95em;
  }

  .back-link,
  .logout-link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}

.admin-actions {
  margin-bottom: 20px;
}

.add-event-btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  background-color: #28a745; /* Success green */
  color: white;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #218838;
  }
}

.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-group-item {
  background-color: #f8f9fa;
  color: #343a40;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #e2f0ff;
  }

  b {
    font-size: 1.1em;
    display: block;
    margin-bottom: 5px;
  }

  small {
    font-size: 0.9em;
    line-height: 1.5;
    color: #6c757d;
  }

  .event-actions {
    display: flex;
    gap: 10px;
  }

  .edit-btn {
    background-color: #ffc107; /* Warning yellow */
    color: #333;
    padding: 8px 12px;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #e0a800;
    }
  }

  .delete-btn {
    background-color: #dc3545; /* Danger red */
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #c82333;
    }
  }
}

.loading-message,
.error-message,
.no-events-message {
  text-align: center;
  padding: 30px;
  font-size: 1.1rem;
  color: #6c757d;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}
</style>
