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
    <prismic-rich-text :field="fields.content" class="description" />
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">
        {{ $prismic.richTextAsPlain(fields.ctaText) }}
      </prismic-link>
    </div>
    <hr>
    <h5>Posted on {{fields.postedDate | formatDate }}</h5>
    <hr>
  </div>
</template>

<script>
  export default {
    name: 'Post',
    data() {
      return {
        documentId: '',
        fields: {
          title: null,
          content: null,
          ctaLink: null,
          ctaText: null,
          postedDate: null,
          cover: null
        }
      }
    },
    methods: {
      getContent(uid) {
        this.$prismic.client.getByUID('blog', uid)
          .then((document) => {
            if (document) {
              this.documentId = document.id
              this.fields.title = document.data.title
              this.fields.content = document.data.content
              this.fields.ctaLink = document.data.cta_link
              this.fields.ctaText = document.data.cta_text
              this.fields.postedDate = document.first_publication_date
              if (document.data.cover.url) {
                this.fields.cover = document.data.cover
              }
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

<style land="sass">
  .wrapper {
    margin-left: auto;
    margin-right: auto;
    padding: 40px 10px;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .title {
    font-size: 32px;
  }

  .description {
    margin-top: 40px;
  }

  .description h2 {
    font-size: 24px;
  }

  .description h2:not(:first-child) {
    margin-top: 20px;
  }

  .description p {
    line-height: 1.5;
  }

  .description p:not(:first-child) {
    margin-top: 10px;
  }

  .description a {
    color: #404e9f;
  }

  .description a:hover {
    text-decoration: underline;
  }

  .cta-wrapper {
    margin-top: 40px;
  }

  .cta {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    background-color: #404e9f;
    color: white;
  }

  .icon-wrapper {
    margin-top: 40px;
  }

  .icon {
    max-width: 100%;
  }

</style>
