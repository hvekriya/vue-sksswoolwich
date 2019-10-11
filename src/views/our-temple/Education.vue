<template>
  <div class="wrapper container">
    <prismic-edit-button :documentId="documentId" />
    <header class="page-header">
      <h1 class="title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
    </header>
    <prismic-image :field="fields.cover" class="img-responsive" />
    <prismic-rich-text :field="fields.description" class="description" />
    <div class="cta-wrapper">
      <prismic-link
        :field="fields.ctaLink"
        class="cta"
      >{{ $prismic.richTextAsPlain(fields.ctaText) }}</prismic-link>
    </div>
    <div class="icon-wrapper">
      <prismic-image :field="fields.icon" class="icon" />
    </div>

    <!-- Form -->

    <div class="row">
      <div class="col-md-8">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSe8dPqlVQR04KZAuk-K3_FOusWqrYSC7xaB_a_yz3PUM-He0g/viewform?embedded=true"
          width="100%"
          height="1000"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >Loading...</iframe>
        <!-- </div> -->
      </div>

      <div class="col-md-4">
        <legend>
          <span class="glyphicon glyphicon-map-marker"></span> Our Location
        </legend>
        <address>
          <strong>SKSS Temple Woolwich</strong>
          <br />St. Margarets Grove,
          <br />London, SE18 7RL
          <br />
          <abbr title="Phone">P:</abbr>
          <a href="tel:+442088540823">+442088540823</a>
        </address>
        <address>
          <strong>Admin</strong>
          <br />
          <a href="mailto:info@sksswoolwich.org">info@sksswoolwich.org</a>
        </address>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      documentId: "",
      fields: {
        title: null,
        description: null,
        ctaLink: null,
        ctaText: null
      }
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client
        .getByUID("our-temple", "swaminarayan-education")
        .then(document => {
          if (document) {
            this.documentId = document.id;
            this.fields.title = document.data.title;
            this.fields.description = document.data.content;
            this.fields.ctaLink = document.data.cta_link;
            this.fields.ctaText = document.data.cta_text;
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
