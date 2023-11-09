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

    <form
      name="contactus"
      action="/thanks"
      method="post"
      netlify
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contactus" />

      <div class="input-group">
        <span class="input-group-addon" id="name">Name</span>
        <input
          type="text"
          class="form-control"
          name="name"
          placeholder="Name"
          aria-describedby="name"
        />
      </div>

      <div class="input-group">
        <span class="input-group-addon" id="email">Email</span>
        <input
          type="text"
          class="form-control"
          name="email"
          placeholder="Name"
          aria-describedby="email"
        />
      </div>

      <div class="input-group">
        <span class="input-group-addon" id="message">Message</span>
        <input
          type="textarea"
          class="form-control"
          name="message"
          placeholder="Name"
          aria-describedby="message"
        />
      </div>

      <button type="submit" value="Send message" class="btn btn-default">
        Send
      </button>
    </form>

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
