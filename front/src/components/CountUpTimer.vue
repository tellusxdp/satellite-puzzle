// 親での使用方法
// doRun = true に変更すると開始
// doRun = false に変更すると停止
<template>
  <div class="count-up-timer">
    <div class="timer-text">TIME</div>
    <div class="timer">
      <div class="record">
        <span class="time">{{ min }}</span>
        <span class="time-unit">分</span>
        <span class="time">{{ sec }}</span>
        <span class="time-unit">秒</span>
      </div>
    </div>
    <div style="display:none;">{{ doRun }}</div>
  </div>
</template>

<script>
const countUp = t => {
  return () => {
    if (t.msec === 99) {
      if (t.sec === 59) {
        t.min ++
        t.sec = 0
      }
      t.sec ++
      t.msec = 0
    }
      t.msec ++
  }
}

const format = i => {
  return ('0' + i).slice(-2)
}

export default {
  data: () => {
    return {
      min: 0,
      sec: 0,
      msec: 0,
      isRun: false,
      timerObj: null,
    }
  },
  props: {
    doRun: {
      type: Boolean,
      default: false,
    }
  },
  beforeUpdate: function() {
    if (!this.isRun && this.doRun) {
      this.isRun = true
      this.timerObj = setInterval(countUp(this), 10)
    } else if (this.isRun && !this.doRun) {
      this.isRun = false
      clearInterval(this.timerObj)
    }
  },
  computed: {
    formatTimer () {
      return format(this.min) + ':' + format(this.sec)+ ':' + format(this.msec)
    }
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
