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
      this.$router.push({
        path: "/search_results",
        query: { search: this.search_query },
      });
    },
  },
};
</script>
