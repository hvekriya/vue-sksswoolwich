<template>
  <div>
    <no-ssr>
      <flip-countdown deadline="2022-08-08 00:00:00"></flip-countdown>
    </no-ssr>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  components: { FlipCountdown },
};
</script>

<style lang="scss" scoped>
.container {
  width: initial;
}
</style>

<style lang="scss">
.flip-clock {
  b.flip-card__top {
    background-color: white;
  }
  b.flip-card__bottom {
    background-color: white;
  }
  b.flip-card__back-bottom {
    border-top: none;
  }
}
</style>