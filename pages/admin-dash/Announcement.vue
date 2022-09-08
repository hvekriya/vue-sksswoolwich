<template>
  <div v-if="currentAnnouncement" class="edit-form">
    <h4>Announcement</h4>
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
      <!-- <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentAnnouncement.published ? "Published" : "Pending" }}
      </div> -->
    </form>
    <button type="submit" class="btn btn-success" @click="updateAnnouncement">
      Update
    </button>
    <!-- <button
      class="btn btn-secondary mr-2"
      v-if="currentAnnouncement.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="btn btn-secondary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->
    <button
      class="btn btn-danger mr-2"
      @click="deleteAnnouncement"
      style="float: right"
    >
      Delete
    </button>
    <p>{{ message }}</p>
    <br />
    <br />
  </div>
  <div v-else>
    <br />
    <p>Please click on a Announcement...</p>
  </div>
</template>

<script>
export default {
  name: "Annoucement",
  props: ["announcement"],
  data() {
    return {
      currentAnnouncement: null,
      message: "",
      user: "",
    };
  },
  watch: {
    announcement: function (announcement) {
      this.currentAnnouncement = { ...announcement };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      this.$fire.database
        .ref("/annoucements")
        .child(this.currentAnnouncement.key)
        .update({
          published: status,
        })
        .then(() => {
          this.currentAnnouncement.published = status;
          this.message = "The annoucement status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateAnnouncement() {
      const data = {
        title: this.currentAnnouncement.title,
        order: this.currentAnnouncement.order,
        description: this.currentAnnouncement.description,
      };
      this.$fire.database
        .ref("/annoucements")
        .child(this.currentAnnouncement.key)
        .update(data)
        .then(() => {
          this.message = "The annoucement was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteAnnouncement() {
      this.$fire.database
        .ref("/annoucements")
        .child(this.currentAnnouncement.key)
        .remove()
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;

      if (!this.user) this.$router.replace("/admin-dash/auth");
    });
    this.message = "";
    this.currentAnnouncement = { ...this.announcement };
  },
};
</script>

<style lang="scss" scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
