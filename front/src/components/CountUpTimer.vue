// カウントアップタイマー
// propsのdoRunをtrueにするとカウントアップ開始
// propsのdoRunをfalseにするとカウントアップ停止
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
    formatMin () { // 分の表示用にフォーマットする
      return ('00' + this.min).slice(-2)
    },
    formatSec () { // 秒の表示用にフォーマットする
      return ('00' + this.sec).slice(-2)
    },
    ...mapGetters(["min", "sec"]),
  },
  props: {
    doRun: { // カウントアップの指示があるか
      type: Boolean,
      default: false,
    }
  },
  methods: {
    // カウントアップ処理
    countUp () {
      if (this.sec === 59) {
        this.resetSec() // 59 -> 0
        this.inclementMin()
      } else {
        this.inclementSec()
      }
    },
    ...mapActions(
      ["resetMin",
       "resetSec", 
       "inclementMin",
       "inclementSec"]
      ),
  },
  beforeMount () {
    // タイマーの値をリセット
    this.resetMin()
    this.resetSec()
  },
  beforeUpdate () {
    // タイマーの起動・停止を切り替えるか判定する
    if (!this.isRun && this.doRun) { // 停止中に起動処理がでた場合
      this.isRun = true // タイマー起動
      this.timerObj = setInterval(this.countUp, 1000) // カウントアップ開始
    } else if (this.isRun && !this.doRun) { // 起動中に停止指示がでた場合
      this.isRun = false // タイマー停止
      clearInterval(this.timerObj) // カウントアップ終了
    }
  },
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
  color: #fff;
  letter-spacing: normal;
  font-weight: 600;
  font-style: italic;
  font-stretch: normal;
  font-size: 28px;
  font-family: OpenSans;
  line-height: 1.29;
}

.count-up-timer--record {
  margin-top: 4px;
  margin-left: -6px;
  width: 256px;
  text-align: center;
}

.time {
  margin-left: 8px;
  width: 67px;
  height: 45px;
  color: #fff;
  text-align: center;
  letter-spacing: normal;
  font-weight: 800;
  font-style: italic;
  font-stretch: normal;
  font-size: 61.5px;
  font-family: OpenSans;
  line-height: 1.63;
}

.time-unit {
  margin-left: 2px;
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
</style>
