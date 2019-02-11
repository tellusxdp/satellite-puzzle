// 親での使用方法
// doRun = true に変更すると開始
// doRun = false に変更すると停止
<template lang="pug">
  .count-up-timer
    p.count-up-timer--text TIME
    .count-up-timer--record
      span.time {{ formatMin }}
      span.time-unit 分
      span.time {{ formatSec }}
      span.time-unit 秒
    span(style="display:none;") {{ doRun }}
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data: () => {
    return {
      isRun: false,   // カウントアップ中か
      timerObj: null, // setInterval用
    }
  },
  computed: {
    formatMin () {
      return ('00' + this.min).slice(-2)
    },
    formatSec () {
      return ('00' + this.sec).slice(-2)
    },
    ...mapGetters(["min", "sec", "msec"]),
  },
  props: {
    doRun: { // カウントアップの指示があるか
      type: Boolean,
      default: false,
    }
  },
  methods: {
    // storeの値を更新する
    countUp () {
      if (this.msec === 99) {
        this.resetMsec()
        if (this.sec === 59) {
          this.resetSec()
          this.inclementMin()
        } else {
          this.inclementSec()
        }
      } else {
        this.inclementMsec()
      }
    },
    ...mapActions(
      ["resetMin",
       "resetSec", 
       "resetMsec",
       "inclementMin",
       "inclementSec",
       "inclementMsec"]
      ),
  },
  // マウントされる前の処理
  beforeMount () {
    // タイマーの値をリセット
    this.resetMin()
    this.resetSec()
    this.resetMsec()
  },
  // データが変更され、DOMに適用される前の処理
  beforeUpdate () {
    // タイマーを動かすかどうかを判定する
    if (!this.isRun && this.doRun) {
      this.isRun = true
      this.timerObj = setInterval(this.countUp, 10)
    } else if (this.isRun && !this.doRun) {
      this.isRun = false
      clearInterval(this.timerObj)
    }
  },
  // Vueインスタンスが破棄される前の処理
  beforeDestroy () {
    // タイマーを停止する
    this.isRun = false
    this.doRun = false
    clearInterval(this.timerObj)
  },
}
</script>


<style lang="scss" scoped>
.count-up-timer {
  width: 256px;
}

.count-up-timer--text {
  margin-left: 86px;
  // width: 60px;
  height: 20px;
  font-family: OpenSans;
  font-size: 28px;
  font-weight: 600;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #fff;
}

.count-up-timer--record {
  width: 256px;
  text-align: center;
  margin-top: 4px;
  margin-left: -6px;
}

.time {
  margin-left: 8px;
  width: 67px;
  height: 45px;
  font-family: OpenSans-ExtraboldItalic;
  font-size: 61.5px;
  font-weight: 800;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.time-unit {
  margin-left: 2px;
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
</style>
