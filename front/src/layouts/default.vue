<template lang="pug">
  .wrapper
    .contents
      nuxt
</template>

<script>
export default {
  mounted () {
    var mapList = this.$el.getElementsByClassName('map-list')

    window.addEventListener('touchmove', function(event) {
      // 対象の要素がない場合
      if (mapList.length === 0) {
        // ずべてのスクロールを無効にする
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


<style>
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
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--gray {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--gray:hover {
  color: #fff;
  background-color: #35495e;
}

.contents {
  background: url('~assets/images/background/background.png') center center / cover no-repeat;
  background-size: contain;
  width: 640px;
  height: 1148px;

  /* height: 100vh;
  width: calc(100vh / 1149 * 640); */
  margin-left: auto;
  margin-right: auto;
}

.wrapper {
  background-color: #000;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}

</style>
