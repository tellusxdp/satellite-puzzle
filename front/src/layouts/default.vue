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
  overflow: hidden;
  box-sizing: border-box;
  word-spacing: 1px;
  font-size: 16px;
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

$scale: var(--scale);

.background {
  background: url('~assets/images/background/background.png');

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    bottom: -30px;
    left: -30px;
    right: -30px;
    background: inherit;
    filter: blur(30px);
  }

  .margin {
    margin-left: var(--mergin);
    height: var(--height);

    .wrapper {
      -webkit-transform: scale($scale);
      -moz-transform: scale($scale);
      -ms-transform: scale($scale);
      -o-transform: scale($scale);
      transform: scale($scale);
      -webkit-transform-origin: 0 0;
      -moz-transform-origin: 0 0;
      -ms-transform-origin: 0 0;
      -o-transform-origin: 0 0;
      transform-origin: 0 0;

      .contents {
        width: 640px;
        height: 1148px;
        background: url('~assets/images/background/background.png') center center / cover no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
