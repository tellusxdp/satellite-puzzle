// 親での使用方法
// doRun = true に変更すると開始
// doRun = false に変更すると停止
<template>
  <div class="count-up-timer">
    <div class="timer-text">TIME</div>
    <div class="timer">
      <div class="record">
        <span class="time">{{ $store.state.min }}</span>
        <span class="time-unit">分</span>
        <span class="time">{{ $store.state.sec }}</span>
        <span class="time-unit">秒</span>
      </div>
    </div>
    <div style="display:none;">{{ doRun }}</div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isRun: false,   // カウントアップ中か
      timerObj: null, // setInterval用
    }
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
      if (this.$store.state.msec === 99) {
        this.$store.commit('resetMsec')
        if (this.$store.state.sec === 59) {
          this.$store.commit('resetSec')
          this.$store.commit('inclementMin')
        } else {
          this.$store.commit('inclementSec')
        }
      } else {
        this.$store.commit('inclementMsec')
      }
    },
  },
  // マウントされる前の処理
  beforeMount () {
    // タイマーの値をリセット
    this.$store.commit('resetMin')
    this.$store.commit('resetSec')
    this.$store.commit('resetMsec')
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

.timer-text {
  width: 58px;
  height: 20px;

  /* font-family: LTUnivers-Cond; */
  font-size: 28px;
  font-weight: 500;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
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
