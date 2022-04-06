<template>
  <div class="upcoming-events">
    <header class="page-header">
      <h2 class="title">
        <i class="fas fa-calendar-alt"></i> Join us to celebrate
      </h2>
    </header>
    <div class="row">
      <ul class="event-list">
        <li
          class="important"
          v-for="(event, index) in upcomingEvents"
          :key="'event-' + index"
        >
          <time>
            <span class="month">{{ event.data.event_date | moment }}</span>
          </time>
          <div class="info">
            <div class="col-lg-8">
              <prismic-rich-text :field="event.data.event_title" />
              <prismic-rich-text :field="event.data.event_description_short" />
              <br />
              <NuxtLink
                :to="{
                  path: `/events/${event.uid}`,
                }"
                class="btn btn-secondary"
                style="width: 100%"
                >View more details</NuxtLink
              >
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
              <template v-if="event.data.poster_2.url">
                <a :href="event.data.poster_2.url">
                  <img
                    :src="event.data.poster_2.url"
                    :alt="event.data.poster_2.alt"
                    class="img-responsive"
                    style="border: none; padding: 5px"
                  />
                </a>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingEvents",
  props: ["upcomingEvents"],
};
</script>

<style scoped>
@media (min-width: 768px) {
  .event-list > li > img,
  .event-list > li > time {
    width: 106x;
    height: 110px;
    padding: 0;
    margin: 0;
  }
}
</style>
