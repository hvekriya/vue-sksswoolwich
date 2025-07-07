<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Announcements</h1>
      <div v-if="user">
        <span>{{ user.email }} | </span>
        <a @click="logout" class="logout-link">Logout</a>
        <span> | </span>
        <nuxt-link to="/admin-dash/sitebuild" class="rebuild-link"
          >Rebuild the website</nuxt-link
        >
      </div>
    </header>
    <div class="list row">
      <div class="col-md-6">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(announcement, index) in sortedAnnouncements"
            :key="announcement.key || index"
            @click="openEditModal(announcement, index)"
          >
            <b>{{ announcement.order }}. {{ announcement.title }}</b>
            <br />
            <small v-html="announcement.description"></small>
          </li>
        </ul>
        <div class="admin-actions">
          <nuxt-link
            to="/admin-dash/new-announcement"
            class="btn btn-primary add-announcement-btn"
          >
            Add new announcement
          </nuxt-link>
        </div>
      </div>
      <div class="col-md-6 info-card-right">
        <br />
        <p>Click on an announcement to edit/update/delete...</p>
        <p>
          You can use
          <a
            href="https://gujarati.indiatyping.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://gujarati.indiatyping.com/
          </a>
          to type english lipi to gujarati
        </p>
      </div>
    </div>

    <AnnouncementEditorModal
      :show="showEditModal"
      :announcement="selectedAnnouncement"
      @close="showEditModal = false"
      @refreshList="refreshList"
      @updated="onAnnouncementUpdated"
    />
  </div>
</template>

<script>
import AnnouncementEditorModal from "./AnnouncementEditorModal.vue"; // Renamed and imported as modal
export default {
  name: "AnnouncementsAdmin",
  components: { AnnouncementEditorModal }, // Use the new component name
  data() {
    return {
      announcements: [],
      // currentAnnouncements: null, // No longer needed directly for rendering the editor here
      currentIndex: -1, // Still useful for active state in list
      user: null,
      showEditModal: false, // Control modal visibility
      selectedAnnouncement: null, // The announcement object passed to the modal
    };
  },
  methods: {
    onDataChange(snapshot) {
      let _announcements = [];
      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        _announcements.push({
          key: childSnapshot.key,
          order: data.order,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.announcements = _announcements;
    },
    refreshList() {
      // This method now primarily ensures the list is up-to-date and modal is reset
      this.selectedAnnouncement = null;
      this.currentIndex = -1;
      this.showEditModal = false; // Ensure modal closes
      // Firebase `on('value')` listener will automatically re-run `onDataChange`
      // when data changes, so a manual re-fetch isn't usually needed here.
    },
    // New method to open the modal
    openEditModal(announcement, index) {
      this.selectedAnnouncement = announcement; // Set the announcement to be edited
      this.currentIndex = index; // Set active state in the list
      this.showEditModal = true; // Show the modal
    },
    onAnnouncementUpdated() {
      // This is a new method to handle updates from the modal.
      // Firebase's real-time nature means `onDataChange` will fire automatically,
      // updating `this.announcements`. We just need to make sure `selectedAnnouncement`
      // in the parent is also updated if needed, or simply rely on the full list refresh.
      // For simplicity, we'll let Firebase reactivity handle the list update.
      // If the modal makes changes, the main list will automatically reflect them.
      // We don't need to manually update `selectedAnnouncement` here as it's a copy passed to the modal.
      // The `refreshList` will implicitly handle necessary state resets.
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
  computed: {
    sortedAnnouncements: function () {
      return this.announcements.slice().sort(function (a, b) {
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });
    },
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;

      if (!this.user) {
        this.$router.replace("/admin-dash/auth");
      } else {
        this.$fire.database.ref("/annoucements").on("value", this.onDataChange);
      }
    });
  },
  beforeDestroy() {
    this.$fire.database.ref("/annoucements").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
/* Keep the general styles for the Announcements Admin page */
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

  span {
    color: #6c757d;
    font-size: 0.95em;
  }

  .logout-link,
  .rebuild-link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}

/* List Group Styling */
.list-group {
  margin: 0;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;

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
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #e2f0ff;
    }

    &.active {
      background-color: #007bff;
      color: #ffffff;
      border-color: #007bff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);

      & small {
        color: white;
      }
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
      .active & {
        color: #e9ecef;
      }
    }
  }
}

/* Admin Actions Buttons */
.admin-actions {
  margin-top: 20px;
  margin-bottom: 20px;
}

.add-announcement-btn {
  display: inline-block;
  width: auto;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

/* Right Column Info Card */
.info-card-right {
  /* Specific class for this column's info card */
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: #555;

  p {
    margin-bottom: 10px;
    line-height: 1.6;
  }

  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

// Responsive adjustments
@media (max-width: 767px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-top: 10px;
    }
  }

  .col-md-6 {
    margin-bottom: 20px;
  }
}
</style>
