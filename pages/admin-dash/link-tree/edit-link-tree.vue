<template>
  <div v-if="currentLink" class="edit-form">
    <h4>Edit Link Tree Item</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentLink.title"
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
          v-model="currentLink.link"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <wysiwyg
          v-model="currentLink.description"
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
          v-model="currentLink.order"
        />
      </div>
    </form>
    <button type="submit" class="btn btn-success" @click="updateLink">
      Update
    </button>
    <button
      class="btn btn-danger mr-2"
      @click="deleteLink"
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
    <p>Please click on a link...</p>
  </div>
</template>

<script>
export default {
  name: "Annoucement",
  props: ["linkItem"],
  data() {
    return {
      currentLink: null,
      message: "",
      user: "",
    };
  },
  watch: {
    linkItem: function (linkItem) {
      this.currentLink = { ...linkItem };
      this.message = "";
    },
  },
  methods: {
    updateLink() {
      const data = {
        title: this.currentLink.title,
        link: this.currentLink.link,
        description: this.currentLink.description,
        order: this.currentLink.order,
      };
      this.$fire.database
        .ref("/link-tree")
        .child(this.currentLink.key)
        .update(data)
        .then(() => {
          this.message = "The annoucement was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteLink() {
      this.$fire.database
        .ref("/link-tree")
        .child(this.currentLink.key)
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
    this.currentLink = { ...this.linkItem };
  },
};
</script>

<style lang="scss" scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
