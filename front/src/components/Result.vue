<template lang="pug">
  .result-area
    .best
    .map-name
      ribbon {{ mapName }}
    .map-image
      img.completed-image(:src="completedImage")
    .record
        span.time {{ min }}
        span.time-unit 分
        span.time {{ sec }}
        span.time-unit 秒
    .personal-best
      p あなたの自己ベスト {{ min }}分{{ sec }}秒
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
    }
  }
}
</script>

<style lang="scss" scoped>
.result-area {
  width: 578px;
  height: 766px;
  border-radius: 4px;
  background-color: #fff;
  background-position: -1px 279px;
  background-image: url('~assets/images/background/best/best.png');
}

.ribbon {
  margin-top: 33px;
  margin-left: 81px;
}

.map-image {
  margin-top: 103px;
  margin-left: 81px;
  z-index: 1;
}

.completed-image {
  width: 421px;
  height: 421px;
}

.record {
  margin-top: 22px;
  text-align: center;
}

.time {
  width: 68px;
  height: 45px;

  /* font-family: LTUnivers-Cond; */
  font-size: 61.3px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.time-unit {
  width: 24px;
  height: 23px;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
}

.personal-best {
  width: 421px;
  height: 60px;
  margin-left: 79px;
  border-radius: 28px;
  background-color: #4a34c2;

  p {
    padding-top: 13px;
    // font-family: NotoSansCJKjp;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.8;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
}
</style>
