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
    width: $size;
    height: $size;
    background-color: transparent;
    border-top: 4px solid rgba(255, 255, 255, 0.4);
    border-left: 4px solid rgba(255, 255, 255, 0.4);
    border-right: 4px solid rgba(0, 0, 0, 0.4);
    border-bottom: 4px solid rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 20;
  }

  .top {
    width: $size;
    height: $size;
    position: absolute;
    z-index: 10;
  }
}
</style>
