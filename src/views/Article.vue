<!-- Create file src/views/Page.vue -->

<template>
  <div class="wrapper container">
    <prismic-edit-button :documentId="documentId" />
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.richTextAsPlain(fields.title) }}
      </h1>
    </header>
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
    name: 'Post',
    data() {
      return {
        documentId: '',
        fields: {
          title: null,
          description: null,
          ctaLink: null,
          ctaText: null,
          icon: null
        }
      }
    },
    methods: {
      getContent(post) {
        this.$prismic.client.getSingle(post)
          .then((document) => {
            if (document) {
              this.documentId = document.id
              this.fields.title = document.data.title
              this.fields.description = document.data.content
              this.fields.ctaLink = document.data.cta_link
              this.fields.ctaText = document.data.cta_text
              this.fields.icon = document.data.icon
            } else {
              this.$router.push({
                name: 'not-found'
              })
            }
          })
      }
    },
    created() {
      this.getContent(this.$route.params.post)
    },
    beforeRouteUpdate(to, from, next) {
      this.getContent(to.params.post)
      next()
    }
  }

</script>

<style>
  .wrapper {
    max-width: 820px;
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
