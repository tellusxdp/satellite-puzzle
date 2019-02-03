<template lang="pug">
  div.base-share-button
    a(:href="href", target="_blank", rel="nofollow")
      img(:src="src")
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    }
  }
}
</script>

<style lang="scss" scoped>
.base-share-button {
  width: 80px;
  height: 80px;

  img {
    width: 80px;
    height: 80px;
  }
}
</style>
