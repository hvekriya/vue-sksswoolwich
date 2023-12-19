<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <br />
      <a href="/kirtans">
        <i class="fas fa-arrow-left"></i> Back to all kirtans</a
      >
      <h1 class="title">{{ $prismic.asText(kirtans.kirtan_title) }}</h1>
    </header>

    <div>
      <prismic-rich-text :field="kirtans.kirtan_lyrics" class="lyrics" />
      <br />
      <h2>Other details</h2>
      <p><strong>Composer:</strong> {{ $prismic.asText(kirtans.composer) }}</p>
      <prismic-embed :field="kirtans.variations" />
      <prismic-image :field="kirtans.image_attachments" />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "KirtanLyrics",
  async asyncData({ $prismic, $axios, error, params }) {
    try {
      // Get kirtans data from Prismic
      const kirtansFromPrismic = await $prismic.api.getByUID(
        "kirtan",
        params.uid
      );
      const kirtans = kirtansFromPrismic.data;
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
