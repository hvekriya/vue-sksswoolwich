<template>
  <div class="wrapper container">
    <header class="page-header">
      <img src="../../assets/img/slc-banner-web.png" alt="Swaminarayan League Cup" copyright="Woolwich Temple"
        class="img-responsive" />
      <div class="bs-calltoaction bs-calltoaction-primary">
        <div class="row">
          <div class="col-md-4 col-lg-4 col-sm-12 cta-contents">
            <h1 class="cta-title">Sports in mind</h1>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <p>Help us reach our target of £2,500!
              We can’t do it without your help!
            </p>
          </div>
          <div class="col-md-4 cta-button">
            <a href="https://www.justgiving.com/fundraising/swaminarayan-league-cup?utm_source=Sharethis&utm_medium=fundraising&utm_content=swaminarayan-league-cup&utm_campaign=pfp-email&utm_term=2f933652736c413f9181df015e95e9c1."
              class="btn btn-lg btn-block btn-primary" target="_blank">DONATE NOW</a>
          </div>
        </div>
        <div class="row"></div>
      </div>

      <h2>SLC Tables</h2>
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
<style lang="scss" scoped>

.page-header {
  padding-bottom: 9px;
  margin: 0px;
  border-bottom: 1px solid #eee;
}
.bs-calltoaction {
  position: relative;
  width: auto;
  padding: 15px 25px;
  margin-bottom: 10px;
}

.bs-calltoaction > .row {
  display: table;
  width: calc(100% + 30px);
}

.bs-calltoaction > .row > [class^="col-"],
.bs-calltoaction > .row > [class*=" col-"] {
  float: none;
  display: table-cell;
  vertical-align: middle;
}

.cta-contents {
  padding-top: 10px;
  padding-bottom: 10px;
}

.cta-title {
  margin: 0 auto 15px;
  padding: 0;
}

.cta-desc {
  padding: 0;
}

.cta-desc p:last-child {
  margin-bottom: 0;
}

.cta-button {
  padding: 20px;
}

@media (max-width: 991px) {
  .bs-calltoaction > .row {
    display: block;
    width: auto;
  }

  .bs-calltoaction > .row > [class^="col-"],
  .bs-calltoaction > .row > [class*=" col-"] {
    float: none;
    display: block;
    vertical-align: middle;
    position: relative;
  }

  .cta-contents {
    text-align: center;
  }
}

.bs-calltoaction.bs-calltoaction-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.bs-calltoaction.bs-calltoaction-primary {
  color: #17172f;
  background-color: #12d1ff;
  }
  
  .bs-calltoaction.bs-calltoaction-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
  }
  
  .bs-calltoaction.bs-calltoaction-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
  }
  
  .bs-calltoaction.bs-calltoaction-warning {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  
  .bs-calltoaction.bs-calltoaction-danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
  }
  
  .bs-calltoaction.bs-calltoaction-primary .cta-button .btn,
  .bs-calltoaction.bs-calltoaction-info .cta-button .btn,
  .bs-calltoaction.bs-calltoaction-success .cta-button .btn,
  .bs-calltoaction.bs-calltoaction-warning .cta-button .btn,
  .bs-calltoaction.bs-calltoaction-danger .cta-button .btn {
    border-color: #fff;
  }
</style>