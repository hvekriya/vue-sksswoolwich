<template>
  <div class="wrapper container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-8">
        <div class="iframe-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScye8RheLqVNDunvhleztUS676fRZE7HN3c5-2Y3ZNjnRYMsA/viewform?embedded=true"
            width="100%"
            height="1400"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            >Loading...</iframe
          >
        </div>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "GiftAidForm",
  mounted() {
    document.querySelector("iframe").addEventListener("load", function () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  },
};
</script>

<style>
iframe {
  background: white;
}
</style>
