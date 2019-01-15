<template>
  <div>
    <div
      v-if="modal"
      class="modal-background"/>
    <div>
      <div>ここにタイマーを表示</div>
    </div>
    <div class="puzzle-area">
      <div
        v-if="puzzle"
        class="normal-puzzle">
        <normal-puzzle
          :top=100
          :left=100
          @puzzle-completed="completed"/>
      </div>
      <div
        v-else>{{ resetPuzzle }}</div>
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
    <div
      class="retire"
      @click="openModal">
      諦める
    </div>
    <modal
      class="modal-area"
      @close="closeModal"
      @retry="pushRetry"
      @top="pushTop"
      v-if="modal"/>
  </div>
</template>

<script>
import _ from 'lodash'
import Modal from '~/components/modal/Retire'
import PurpleButton from '~/components/buttons/PurpleButton'
import NormalPuzzle from '~/components/puzzles/Normal'
export default {
  components: {
    Modal,
    PurpleButton,
    NormalPuzzle,
  },
  data() {
    return {
      modal: false,
      puzzle: true,
    }
  },
  watch: {
    // 暫定対応：一定時間パズルをv-ifで破棄し、その後再描画することで初期値に戻す
    puzzle: _.debounce(function(newVal, oldVal) {
      this.puzzle = true
    },
    500)
  },
  methods: {
    completed () {
      alert('パズルが完成しました！') // TODO: アニメーションにする
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map+'/complete')
    },
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    pushRetry() {
      this.modal = false
      this.puzzle = false
    },
    pushTop() {
      this.$router.push('/')
    },
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

.modal-background {
  position: absolute;
  width: 640px;
  height: 1149px;
  opacity: 0.6;
  background-color: #10172b;
}

.modal-area {
  position: relative;
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
