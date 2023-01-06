<template>
  <div class="upcoming-events">
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
              <br />
              <br />
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
