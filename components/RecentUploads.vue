<template>
  <div class="recent-uploads">
    <div class="row gallery-row">
      <div id="recentUploads">
        <div
          v-for="(photo, index) in recentUploads"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
        >
          <div>
            <a :href="photo.url_o">
              <img :src="photo.url_n" class="category-banner img-responsive" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentUploads",
  props: ["recentUploads"],
  mounted() {
    const el = document.getElementById("recentUploads");
    window.lightGallery(el, { selector: "a" });
  },
};
</script>