<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="show" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h4>Edit Announcement</h4>
          <button type="button" class="close-button" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body">
          <div v-if="currentAnnouncement" class="edit-form">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="currentAnnouncement.title"
                />
              </div>
              <div class="form-group">
                <label for="order"
                  >Order (1 Appears first in the list and so on...)</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="order"
                  v-model="currentAnnouncement.order"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <wysiwyg
                  v-model="currentAnnouncement.description"
                  name="description"
                  id="description"
                />
              </div>
            </form>
          </div>
          <div v-else>
            <p>No announcement selected for editing.</p>
          </div>
        </div>

        <div class="modal-footer">
          <p v-if="message" class="message">{{ message }}</p>
          <button type="submit" class="btn btn-success" @click="updateAnnouncement">
            Update
          </button>
          <button class="btn btn-danger" @click="deleteAnnouncement">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AnnouncementEditorModal",
  props: {
    announcement: {
      type: Object,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentAnnouncement: null,
      message: "",
      user: null,
    };
  },
  watch: {
    announcement: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.currentAnnouncement = { ...newVal };
          this.message = "";
        } else {
          this.currentAnnouncement = null;
        }
      },
    },
    show(newVal) {
      if (newVal) {
        this.currentAnnouncement = this.announcement ? { ...this.announcement } : null;
        this.message = "";
        // Disable body scroll when modal is open
        document.body.style.overflow = "hidden";
      } else {
        // Re-enable body scroll when modal closes
        document.body.style.overflow = "";
      }
    },
  },
  methods: {
    updateAnnouncement() {
      console.log("Attempting update. Current user:", this.user); // <-- ADD THIS
      if (!this.currentAnnouncement || !this.currentAnnouncement.key) {
        this.message = "No announcement selected for update.";
        return;
      }
      const data = {
        title: this.currentAnnouncement.title,
        order: parseInt(this.currentAnnouncement.order),
        description: this.currentAnnouncement.description,
      };
      this.$fire.database
        .ref("/annoucements") // Assuming this is the correct path
        .child(this.currentAnnouncement.key)
        .update(data)
        .then(() => {
          this.message = "The announcement was updated successfully!";
          this.$emit("refreshList");
          this.$emit("updated");
          this.closeModal();
        })
        .catch((e) => {
          console.error("Error updating announcement:", e);
          this.message = "Error updating announcement.";
        });
    },
    deleteAnnouncement() {
      if (!this.currentAnnouncement || !this.currentAnnouncement.key) {
        this.message = "No announcement selected for deletion.";
        return;
      }
      if (confirm("Are you sure you want to delete this announcement?")) {
        this.$fire.database
          .ref("/annoucements") // Assuming this is the correct path
          .child(this.currentAnnouncement.key)
          .remove()
          .then(() => {
            this.message = "Announcement deleted successfully!";
            this.$emit("refreshList");
            this.closeModal();
          })
          .catch((e) => {
            console.error("Error deleting announcement:", e);
            this.message = "Error deleting announcement.";
          });
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;
      if (!this.user) {
        this.$router.replace("/admin-dash/auth");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  // Make sure it doesn't push down content, especially on mobile when keyboard appears
  overflow-y: auto; // Allow overlay to scroll if content plus keyboard makes it too tall
  -webkit-overflow-scrolling: touch; // Smooth scrolling for iOS
}

/* Modal Container */
.modal-container {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 700px;
  max-height: 90vh; /* Keep max-height for larger screens */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative; // For better positioning of elements inside
  margin: 20px; // Add some margin around the modal for breathing room
}

/* Modal Header */
.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    margin: 0;
    color: #343a40;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }
  .close-button {
    background: none;
    border: none;
    font-size: 1.8em;
    color: #888;
    cursor: pointer;
    line-height: 1;
    padding: 5px;
    &:hover {
      color: #333;
    }
  }
}

/* Modal Body (Content Area) */
.modal-body {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto; /* Enable scrolling for content if it overflows */
  -webkit-overflow-scrolling: touch; // Smooth scrolling for iOS
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
  }
  .form-control {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    line-height: 1.5;
    color: #495057;
    box-sizing: border-box;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      outline: none;
    }
  }
  .wysiwyg {
    border: 1px solid #ced4da;
    border-radius: 5px;
    :deep(.wysiwyg__toolbar) {
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 8px 10px;
    }
    :deep(.wysiwyg__editor) {
      min-height: 150px;
      padding: 10px 12px;
      font-size: 1rem;
      line-height: 1.6;
      color: #343a40;
    }
  }
}

/* Modal Footer (Buttons Area) */
.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  .message {
    margin-right: auto;
    color: #28a745;
    font-family: "Roboto", sans-serif;
    font-size: 0.9em;
  }

  .btn {
    padding: 10px 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &.btn-success {
      background-color: #28a745;
      color: #fff;
      border: 1px solid #28a745;
      &:hover {
        background-color: #218838;
      }
    }
    &.btn-danger {
      background-color: #dc3545;
      color: #fff;
      border: 1px solid #dc3545;
      &:hover {
        background-color: #c82333;
      }
    }
  }
}

button.btn.btn-danger {
  margin-left: 0 !important;
}

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

/* Optional: Add a scale effect for the container */
.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}
.modal-fade-enter .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95);
}

// ===========================================
// Mobile-specific CSS Adjustments (Media Queries)
// ===========================================

// For screens smaller than 768px (common breakpoint for tablets/mobiles)
@media (max-width: 767px) {
  .modal-container {
    width: 95%; // Take up more width on smaller screens
    margin: 10px; // Reduce outside margin
    max-height: 95vh; // Allow it to be taller vertically
    border-radius: 5px; // Slightly less rounded corners for tighter fit
  }

  .modal-header {
    padding: 12px 15px; // Reduced padding
    h4 {
      font-size: 1.2em; // Slightly smaller title
    }
    .close-button {
      font-size: 1.5em; // Slightly smaller close button
      padding: 3px;
    }
  }

  .modal-body {
    padding: 15px; // Reduced padding in body
  }

  .form-group {
    margin-bottom: 15px; // Slightly less margin
    label {
      font-size: 0.95rem; // Slightly smaller label font
      margin-bottom: 5px;
    }
    .form-control {
      padding: 10px 12px; // Reduced padding in input fields
      font-size: 1rem; // Adjusted input font size
    }
    .wysiwyg {
      :deep(.wysiwyg__toolbar) {
        padding: 5px 8px; // Reduced toolbar padding
      }
      :deep(.wysiwyg__editor) {
        min-height: 120px; // Slightly smaller editor height
        font-size: 0.95rem; // Adjusted editor font size
      }
    }
  }

  .modal-footer {
    flex-direction: column; // Stack buttons vertically
    align-items: stretch; // Make buttons full width
    padding: 15px; // Reduced padding
    gap: 10px; // Space between stacked buttons

    .message {
      margin-right: 0; // Remove auto margin when stacking
      margin-bottom: 10px; // Add space above buttons
      text-align: center; // Center message
      width: 100%; // Ensure message takes full width
    }

    .btn {
      width: 100%; // Full width buttons
      padding: 12px; // Make buttons taller
      font-size: 1rem;
    }
  }
}

// Further optimization for very small screens (e.g., old iPhones, etc.)
@media (max-width: 480px) {
  .modal-container {
    margin: 5px; // Even less margin
  }
}
</style>
