<template lang="pug">
  button.moon-button(@click="click")
    img(src="~assets/images/moon/moon.png")
    .moon-button--text
      slot
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.moon-button {
  width: 100%;
  height: 100%;

  &--text {
    // width: 94px;
    height: 22px;
    font-family: NotoSansCJKjp;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
}
</style>
