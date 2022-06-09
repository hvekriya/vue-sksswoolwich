<template>
  <div class="wrapper container">
    <header class="page-header">
      <img
        src="../../assets/img/slc-banner-web.png"
        alt="Swaminarayan League Cup"
        copyright="Woolwich Temple"
        class="img-responsive"
      />

      <h1>SLC Tables</h1>
    </header>
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <div class="caption">
            <h3>
              <NuxtLink to="/slc/over-17-football">Over 17 Football</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <div class="caption">
            <h3>
              <NuxtLink to="/slc/under-16-football">Under 16 Football</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <div class="caption">
            <h3>
              <NuxtLink to="/slc/over-18-dodgeball">Over 18 Dodgeball</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <div class="caption">
            <h3>
              <NuxtLink to="/slc/under-18-rounders">Under 18 Rounders</NuxtLink>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SLC",
};
</script>