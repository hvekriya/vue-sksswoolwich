<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1 class="title">
        {{ $prismic.asText(fields.title) }}
      </h1>
    </header>

    <!-- Image Slider Slice -->
    <ImageSlider :fields="fields" />

    <prismic-rich-text :field="fields.description" class="description" />
    <div class="cta-wrapper">
      <prismic-link :field="fields.ctaLink" class="cta">
        {{ $prismic.asText(fields.ctaText) }}
      </prismic-link>
    </div>
    <div class="icon-wrapper">
      <prismic-image :field="fields.icon" class="icon" />
    </div>

    <WeddingContact />
    <br /><br />
  </div>
</template>

<script>
import WeddingContact from "../components/WeddingContact";
import ImageSlider from "../components/ImageSlider";
export default {
  name: "WeddingHall",
  components: {
    WeddingContact,
    ImageSlider,
  },
  data() {
    return {
      documentId: "",
      fields: {
        title: null,
        description: null,
        ctaLink: null,
        ctaText: null,
        slices: [],
      },
    };
  },
  methods: {
    getContent() {
      this.$prismic.api
        .getByUID("our-temple", "wedding-hall")
        .then((document) => {
          if (document) {
            this.documentId = document.id;
            this.fields.title = document.data.title;
            this.fields.description = document.data.content;
            this.fields.ctaLink = document.data.cta_link;
            this.fields.ctaText = document.data.cta_text;
            this.fields.slices = document.data.body;
          } else {
            this.$router.push({
              name: "not-found",
            });
          }
        });
    },
  },
  created() {
    this.getContent();
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent();
    next();
  },
};
</script>
