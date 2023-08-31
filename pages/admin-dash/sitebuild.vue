<template>
  <div class="container">
    <header class="page-header">
      <h1>Re build the website</h1>
      <div v-if="user">
        <span>{{ user.email }} | </span>
        <a @click="logout">Logout</a>
      </div>
    </header>
    <br />
    <br />
    <p>
      This feature allows to re build the site if you have made change like uploaded
      photos to flickr and they are not appearing. It will sync all the changes and build
      fresh website with up to date data. Please use this feature wisely as using it too
      much in one can go queue up lots of builds and it will take time
    </p>
    <br />
    <br />
    <button class="btn btn-primary" @click="reBuildSite" v-if="!build">
      Rebuild the site now
    </button>
    <code v-else>
      Website is getting built again. This can take up to 3-5 mins. Force refresh the page
      using cmd+shift+R or ctrl+shift+R after 3 mins.
    </code>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: "SiteBuild",
  data() {
    return {
      user: "",
      build: false,
    };
  },
  methods: {
    reBuildSite() {
      this.$axios
        .post(
          `https://api.netlify.com/build_hooks/${process.env.buildID}?trigger_title=Deploy+triggered+by+sksswoolwich+admin`
        )
        .then((response) => {
          if (response.status === 200) {
            this.build = true;
          }
        });
    },
    logout() {
      this.$fire.auth.signOut().then((result) => {
        this.user = "";
        this.$router.push("/admin-dash/auth");
      });
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
