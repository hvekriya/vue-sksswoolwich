<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.asText(fields.title) }}
      </h1>
    </header>
    <prismic-image :field="fields.cover" class="img-responsive" />
    <prismic-rich-text :field="fields.description" class="description" />
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">
        {{ $prismic.asText(fields.ctaText) }}
      </prismic-link>
    </div>
    <div class="icon-wrapper">
      <prismic-image :field="fields.icon" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "OurTemple",
  async asyncData({ $prismic, params }) {
    try {
      const document = await $prismic.api.getByUID("our-temple", params.uid);
      return {
        documentId: document.id,
        fields: {
          title: document.data.title,
          description: document.data.content,
          ctaLink: document.data.cta_link,
          ctaText: document.data.cta_text,
        },
      };
    } catch (e) {
      console.log(e);
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
