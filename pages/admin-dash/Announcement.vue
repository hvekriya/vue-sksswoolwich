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
        <label for="description">Description</label>
        <wysiwyg
          v-model="announcement.description"
          name="description"
          id="description"
          :hide="hide"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentAnnouncement.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentAnnouncement.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteAnnouncement">
      Delete
    </button>
    <button
      type="submit"
      class="badge badge-success"
      @click="updateAnnouncement"
    >
      Update
    </button>
    <p>{{ message }}</p>
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
      hide: {
        bold: true,
      },
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
