<template>
  <div class="past-events">
    <header class="page-header">
      <h2 class="title">Past events</h2>
    </header>
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
                <img
                  :src="event.data.poster.url"
                  :alt="event.data.poster.alt"
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
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PastEvents",
  props: ["pastEvents"],
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
 
