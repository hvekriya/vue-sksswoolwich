<template>
  <div class="past-events">
    <PastYears />
    <!-- Filter -->
    <br />
    <div class="row">
      <ul class="event-list">
        <li
          class="important"
          v-for="(event, index) in pastEvents"
          :key="'event-' + index"
        >
          <time>
            <span class="month">{{ event.data.event_date | moment }}</span>
          </time>
          <div class="info">
            <div class="col-lg-8">
              <prismic-rich-text :field="event.data.event_title" />
              <prismic-rich-text :field="event.data.event_description" />
            </div>
            <div class="col-lg-2"></div>
            <div class="col-lg-2" style="padding: 0">
              <a :href="event.data.poster.url">
                <v-lazy-image
                  :src="event.data.poster.url || ''"
                  :alt="event.data.poster.alt || ''"
                  class="img-responsive"
                  style="border: none; padding: 5px"
                />
              </a>
              <NuxtLink
                :to="{
                  path: `/events/${event.uid}/${event.data.flicker_album_id}`,
                }"
                class="btn btn-secondary"
                style="width: 100%"
                >View pictures</NuxtLink
              >
              <br />
              <br />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PastYears from "../components/PastYears";
import VLazyImage from "v-lazy-image/v2";

export default {
  name: "PastEvents",
  props: ["pastEvents"],
  components: {
    PastYears,
    VLazyImage,
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .event-list > li > img,
  .event-list > li > time {
    width: 106px;
    height: 110px;
    padding: 0;
    margin: 0;
  }
}
</style>
