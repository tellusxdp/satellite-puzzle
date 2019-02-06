// 親での使用方法
// doRun = true に変更すると開始
// doRun = false に変更すると停止
<template>
  <div class="count-up-timer">
    <p class="count-up-timer--text">TIME</p>
    <div class="count-up-timer--record">
      <span class="time">{{ formatMin }}</span>
      <span class="time-unit">分</span>
      <span class="time">{{ formatSec }}</span>
      <span class="time-unit">秒</span>
    </div>
    <div style="display:none;">{{ doRun }}</div>
  </div>
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
    formatMin: {
      get () { return ('00' + this.min).slice(-2) },
    },
    formatSec: {
      get () { return ('00' + this.sec).slice(-2) }
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

<style>
.count-up-timer {
  width: 256px;
}

.count-up-timer--text {
  height: 20px;
  text-align: center;

  /* font-family: LTUnivers-Cond; */
  font-size: 28px;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #fff;
}

.count-up-timer--record {
  width: 256px;
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
  color: #fff;
}

.time-unit {
  width: 24px;
  height: 23px;

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
}
</style>
