<template lang="pug">
  .result-area
    .best
    .confi
    .map-name
      ribbon {{ mapName }}
    .map-image
      img.completed-image(:src="completedImage")
    .record
      p.label TIME
      .record-area
        span.time {{ formatMin }}
        span.time-unit 分
        span.time {{ formatSec }}
        span.time-unit 秒
    .personal-best
      img.new-record(
        v-show="isNewRecord"
        src="~assets/images/result/img_koshin.png")
      p
        span.text あなたの自己ベスト
        span.best-record {{ formatBestMin }}分{{ formatBestSec }}秒
</template>

<script>
import Ribbon from '~/components/ribbon/Ribbon'
export default {
  components: {
    Ribbon
  },
  props: {
    mapName: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0
    },
    sec: {
      type: Number,
      default: 0
    },
    bestMin: {
      type: Number,
      default: 0
    },
    bestSec: {
      type: Number,
      default: 0
    },
    completedImage: {
      type: String,
      default: ""
    },
    isNewRecord: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatMin: {
      get () { return ('00' + this.min).slice(-2) }
    },
    formatSec: {
      get () { return ('00' + this.sec).slice(-2) }
    },
    formatBestMin: {
      get () { return ('00' + this.bestMin).slice(-2) }
    },
    formatBestSec: {
      get () { return ('00' + this.bestSec).slice(-2) }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-area {
  width: 578px;
  height: 864px;
  border-radius: 4px;
  background-color: #fff;
  background-image:
    url('~assets/images/result/confi.png'),
    url('~assets/images/background/best/best.png');
  background-size: initial, initial;
  background-position: 12px 28px, -1px 360px;
}

.ribbon {
  margin-top: 72px;
  margin-left: 60px;
}

.map-image {
  margin-top: 130px;
  margin-left: 81px;
  z-index: 1;
}

.completed-image {
  width: 421px;
  height: 421px;
}

.record {
  margin-top: 24px;
  text-align: center;
}

.label {
  // width: 60px;
  height: 20px;
  font-family: OpenSans;
  font-size: 28px;
  font-weight: 600;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.record-area {
  margin-top: 2px;
  margin-left: -10px;
}

.time {
  margin-left: 12px;
  width: 64px;
  height: 45px;
  opacity: 0.98;
  font-family: OpenSans-BoldItalic;
  font-size: 61.5px;
  font-weight: bold;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.98);
}

.time-unit {
  margin-left: 4px;
  width: 24px;
  height: 23px;
  font-family: NotoSansCJKjp;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.personal-best {
  width: 421px;
  height: 60px;
  margin-left: 79px;
  border-radius: 28px;
  background-color: #4a34c2;
  position: relative;

  .new-record {
    position: absolute;
    top: -88px;
    left: -44px;
  }

  p {
    padding-top: 12px;
  }

  .text {
    margin-left: 46px;
    width: 175px;
    height: 19px;
    font-family: NotoSansCJKjp;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.8;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }

  .best-record {
    margin-left: 20px;
    width: 118px;
    height: 27px;
    font-family: NotoSansCJKjp;
    font-size: 28px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
}
</style>
