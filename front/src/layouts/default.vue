<template lang="pug">
  .background(:style="styles")
    .margin
      .wrapper
        .contents
          nuxt
</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    styles () {
      return {
        '--height': `${this.height}px`,
        '--scale': this.height/1148,
        '--mergin': `${(this.width - 640 * (this.height/1148))/2}px`,
      }
    }
  },
  data () {
      let height = 0
      let width = 0

      if (process.client) {
        // VHを取得
        height = document.documentElement.clientHeight
        width = document.documentElement.clientWidth
      }
    return {
      width: width,
      height: height
    }
  },
  methods: {
    setWidth () {
      this.width = document.documentElement.clientWidth
    },
    setHeight () {
      this.height = document.documentElement.clientHeight
    }
  },
  mounted () {
    window.addEventListener('resize', this.setWidth, false)
    window.addEventListener('resize', this.setHeight, false)

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
}

.background {
  background-color: #000;
}

.margin {
  margin-left: var(--mergin);
  height: var(--height);
}

$scale: var(--scale);

.wrapper {
  transform: scale($scale);
  -o-transform: scale($scale);
  -webkit-transform: scale($scale);
  -moz-transform: scale($scale);
  -ms-transform: scale($scale);
  transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
}

</style>
