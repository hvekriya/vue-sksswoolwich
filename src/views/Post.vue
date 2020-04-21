<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <prismic-edit-button :documentId="documentId" />
    <header class="page-header">
      <h1 class="title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
    </header>
    <prismic-image v-if="fields.cover" :field="fields.cover" class="img-responsive" />
    <prismic-rich-text :field="fields.content" class="description" />
    <div class="cta-wrapper">
      <prismic-link
        :field="fields.ctaLink"
        class="cta"
      >{{ $prismic.richTextAsPlain(fields.ctaText) }}</prismic-link>
    </div>
    <hr />
    <h5>Posted on {{fields.postedDate | formatDate }} by {{fields.postedBy}}</h5>
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
  data() {
    return {
      documentId: "",
      fields: {
        title: null,
        content: null,
        ctaLink: null,
        ctaText: null,
        postedDate: null,
        cover: null,
        postedBy: null
      }
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client.getByUID("blog", uid).then(document => {
        if (document) {
          this.documentId = document.id;
          this.fields.title = document.data.title;
          this.fields.content = document.data.content;
          this.fields.ctaLink = document.data.cta_link;
          this.fields.ctaText = document.data.cta_text;
          this.fields.postedDate = document.first_publication_date;
          this.fields.postedBy = document.data.posted_by;
          if (document.data.cover.url) {
            this.fields.cover = document.data.cover;
          }
        } else {
          this.$router.push({
            name: "not-found"
          });
        }
      });
    }
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  }
};
</script>
