<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Photo Gallery</h1>
    </header>
    <Gallery />
  </div>
</template>

<script>
import Gallery from "../components/Gallery";

export default {
  name: "PhotoGallery",
  components: {
    Gallery
  }
};
</script>
