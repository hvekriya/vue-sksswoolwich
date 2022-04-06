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
      <li><NuxtLink to="/events/2022">2022</NuxtLink></li>
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