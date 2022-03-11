<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">{{ $prismic.asText(fields.title) }}</h1>
    </header>
    <prismic-image
      v-if="fields.cover"
      :field="fields.cover"
      class="img-responsive"
    />
    <prismic-rich-text :field="fields.content" class="description" />
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">{{
        $prismic.asText(fields.ctaText)
      }}</prismic-link>
    </div>
    <hr />
    <h5>
      Posted on {{ fields.postedDate | formatDate }} by {{ fields.postedBy }}
    </h5>
    <hr />

    <div class="sharethis-inline-reaction-buttons"></div>
    <div class="sharethis-inline-share-buttons"></div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Post",
  async asyncData({ $prismic, params, error }) {
    try {
      const document = await $prismic.api.getByUID("blog", params.uid);
      return {
        fields: {
          documentId: document.id,
          title: document.data.title,
          content: document.data.content,
          ctaLink: document.data.cta_link,
          ctaText: document.data.cta_text,
          postedDate: document.first_publication_date,
          postedBy: document.data.posted_by,
          cover: document.data.cover,
        },
      };
    } catch (e) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
};
</script>
