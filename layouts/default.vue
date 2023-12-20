<template>
  <div>
    <HeaderPrismic />
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

<style lang="sass" scoped>
#__layout
  margin-top: 40px
</style>
