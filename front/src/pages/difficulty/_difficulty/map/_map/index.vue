<template>
  <div>
    <div>
      <div>ここにタイマーを表示</div>
    </div>
    <div class="puzzle-area">
      <div class="normal-puzzle">
        <normal-puzzle
          :top=0
          :left=100
          @puzzle-completed="completed"/>
      </div>
    </div>
    <br>
    <div class="sar">
      <p>ボタンを押している間、<br>SAR画像が可視光画像に変わるよ</p>
    </div>
    <br>
    <div class="center">
      <purple-button>可視光画像を見る</purple-button>
    </div>
    <br>
    <div class="retire">諦める</div>
  </div>
</template>

<script>
import PurpleButton from '~/components/buttons/PurpleButton'
import NormalPuzzle from '~/components/puzzles/Normal'
export default {
  components: {
    PurpleButton,
    NormalPuzzle,
  },
  methods: {
    completed () {
      alert('パズルが完成しました！') // TODO: アニメーションにする
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map+'/complete')
    }
  }
}
</script>

<style>
.puzzle-area {
  width: 540px;
  height: 540px;
}

.normal-puzzle {
  width: 540px;
  height: 540px;
}

.center {
  text-align: center;
}

.sar {
  /* width: 360px; */

  /* height: 59px; */

  /* font-family: RodinProN-DB; */
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #192342;
  margin-top: 30px;
}

.retire {
  /* width: 69px; */

  /* height: 22px; */

  /* font-family: RodinProN-DB; */
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #3f444e;
}

.contents {
  background-image:
    url('~assets/images/moon/moon.png'),
    url('~assets/images/background/moon/moon.png'),
    url('~assets/images/background/moon/background-2.png'),
    url('~assets/images/background/background.png');
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 20vh, 24vh, cover, contain;
  background-position: -5vh -5vh, -7vh -7vh, center 50vh, center center;
  height: auto, auto, auto, 100vh;
  width: auto, auto, auto, calc(100vh / 1149 * 640);
}
</style>
