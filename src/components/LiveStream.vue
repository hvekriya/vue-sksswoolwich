<template>
  <div>
    <template v-for="(slice, index) in fields.slices">
      <template v-if="slice.slice_type === 'video'">
        <div class="row">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              :src="slice.primary.video.embed_url | replace('watch?v=','embed/')"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "LiveStream",
  props: ["fields"]
};
</script>
