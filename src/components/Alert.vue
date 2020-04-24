<template>
  <div>
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_label === 'alert'">
        <div class="alert alert-danger" role="alert">
          <prismic-rich-text :field="slice.primary.alert_message" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["fields"]
};
</script>
