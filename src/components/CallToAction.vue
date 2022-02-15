<template>
  <div>
    <div class="bs-calltoaction bs-calltoaction-primary">
      <div class="row">
        <div class="col-md-9 cta-contents">
          <h1 class="cta-title">Premras Mahotsav</h1>
          <div class="cta-desc">
            <p>
              We will be celebrating our beloved Ghanshyam Maharaj's 5th
              birthday from Sunday 7th - Sunday 14th August 2022.
            </p>
          </div>
        </div>
        <div class="col-md-3 cta-button">
          <a href="/premras-mahotsav" class="btn btn-lg btn-block btn-primary"
            >Get involved now</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CallToAction",
};
</script>

<style lang="scss" scoped>
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
  padding-top: 10px;
  padding-bottom: 10px;
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
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
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