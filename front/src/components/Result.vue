// 結果モーダル
<template lang="pug">
  .result-area
    .best
    .map-name
      ribbon {{ mapName }}
    .map-image
      img.completed-image(:src="completedImage")
    .record
      span.label TIME
      span.time {{ formatMin }}
      span.time-unit 分
      span.time {{ formatSec }}
      span.time-unit 秒
    .personal-best
      img.new-record(
        v-if="isNewRecord"
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
    mapName: { // 表示するマップ名
      type: String,
      default: "",
    },
    min: { // 今回の記録（分）
      type: Number,
      default: 0
    },
    sec: { // 今回の記録（秒）
      type: Number,
      default: 0
    },
    bestRecord: { // 自己記録（初回はnull）
      type: Object,
      default: null,
    },
    isNewRecord: { // 新記録か
      type: Boolean,
      default: false,
    },
    completedImage: { // 完成画像
      type: String,
      default: ""
    }
  },
  methods: {
    format (v) {
      return ('00' + v).slice(-2)
    }
  },
  computed: {
    bestMin () {
      if (!this.bestRecord) {
        return this.min
      }
      return this.bestRecord.min
    },
    bestSec () {
      if (!this.bestRecord) {
        return this.sec
      }
      return this.bestRecord.sec
    },
    formatMin () {  // 表示用:今回の記録（分）
      return this.format(this.min) 
    },
    formatSec () { // 表示用:今回の記録（秒）
      return this.format(this.sec)
    },
    formatBestMin () { // 表示用：自己記録（分）
      return this.format(this.bestMin) 
    },
    formatBestSec () { // 表示用:自己記録（秒）
      return this.format(this.bestSec) 
    }
  }
}
</script>

<style lang="scss" scoped>
.result-area {
  width: 578px;
  height: 794px;
  border-radius: 4px;
  background-color: #fff;
  background-image:
    url('~assets/images/result/confi.png'),
    url('~assets/images/background/best/best.png');
  background-position: 22px 12px, -1px 310px;
  background-size: initial, initial;
}

.ribbon {
  margin-top: 40px;
  margin-left: 60px;
}

.map-image {
  z-index: 1;
  margin-top: 120px;
  margin-left: 81px;
}

.completed-image {
  width: 421px;
  height: 421px;
  filter: brightness(200%);
  -webkit-filter: brightness(200%);
  -moz-filter: brightness(200%);
  -o-filter: brightness(200%);
  -ms-filter: brightness(200%);
}

.record {
  margin-top: 8px;
  margin-left: -22px;
  text-align: center;
}

.label {
  margin-right: 18px;
  margin-left: 14px;
  height: 20px;
  color: #fff;
  text-align: center;
  letter-spacing: normal;
  font-weight: 600;
  font-style: italic;
  font-stretch: normal;
  font-size: 28px;
  font-family: OpenSans;
  line-height: 1.29;
}

.time {
  width: 64px;
  height: 45px;
  color: rgba(255, 255, 255, 0.98);
  text-align: center;
  letter-spacing: normal;
  font-weight: bold;
  font-style: italic;
  font-stretch: normal;
  font-size: 61.5px;
  font-family: OpenSans;
  line-height: 1.63;
  opacity: 0.98;
}

.time-unit {
  margin-right: 12px;
  margin-left: 4px;
  width: 24px;
  height: 23px;
  color: #fff;
  text-align: center;
  letter-spacing: normal;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  font-size: 24px;
  font-family: NotoSansCJKjp;
  line-height: 1.5;
}

.new-record {
  position: absolute;
  top: -88px;
  left: -64px;
}

.personal-best {
  position: relative;
  margin-left: 79px;
  width: 421px;
  height: 60px;
  border-radius: 28px;
  background-color: #4a34c2;

  p {
    padding-top: 12px;
  }

  .text {
    margin-left: 46px;
    width: 175px;
    height: 19px;
    color: #fff;
    text-align: center;
    letter-spacing: normal;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    font-size: 20px;
    font-family: NotoSansCJKjp;
    line-height: 1.8;
  }

  .best-record {
    margin-left: 22px;
    width: 118px;
    height: 27px;
    color: #fff;
    text-align: center;
    letter-spacing: normal;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    font-size: 28px;
    font-family: NotoSansCJKjp;
    line-height: 1.29;
  }
}
</style>
