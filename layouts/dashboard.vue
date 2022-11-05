<template>
  <div>
    <nuxt />
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
  margin-top: 0px !important;
  background: linear-gradient(to right, #ff8a00, #da1b60);
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: white;
  }
}
</style>