<template>
  <div class="navbar-form" id="search">
    <div class="form-group">
      <input
        type="text"
        class="form-control search"
        placeholder="Search"
        v-model="search_query"
      />
    </div>
    <button class="btn btn-primary search" v-on:click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      search_query: "",
    };
  },
  methods: {
    search: function () {
      console.log("current route is: " + this.$route.path);
      if (this.$route.path !== "/search") {
        this.$router.push({
          path: "/search",
          query: { search: this.search_query },
        });
      } else {
        this.$router.push({
          path: "/search",
          query: { search: this.search_query },
        });
        window.location.reload();
      }
    },
  },
};
</script>
