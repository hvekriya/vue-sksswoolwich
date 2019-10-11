<template>
  <div>
    <header class="page-header">
      <h1>Weekly Schedule</h1>
    </header>
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_type === 'events_list'">
        <div class="row">
          <ul class="event-list">
            <li class="important" v-for="(item, index) in slice.items" :key="'event-' + index">
              <time>
                <span class="month">{{item.event_day[0].text}}</span>
              </time>
              <div class="info">
                <div class="col-lg-8">
                  <prismic-rich-text :field="item.event_description" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "WeeklySchedule",
  props: ["fields"]
};
</script>
