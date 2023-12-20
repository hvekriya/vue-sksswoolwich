<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>TV Posters</h1>
      <div v-if="user">
        <span>{{ user.email }} | </span>
        <a @click="logout">Logout</a>
        <span> | </span>
        <nuxt-link to="/admin-dash/sitebuild">Rebuild the website</nuxt-link>
      </div>
    </header>
    <PinnedPosters />
    <Slideshow />
  </div>
</template>
<script>
import PinnedPosters from "../../components/admin/UploadPinnedPosters.vue";
import Slideshow from "../../components/admin/UploadSlideShow.vue";
export default {
  components: { PinnedPosters, Slideshow },
  data() {
    return {
      user: "",
    };
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

<style scoped>
table,
th,
td {
  padding: 20px;
  border: 1px solid black;
}
strong {
  font-weight: 900;
}
</style>
