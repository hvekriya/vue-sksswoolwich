<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>{{ isEditing ? "Edit Prismic Event" : "Create New Prismic Event" }}</h1>
      <div v-if="user" class="header-actions">
        <span>{{ user.email }} | </span>
        <nuxt-link to="/admin-dash/events" class="back-link"
          >Back to Events List</nuxt-link
        >
        <span> | </span>
        <a @click="logout" class="logout-link">Logout</a>
      </div>
    </header>

    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="event-title">Event Title:</label>
          <textarea
            id="event-title"
            v-model="form.event_title_plain"
            rows="3"
            required
            placeholder="e.g., Summer Festival 2025"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="event-date">Event Date:</label>
          <input type="date" id="event-date" v-model="form.event_date" required />
        </div>

        <div class="form-group">
          <label for="event-description-short">Short Description:</label>
          <textarea
            id="event-description-short"
            v-model="form.event_description_short_plain"
            rows="5"
            required
            placeholder="A brief summary of the event."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="poster-url">Poster Image URL:</label>
          <input
            type="text"
            id="poster-url"
            v-model="form.poster_url"
            placeholder="https://example.com/poster.jpg"
          />
          <img
            v-if="form.poster_url"
            :src="form.poster_url"
            alt="Poster Preview"
            class="poster-preview"
          />
          <small class="form-text text-muted"
            >For actual image uploads, you'd integrate with Prismic's media library or a
            third-party service.</small
          >
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="submitting" class="btn btn-submit">
            {{ submitting ? "Saving..." : isEditing ? "Update Event" : "Create Event" }}
          </button>
          <nuxt-link to="/admin-dash/events" class="btn btn-cancel">Cancel</nuxt-link>
        </div>
      </form>
      <p v-if="message" :class="messageType">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { RichText } from "prismic-dom";

export default {
  name: "PrismicEventForm",
  data() {
    return {
      form: {
        uid: null, // Used for routing
        event_title_plain: "",
        event_date: "",
        event_description_short_plain: "",
        poster_url: "",
      },
      isEditing: false,
      submitting: false,
      message: null,
      messageType: "",
      eventDocId: null, // Prismic's internal document ID, crucial for Management API updates/deletes
      user: null, // For Firebase authentication check
    };
  },
  async fetch() {
    const uid = this.$route.params.uid;
    if (uid && uid !== "new") {
      this.isEditing = true;
      try {
        // Fetch event data using Prismic Content API
        const response = await this.$prismic.client.getByUID("event", uid);
        const eventData = response.data;
        this.eventDocId = response.id; // Store Prismic document ID for updates/deletes

        this.form.uid = uid;
        this.form.event_title_plain = RichText.asText(eventData.event_title);
        this.form.event_date = eventData.event_date;
        this.form.event_description_short_plain = RichText.asText(
          eventData.event_description_short
        );
        this.form.poster_url = eventData.poster ? eventData.poster.url : "";
      } catch (err) {
        console.error("Error fetching event for edit:", err);
        this.message = "Failed to load event for editing.";
        this.messageType = "error";
      }
    }
  },
  mounted() {
    // Firebase Auth check
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;
      if (!this.user) {
        this.$router.replace("/admin-dash/auth");
      }
    });
  },
  methods: {
    async handleSubmit() {
      this.submitting = true;
      this.message = null;
      this.messageType = "";

      // Convert plain text fields to Prismic Rich Text JSON format
      // In a real application with a rich text editor, this JSON would come directly from the editor.
      const eventTitleRichText = [
        {
          type: "paragraph",
          text: this.form.event_title_plain,
          spans: [],
        },
      ];
      const eventDescriptionShortRichText = [
        {
          type: "paragraph",
          text: this.form.event_description_short_plain,
          spans: [],
        },
      ];

      // Prepare payload for your Nuxt server route
      const payload = {
        event_date: this.form.event_date,
        event_title_richtext: eventTitleRichText,
        event_description_short_richtext: eventDescriptionShortRichText,
        poster_image: this.form.poster_url
          ? { url: this.form.poster_url, alt: "Event Poster", copyright: null }
          : null,
      };

      try {
        let response;
        if (this.isEditing) {
          // Send to your Nuxt server PUT route with Prismic document ID
          response = await this.$axios.put(
            `/.netlify/functions/update-event/${this.eventDocId}`,
            payload
          );
        } else {
          // Send to your Nuxt server POST route
          response = await this.$axios.post(`/.netlify/functions/create-event`, payload);
        }
        this.message = response.data.message || "Event saved successfully!";
        this.messageType = "success";
        // Redirect after successful save
        this.$router.push("/admin-dash/events");
      } catch (error) {
        console.error(
          "Error saving Prismic event:",
          error.response ? error.response.data : error
        );
        this.message =
          error.response?.data?.statusMessage ||
          "Failed to save event. Check console for details.";
        this.messageType = "error";
      } finally {
        this.submitting = false;
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
/* Consistent styling with other admin pages */
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

.form-container {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #343a40;
  font-size: 1.1em;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.poster-preview {
  max-width: 200px; /* Adjust as needed */
  height: auto;
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  display: block;
}

.form-text {
  font-size: 0.85em;
  color: #6c757d;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-submit,
.btn-cancel {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.05em;
  transition: background-color 0.2s ease-in-out;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  &:hover {
    background-color: #5a6268;
  }
}

.message {
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
