<template>
  <div>
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_type === 'image_gallery'">
        <hooper
          :progress="true"
          :infiniteScroll="false"
          :autoPlay="true"
          :playSpeed="8000"
          :wheelControl="false"
          style="height: 100%"
        >
          <slide v-for="(item, index) in slice.items" :key="'photo-' + index">
            <prismic-image :field="item.gallery_image" class="img-responsive" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </template>
    </template>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  name: "ImageSlider",
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: ["fields"],
};
</script>