<template>
  <div class="container">
    <div class="submit-form">
      <h1>New Annoucement</h1>
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="announcement.title"
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="announcement.description"
            name="description"
          />
        </div>
        <button @click="saveAnnouncement" class="btn btn-success">
          Submit
        </button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <a href="/admin-dash/announcements"> Go back to list of annoucements</a>
        <button class="btn btn-primary" @click="newAnnouncement">
          Add another
        </button>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: "NewAnnouncement",
  data() {
    return {
      announcement: {
        title: "",
        description: "",
        published: false,
      },
      user: "",
      submitted: false,
    };
  },
  methods: {
    saveAnnouncement() {
      const db = this.$fire.database.ref("/annoucements");
      var data = {
        title: this.announcement.title,
        description: this.announcement.description,
        published: false,
      };
      db.push(data)
        .then(() => {
          this.submitted = true;
          this.$router.replace("/admin-dash");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newAnnouncement() {
      this.submitted = false;
      this.announcement = {
        title: "",
        description: "",
        published: false,
      };
    },
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;

      if (!this.user) this.$router.replace("/admin-dash/auth");
    });
  },
};
</script>