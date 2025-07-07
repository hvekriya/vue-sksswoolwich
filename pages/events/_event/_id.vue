<template>
  <div class="events-page-wrapper container">
    <header class="page-header">
      <h1 class="page-title">{{ eventDetails.data.event_title[0].text }}</h1>
    </header>

    <nav class="breadcrumbs-container">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
          <NuxtLink to="/events" class="breadcrumb-link">Events</NuxtLink>
        </li>
        <li class="breadcrumb-item is-active">
          {{ eventDetails.data.event_title[0].text }}
        </li>
      </ol>
    </nav>

    <section class="event-detail-content-section">
      <div class="event-description">
        <prismic-rich-text :field="eventDetails.data.event_description" />
      </div>

      <div
        class="event-posters-grid"
        v-if="eventDetails.data.poster.url || eventDetails.data.poster_2.url"
      >
        <div class="poster-item" v-if="eventDetails.data.poster.url">
          <a
            :href="eventDetails.data.poster.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-lazy-image
              :src="eventDetails.data.poster.url"
              :alt="eventDetails.data.poster.alt || 'Event Poster 1'"
              class="poster-image"
            />
          </a>
        </div>
        <div class="poster-item" v-if="eventDetails.data.poster_2.url">
          <a
            :href="eventDetails.data.poster_2.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-lazy-image
              :src="eventDetails.data.poster_2.url"
              :alt="eventDetails.data.poster_2.alt || 'Event Poster 2'"
              class="poster-image"
            />
          </a>
        </div>
      </div>

      <div v-if="album && album.photo && album.photo.length" class="event-photos-section">
        <h2 class="section-sub-heading">Event Gallery</h2>
        <div id="lightgallery" class="lightgallery-grid">
          <a
            v-for="(photo, index) in album.photo"
            :key="index"
            :href="photo.url_o"
            class="gallery-item"
            :data-src="photo.url_o"
            :data-sub-html="photo.title ? `<h4>${photo.title}</h4>` : ''"
          >
            <v-lazy-image
              :src="photo.url_n || photo.url_sq || ''"
              :alt="photo.title || 'Event Photo'"
              class="gallery-image"
            />
          </a>
        </div>

        <div class="flickr-album-link" v-if="photosetId">
          <a
            :href="flickrPhotosetWebUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="button button-flickr"
          >
            <i class="fab fa-flickr"></i> View Full Album on Flickr
          </a>
        </div>
      </div>
      <div v-else class="alert-message no-photos-alert">
        <p>No photos found for this event yet. Please check back later!</p>
      </div>

      <div class="social-share-section">
        <h3 class="share-heading">Share This Event:</h3>
        <div class="social-links">
          <a
            :href="facebookShareUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon facebook"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
          <a
            :href="twitterShareUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon twitter"
          >
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div class="copyright-notice">
        <p>All images &copy; {{ currentYear }} Woolwich Temple. All Rights Reserved.</p>
      </div>
    </section>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image/v2";

export default {
  name: "EventDetailPage",
  components: {
    VLazyImage,
  },
  data() {
    return {
      lgInstance: null, // To store the lightgallery instance
      currentYear: new Date().getFullYear(),
      facebookShareUrl: "",
      twitterShareUrl: "",
      photosetId: null, // Store photosetId to use in template
      flickrPhotosetWebUrl: "", // Store Flickr web URL
    };
  },
  head() {
    if (!this.eventDetails || !this.eventDetails.data) {
      return {};
    }

    const eventTitle = this.eventDetails.data.event_title[0]?.text || "Event Details";
    const eventDescription =
      this.$prismic.asText(this.eventDetails.data.event_description) ||
      "Details about the event.";
    const eventPosterUrl = this.eventDetails.data.poster?.url || "";
    const eventUid = this.eventDetails.uid || "";

    return {
      title: `${eventTitle} | SKSS Temple Woolwich`,
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: eventDescription,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://www.sksswoolwich.org/events/${eventUid}`,
        },
        { hid: "og:title", property: "og:title", content: eventTitle },
        { hid: "og:description", property: "og:description", content: eventDescription },
        { hid: "og:image", property: "og:image", content: eventPosterUrl },
        { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: `https://www.sksswoolwich.org/events/${eventUid}`,
        },
        { hid: "twitter:title", name: "twitter:title", content: eventTitle },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: eventDescription,
        },
        { hid: "twitter:image", name: "twitter:image", content: eventPosterUrl },
        { hid: "twitter:image:alt", name: "twitter:image:alt", content: eventTitle },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery.min.css",
        },
      ],
    };
  },
  async asyncData({ $prismic, $axios, params, error }) {
    let eventDetails = null;
    let album = null;
    let photosetId = null; // Declare photosetId here to pass it to the component

    try {
      const eventUid = params.event;
      eventDetails = await $prismic.api.getByUID("events", eventUid);

      if (!eventDetails) {
        throw new Error("Event not found");
      }

      photosetId = eventDetails.data.flickr_photoset_id || params.id;

      if (photosetId) {
        const flickrConfig = {
          api_key: process.env.flickrApiKey,
          user_id: process.env.flickrUserId,
          format: "json",
          nojsoncallback: 1,
        };
        const flickrApiUrl = process.env.flickrUrl; // Use a different name to avoid confusion with public URL

        try {
          const set = await $axios.get(flickrApiUrl, {
            params: {
              ...flickrConfig,
              method: "flickr.photosets.getPhotos",
              photoset_id: photosetId,
              extras: "url_n, url_o, url_sq, title",
            },
          });
          if (set.data && set.data.photoset) {
            album = set.data.photoset;
          } else {
            console.warn("Flickr photoset data not found:", set.data);
          }
        } catch (flickrErr) {
          console.error("Error fetching Flickr album:", flickrErr);
          album = null;
        }
      }

      return {
        album,
        eventDetails,
        photosetId, // Return photosetId so it's available in data()
      };
    } catch (e) {
      console.error("Error in asyncData for EventDetailPage:", e);
      error({
        statusCode: e.message === "Event not found" ? 404 : 500,
        message: e.message || "Page not found",
      });
    }
  },
  watch: {
    album: {
      immediate: true,
      handler(newAlbum) {
        this.$nextTick(() => {
          if (
            newAlbum &&
            newAlbum.photo &&
            newAlbum.photo.length &&
            document.getElementById("lightgallery")
          ) {
            this.initLightgallery();
          } else if (this.lgInstance) {
            this.lgInstance.destroy();
            this.lgInstance = null;
          }
        });
      },
    },
  },
  methods: {
    initLightgallery() {
      if (this.lgInstance) {
        this.lgInstance.destroy();
        this.lgInstance = null;
      }

      const galleryElement = document.getElementById("lightgallery");

      if (galleryElement) {
        import("lightgallery")
          .then((module) => {
            const lightGallery = module.default || module;
            this.lgInstance = lightGallery(galleryElement, {
              speed: 500,
              selector: ".gallery-item",
            });
          })
          .catch((err) => {
            console.error("Failed to load lightgallery:", err);
          });
      }
    },
    updateShareUrls() {
      // This runs client-side after the page has loaded
      if (process.client) {
        const currentUrl = encodeURIComponent(window.location.href);
        const eventTitle = encodeURIComponent(
          this.eventDetails.data.event_title[0]?.text || "Event Details"
        );

        this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        this.twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${eventTitle}`;

        // Construct Flickr photoset web URL if photosetId is available
        if (this.photosetId && process.env.flickrUserId) {
          this.flickrPhotosetWebUrl = `https://www.flickr.com/photos/${process.env.flickrUserId}/sets/${this.photosetId}/`;
        }
      }
    },
  },
  mounted() {
    this.updateShareUrls();
  },
  beforeDestroy() {
    if (this.lgInstance) {
      this.lgInstance.destroy();
      this.lgInstance = null;
    }
  },
  errorCaptured(err, vm, info) {
    console.error("Vue component error caught:", err, info);
    return false;
  },
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #8b184c;
$secondary-gray: #6c757d;
$light-gray-bg: #f8f9fa;
$dark-text: #343a40;
$border-color: #dee2e6;
$card-bg: #ffffff;

$font-heading: "Montserrat", sans-serif;
$font-body: "Open Sans", sans-serif;

/* Mixins for responsiveness */
@mixin media-breakpoint-up($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $breakpoint == xl {
    @media (min-width: 1200px) {
      @content;
    }
  }
}

/* --- General Page Structure --- */
.events-page-wrapper {
  padding-top: 50px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  font-family: $font-body;
  color: $dark-text;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

/* --- Page Header --- */
.page-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;

  .page-title {
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 700;
    color: $primary-solid-fallback;
    margin-bottom: 10px;
    line-height: 1.2;

    @media (max-width: 767px) {
      font-size: 2.2rem;
    }
  }

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background-color: $primary-solid-fallback;
    margin: 10px auto 0;
    border-radius: 2px;
  }
}

/* --- Breadcrumbs --- */
.breadcrumbs-container {
  margin-bottom: 30px;
  .breadcrumb-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    flex-wrap: wrap;
  }

  .breadcrumb-item {
    font-size: 0.9rem;
    color: $secondary-gray;
    display: flex;
    align-items: center;

    &:not(:last-child)::after {
      content: "›";
      margin: 0 8px;
      color: $border-color;
      font-weight: bold;
    }

    &.is-active {
      color: $primary-solid-fallback;
      font-weight: 600;
    }
  }

  .breadcrumb-link {
    color: $dark-text;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $primary-solid-fallback;
    }
  }
}

/* --- Event Detail Content Section --- */
.event-detail-content-section {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;

  @media (max-width: 767px) {
    padding: 25px;
    margin-bottom: 30px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    color: $primary-solid-fallback;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: 25px;
    transition: color 0.2s ease, transform 0.2s ease;

    i {
      margin-right: 8px;
      font-size: 0.9em;
      transition: transform 0.2s ease;
    }

    &:hover {
      color: darken($primary-solid-fallback, 10%);
      transform: translateX(-3px);
      i {
        transform: translateX(-3px);
      }
    }
    &:active {
      transform: translateX(0);
      i {
        transform: translateX(0);
      }
    }
    @media (max-width: 767px) {
      width: 100%;
      justify-content: center;
      margin-bottom: 20px;
    }
  }

  .event-description {
    line-height: 1.6;
    margin-bottom: 30px;

    :deep(p) {
      margin-bottom: 1em;
    }
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      font-family: $font-heading;
      font-weight: 600;
      color: $dark-text;
      margin-top: 1.5em;
      margin-bottom: 0.8em;
      font-size: 1.2rem;
      @include media-breakpoint-up(md) {
        font-size: 1.4rem;
      }
    }
    :deep(ul),
    :deep(ol) {
      padding-left: 25px;
      margin-bottom: 1em;
    }
  }

  .event-posters-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;

    @include media-breakpoint-up(md) {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    margin-bottom: 30px;
  }

  .poster-item {
    overflow: hidden;
    position: relative;

    a {
      display: block;
      width: 100%;
      height: 250px;

      @include media-breakpoint-up(md) {
        height: 350px;
      }
    }

    .poster-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

/* --- Photo Album Section --- */
.event-photos-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid $border-color;
  text-align: center; // Center content within this section for buttons etc.

  @media (max-width: 767px) {
    margin-top: 30px;
    padding-top: 20px;
  }

  .section-sub-heading {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    color: $dark-text;
    text-align: center;
    margin-bottom: 30px;

    @media (max-width: 767px) {
      font-size: 1.7rem;
      margin-bottom: 20px;
    }
  }

  .flickr-album-link {
    margin-top: 30px;
    .button-flickr {
      display: inline-flex;
      align-items: center;
      padding: 12px 25px;
      background-color: #ff0077; /* Flickr's main brand color */
      color: white;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.3s ease;

      i {
        margin-right: 10px;
      }

      &:hover {
        background-color: darken(#ff0077, 10%);
      }
    }
  }
}

.lightgallery-grid {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  @include media-breakpoint-up(sm) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 25px;
  }

  .gallery-item {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    height: 150px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    @media (hover: none) {
      &:hover {
        transform: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
      @media (hover: none) {
        &:hover {
          transform: none;
        }
      }
    }
  }
}

/* --- Social Share Section --- */
.social-share-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid $border-color;
  text-align: center;

  .share-heading {
    font-family: $font-heading;
    font-size: 1.5rem;
    font-weight: 600;
    color: $dark-text;
    margin-bottom: 20px;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 15px;

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      color: white;
      font-size: 1.2rem;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

      &.facebook {
        background-color: #3b5998;
      }
      &.twitter {
        background-color: #1da1f2;
      }
      /* Add more social media styles */

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

/* --- Alert Messages --- */
.alert-message {
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  color: $dark-text;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;

  &.no-photos-alert {
    background-color: lighten($border-color, 3%);
    border-color: $border-color;
    color: $secondary-gray;
  }

  p {
    margin: 0;
  }
}

/* --- Copyright Notice --- */
.copyright-notice {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid $border-color;
  text-align: center;
  font-size: 0.85rem;
  color: $secondary-gray;
}
</style>
