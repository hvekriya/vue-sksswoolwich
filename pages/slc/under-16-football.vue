<template>
  <div class="wrapper container">
    <header class="page-header">
      <ol class="breadcrumb">
        <li>
          <NuxtLink to="/slc"
            ><span class="glyphicon glyphicon-chevron-left"></span> Back to all
            tables
          </NuxtLink>
        </li>
      </ol>
      <img
        src="../../assets/img/slc-banner-web.png"
        alt="Swaminarayan League Cup"
        copyright="Woolwich Temple"
        class="img-responsive"
      />

      <h1>Under 16 Football</h1>
    </header>
    <div class="row">
      <div class="iframeWrapper">
        <iframe
          frameborder="0"
          style="overflow: hidden"
          scrolling="no"
          src="https://onedrive.live.com/embed?resid=455BD0026BA8B44E%211721&authkey=%21AHtwCofYHzwfAig&em=2&wdAllowInteractivity=False&Item=Under16Football&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True&edesNext=false&ejss=false"
        ></iframe>
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
.wrapper iframe {
  width: 100%;
  height: 400px;
}
</style>