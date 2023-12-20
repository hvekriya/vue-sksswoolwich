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
  background-image: url("https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: white;
  }
}
</style>

<style lang="scss" scoped>
#__layout {
  margin-top: 5px;
}
</style>
