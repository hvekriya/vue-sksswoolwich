<template>
  <div class="recent-uploads">
    <!-- <div class="row gallery-row">
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
    </div> -->
    <div class="row">
      <div id="lightgallery">
        <template
          v-for="(photo, index) in recentUploads"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
        >
          <a :href="photo.url_o">
            <img :src="photo.url_n" class="category-banner img-responsive" />
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentUploads",
  props: ["recentUploads"],
  mounted() {
    const el = document.getElementById("lightgallery");
    window.lightGallery(el);
  },
};
</script>