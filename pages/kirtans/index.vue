<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <br />
      <h1 class="title">Kirtans</h1>
    </header>

    <div>
      <ul class="list-group" v-if="kirtans">
        <li
          class="list-group-item"
          v-for="(kirtan, index) in kirtans"
          :key="index"
        >
          <b>
            <NuxtLink :to="'/kirtans/' + kirtan.uid">{{
              $prismic.asText(kirtan.data.kirtan_title)
            }}</NuxtLink></b
          >
          <!-- <small v-html="annoucement.description"></small> -->
        </li>
      </ul>

      <!-- <prismic-rich-text :field="kirtans[0].data.kirtan_title" />
      <br />
      <prismic-rich-text :field="kirtans[0].data.kirtan_lyrics" />
      <br /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Kirtans",
  async asyncData({ $prismic, $axios, error }) {
    try {
      // Get kirtans data from Prismic
      const kirtansFromPrismic = await $prismic.api.query(
        $prismic.predicates.at("document.type", "kirtan")
      );
      const kirtans = kirtansFromPrismic.results;
      return {
        kirtans,
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
