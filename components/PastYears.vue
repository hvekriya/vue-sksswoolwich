<template>
  <div class="dropdown">
    <button
      class="btn btn-default dropdown-toggle"
      type="button"
      id="dropdownMenu1"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
    >
      Filter by year
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <li><NuxtLink to="/events/year/2022">2022</NuxtLink></li>
      <!-- <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "PastYears",
};
</script>

<style lang="scss" scoped>
@mixin respond-to($media) {
  @if $media==handhelds {
    @media only screen and (max-width: 768px) {
      @content;
    }
  } @else if $media==medium-screens {
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      @content;
    }
  } @else if $media==wide-screens {
    @media only screen and (min-width: 1024px) {
      @content;
    }
  }
}

.dropdown {
  float: right;
  margin-top: 20px;
  margin-bottom: 10px;

  button {
    @include respond-to(handhelds) {
      float: none;
      width: 100%;
    }
  }
}
</style>