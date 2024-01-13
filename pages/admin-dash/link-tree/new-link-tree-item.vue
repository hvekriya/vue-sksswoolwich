<template>
  <div class="container">
    <div class="submit-form">
      <br /><br />
      <h1>New Link Tree Item</h1>
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="linkTree.title"
            name="title"
          />
        </div>
        <div class="form-group">
          <label for="title"
            >Icon ID (Get the name from fontawesome.com and add the name like
            "fa-brands fa-instafram")</label
          >
          <input
            type="text"
            class="form-control"
            id="icon"
            required
            v-model="linkTree.icon"
            name="icon"
          />
        </div>
        <div class="form-group">
          <label for="title"
            >Link (url for example "https://sksswoolwich.org")</label
          >
          <input
            type="text"
            class="form-control"
            id="link"
            required
            v-model="linkTree.link"
            name="link"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <wysiwyg
            v-model="linkTree.description"
            name="description"
            id="description"
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
            v-model="linkTree.order"
          />
        </div>

        <button @click="saveLink" class="btn btn-success">
          Add new link tree item
        </button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <a href="/admin-dash/link-tree"> Go back to link tree list</a>
        <button class="btn btn-primary" @click="newLink">Add another</button>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: "NewLink",
  data() {
    return {
      linkTree: {
        title: "",
        link: "",
        icon: "",
        description: "",
        order: 0,
      },
      user: "",
      submitted: false,
    };
  },
  methods: {
    saveLink() {
      const db = this.$fire.database.ref("/link-tree");
      var data = {
        title: this.linkTree.title,
        link: this.linkTree.link,
        icon: this.linkTree.icon,
        description: this.linkTree.description,
        order: this.linkTree.order,
      };
      db.push(data)
        .then(() => {
          this.submitted = true;
          this.$router.replace("/admin-dash/link-tree");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newLink() {
      this.submitted = false;
      this.linkTree = {
        title: "",
        description: "",
        icon: "",
        link: "",
        description: "",
        order: 0,
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

<style lang="scss" scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
