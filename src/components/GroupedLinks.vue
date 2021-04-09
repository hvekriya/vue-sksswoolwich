<template>
  <div style="margin-bottom: 100px">
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_label === 'grouped_links'">
        <div
          v-for="(item, index) in fields.slices[0].items"
          :key="'posts-' + index"
          style="margin-bottom: 25px"
        >
          <a :href="item.link.url">
            <h2>
              <i class="fas fa-map-marker-alt"></i>
              {{ item.link_title[0].text }}
            </h2></a
          >
          <p>Only click the hint button if you need help.</p>
          <div class="hint">
            <button
              type="button"
              class="btn btn-secondary"
              data-container="body"
              data-toggle="popover"
              data-placement="right"
              :data-content="$prismic.richTextAsPlain(item.link_description)"
            >
              Hint <i class="fas fa-question-circle"></i>
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "GroupedLinks",
  props: ["fields"],
  data() {
    return {
      grouped_links: "",
    };
  },
  created() {},
  updated() {
    $(function () {
      $('[data-toggle="popover"]').popover({
        trigger: "focus",
      });
    });
  },
};
</script>
