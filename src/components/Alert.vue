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
  props: ["fields"],
  data() {
    return {
      toast_message: "",
    };
  },
  updated() {
    this.toast_message = this.fields.slices.filter((slice) => {
      return slice.slice_label === "toast";
    });
    this.$toast.open({
      message: this.toast_message[0].primary.alert_message[0].text,
      type: "info",
      duration: 80000,
      dismissible: true,
    });
  },
  created() {},
};
</script>
