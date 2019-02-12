<template lang="pug">
  .wrapper
    .contents
      nuxt
</template>

<script>
export default {
  mounted () {
    const deviceType = this.$ua.deviceType()
    // PCの場合はスクロール調整を行わない
    if (deviceType === 'pc') {
      return
    }

    var mapList = this.$el.getElementsByClassName('map-list')

    window.addEventListener('touchmove', function(event) {
      // 対象の要素がない場合
      if (mapList.length === 0) {
        // すべてのスクロールを無効にする
        event.preventDefault()
        return
      }
      // 対象の要素がある場合
      let list = mapList.item(0)

      if (list.contains(event.target)) {
        event.stopPropagation();
      } else {
        event.preventDefault(); // スクロール可能な領域が狭いため、調整が必要
      }
    },{ passive: false });
  }
}
</script>


<style lang="scss" scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow: hidden;
}

.contents {
  background: url('~assets/images/background/background.png') center center / cover no-repeat;
  background-size: contain;
  width: 640px;
  height: 1148px;
  margin-left: auto;
  margin-right: auto;
}

.wrapper {
  background-color: #000;
  width: 100vw;
  height: 1148px;
  z-index: -10;
}

</style>
