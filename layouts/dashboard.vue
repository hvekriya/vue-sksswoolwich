<template>
  <div>
    <nuxt class="dashboard_layout" />
    <FooterPrismic />
  </div>
</template>

<script>
import FooterPrismic from "~/components/MainFooter";
import HeaderPrismic from "~/components/Header.vue";

export default {
  components: {
    FooterPrismic,
    HeaderPrismic,
  },
  head() {
    return {
      title: "Woolwich Temple",
    };
  },
};
</script>

<style lang="scss">
#__nuxt {
  margin-top: 5px !important;
}

.dashboard_layout {
  background: $gray-800;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: white;
  }
}
</style>