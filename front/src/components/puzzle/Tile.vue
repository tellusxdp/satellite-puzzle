<template lang="pug">
  .tile(:style="styles")
    .filter
    img.top(:src="image")
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    },
  },
  computed: {
    styles () {
      return {
        '--size': `${this.size}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$size: var(--size);

.tile {
  position: relative;

  .filter {
    position: absolute;
    z-index: 20;
    width: $size;
    height: $size;
    border-top: 4px solid rgba(255, 255, 255, 0.4);
    border-right: 4px solid rgba(0, 0, 0, 0.4);
    border-bottom: 4px solid rgba(0, 0, 0, 0.4);
    border-left: 4px solid rgba(255, 255, 255, 0.4);
    background-color: transparent;
  }

  .top {
    position: absolute;
    z-index: 10;
    width: $size;
    height: $size;
  }
}
</style>
