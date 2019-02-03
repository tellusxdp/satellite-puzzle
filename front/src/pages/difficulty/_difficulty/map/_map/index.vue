// パズル
<template lang="pug">
  div.container
    div.modal-background(v-if="modal")
    div.timer-area
      div(v-if="puzzle")
        count-up-timer(:do-run="run")
    div.puzzle-area
      div.hint-area(v-show="hint")
        div.shadow
          img.completed-image(:src="completedImage")
      div(v-show="!hint")
        div(v-if="difficulty === 'easy'")
          div.easy-puzzle(v-if="puzzle", @click.once="puzzleStart")
            easy-puzzle(
              :show-sar="showSar"
              :map-images="mapImages"
              @puzzle-completed="completed")
        div(v-else-if="difficulty === 'normal'")
          div.normal-puzzle(
            v-if="puzzle"
            @click.once="puzzleStart")
            normal-puzzle(
              :show-sar="showSar"
              :map-images="mapImages"
              @puzzle-completed="completed")
          div(v-else) {{ resetPuzzle }}
        div(v-else)
          div.hard-puzzle(
            v-if="puzzle"
            @click.once="puzzleStart")
            hard-puzzle(
              :show-sar="showSar"
              :map-images="mapImages"
              @puzzle-completed="completed")
    br
    div.sar
      p ボタンを押している間、
        br
        | 完成画像を見ることができるよ
    br
    div.center
      prs-button(
        @isPrs="dispHint"
        @isNotPrs="noDispHint") 完成画像を見る
    br
    div.retire(@click="openModal") 諦める
    modal.modal-area(
      @close="closeModal"
      @retry="pushRetry"
      @top="pushTop"
      v-if="modal")
</template>


<script>
import _ from 'lodash'
import CountUpTimer from '~/components/CountUpTimer.vue'
import Modal from '~/components/modal/Retire'
import PrsButton from '~/components/buttons/PrsButton'
import EasyPuzzle from '~/components/puzzles/Easy'
import NormalPuzzle from '~/components/puzzles/Normal'
import HardPuzzle from '~/components/puzzles/Hard'
import { mapGetters, mapActions } from 'vuex'
export default {
  validate ({ params }) {
    // 難易度チェック
    const d = params.difficulty
    const difficulty = (d === 'easy' || d === 'normal' || d === 'hard')
    if (!difficulty) {
      return false
    }

    // マップチェック
    const selectedMap = this.selectedMap
    return selectedMap !== null
  },
  components: {
    CountUpTimer,
    Modal,
    PrsButton,
    EasyPuzzle,
    NormalPuzzle,
    HardPuzzle,
  },
  data() {
    return {
      run: false,
      modal: false,
      puzzle: true,
      hint: false,
      difficultyMap: {
        easy: 3,
        normal: 4,
        hard: 5,
      }
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
    ...mapActions({
      updateBestRecords: 'updateBestRecords',
      setBestRecord: 'setBestRecord'
    }),
    puzzleStart () {
      this.run = true
    },
    completed () {
      alert('パズルが完成しました！') // TODO: アニメーションにする
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map

      const best = this.bestRecords.filter(v => {
        return v.difficulty === difficulty && v.map === map
      })
      if (best.length === 0 || this.min < best[0].min || this.min === best[0].min && this.sec < best[0].sec) {
        this.updateBestRecords({
          difficulty: difficulty,
          map: map,
          min: this.min,
          sec: this.sec
        })
        this.setBestRecord({ min: this.min, sec: this.sec })
      }
      this.$router.push('/difficulty/'+difficulty+'/map/'+map+'/complete')
    },
    openModal() {
      this.modal = true
      this.run = false
    },
    closeModal() {
      this.modal = false
      this.run = true
    },
    pushRetry() {
      this.modal = false
      this.puzzle = false
    },
    pushTop() {
      this.$router.push('/')
    },
    dispHint () {
      this.hint = true
    },
    noDispHint () {
      this.hint = false
    }
  },
  computed: {
    ...mapGetters({
      min: 'min',
      sec: 'sec',
      bestRecords: 'bestRecords',
    }),
    // 可視光画像を表示する時間を指定
    showSar () {
      const sec = this.$store.state.sec
      return !(25 <= sec && sec <= 29 || 55 <= sec && sec <= 59)
    },
    difficulty () { return this.$route.params.difficulty },
    ...mapGetters(["puzzles"]),
    // 選択したマップを返す（不正な値の場合はnull）
    selectedMap () {
      const m = this.puzzles
      const selected = m.filter(v => {
        return v.id === this.$route.params.map
      })
      if (!selected) {
        return null
      }
      if (selected.length !== 1) {
        return null
      }
      return selected[0]
    },
    mapImages () {
      const parameters = this.selectedMap.parameters
      const parameter =  parameters.filter(v => {
        return (v.split_n === this.difficultyMap[this.$route.params.difficulty])
      })

      // TODO: エラー処理
      if (!parameter) {
        return null
      }
      if (parameter.length !== 1) {
        return null
      }

      const p = parameter[0]
      const kind = p.kind
      const x = p.x
      const y = p.y
      const z = p.z
      const n = p.split_n

      return `${kind}/${z}-${x}-${y}-${n}`
    },
    completedImage () {
      return `/images/${this.mapImages}/completed.png`
    }
  }
}
</script>


<style lang="scss" scoped>
.timer-area {
  text-align: left;
  padding-top: 58px;
  width: 256px;
}

.puzzle-area {
  padding-left: 50px;
  padding-top: 20px;
  width: 540px;
  height: 540px;
}

.easy-puzzle {
  top: 50px;
  left: 50px;
  width: 540px;
  height: 540px;
}

.normal-puzzle {
  width: 540px;
  height: 540px;
}

.hard-puzzle {
  top: 50px;
  left: 50px;
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

.hint-area {
  border: inset 20px #5d41f3;
  border-radius: 8px;
  width: 540px;
  height: 540px;
  position: absolute;

  .shadow {
    border: solid 10px #192342;
    width: 500px;
    height: 500px;
    position: relative;
  }
}

.completed-image {
  width: 480px;
  height: 480px;
  background-color: white;
  text-align: center;
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
  position: absolute;
}

.container {
  background-image:
    url('~assets/images/moon/img_pzlmoon.png'),
    url('~assets/images/background/moon/background-2.png'),
    url('~assets/images/background/background.png');
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: initial, 1902px, contain;
  background-position: 0 0, center 636px, center center;
  width: 640px;
  height: 1148px;
}
</style>
