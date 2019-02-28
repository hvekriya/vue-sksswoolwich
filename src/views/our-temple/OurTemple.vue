<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <prismic-edit-button :documentId="documentId" />
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
    </header>
    <prismic-image :field="fields.cover" class="img-responsive" />
    <prismic-rich-text :field="fields.description" class="description" />
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">
        {{ $prismic.richTextAsPlain(fields.ctaText) }}
      </prismic-link>
    </div>
    <div class="icon-wrapper">
      <prismic-image :field="fields.icon" class="icon" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OurTemple',
    data() {
      return {
        documentId: '',
        fields: {
          title: null,
          description: null,
          ctaLink: null,
          ctaText: null
        }
      }
    },
    methods: {
      getContent(uid) {
        this.$prismic.client.getByUID('our-temple', uid)
          .then((document) => {
            if (document) {
              this.documentId = document.id
              this.fields.title = document.data.title
              this.fields.description = document.data.content
              this.fields.ctaLink = document.data.cta_link
              this.fields.ctaText = document.data.cta_text
            } else {
              this.$router.push({
                name: 'not-found'
              })
            }
          })
      }
    },
    created() {
      this.getContent(this.$route.params.uid)
    },
    beforeRouteUpdate(to, from, next) {
      this.getContent(to.params.uid)
      next()
    }
  }

</script>
