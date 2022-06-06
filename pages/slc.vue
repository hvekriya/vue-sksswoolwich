<template>
  <div class="wrapper container">
    <header class="page-header">
      <img
        src="../assets/img/slc-banner-web.png"
        alt="Swaminarayan League Cup"
        copyright="Woolwich Temple"
        class="img-responsive"
      />

      <h1>SLC Tables</h1>
    </header>
    <div class="row">
      <div class="iframeWrapper">
        <iframe
          frameborder="0"
          style="overflow: hidden"
          scrolling="no"
          src="https://onedrive.live.com/embed?resid=455BD0026BA8B44E%211721&authkey=%21AHtwCofYHzwfAig&em=2&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True&edesNext=false&ejss=false"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SLC",
};
</script>

<style lang="scss" scoped>
// .iframeWrapper {
//   position: relative;
//   padding-bottom: 56.25%; /* 16:9 */
//   padding-top: 25px;
//   height: 0;
// }
.wrapper iframe {
  width: 100%;
  height: 450px;
}
</style>