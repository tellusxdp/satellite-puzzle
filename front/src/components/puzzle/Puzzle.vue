// パズル
// propsのdifficultyで難易度を判定する（easy, normal, hard）
// パズルが完成した場合、puzzleCompleteをemitする
// パズルが終了（完成アニメーションも終了）した場合、pushCompleteをemitする
<template lang="pug">
  .puzzle
    .puzzle-area
      .shadow
        transition(
          name="fade-in"
          @after-enter="pushComplete")
          .completed-image(
            v-show="isComplete")
            img.completed-image(:src="completedImage")
        transition(name="fade-out")
          div(v-show="!isComplete")
            .tiles(v-for="(tile, index) in tiles[difficulty]")
              .tile(
                :style="styles"
                :class="`_${index}`"
                @click="tile.move = true"
                :key="index")
                transition(
                  @leave="tileMove(index)"
                  @after-leave="tileMoved(index)")
                  div(v-show="!tile.move")
                    div(v-show="showSar")
                      img.tile--image(
                        :src="image(tile.no)"
                        :style="styles")
                    div(v-show="!showSar")
                      img.tile--image(
                        :src="image(tile.no)"
                        :style="styles")
</template>

<script>
export default {
  props: {
    top: { // パズルの位置を調整する
      type: Number,
      default: 0,
    },
    left: { // パズルの位置を調整する
      type: Number,
      default: 0,
    },
    showSar: { // SAR画像と可視光画像を切り替える
      type: Boolean,
      default: true,
    },
    mapImages: { // 分割された画像のパス
      type: String,
      default: "",
    },
    completedImage: { // 完成画像のパス
      type: String,
      default: "",
    },
    difficulty: { // 難易度（easy, normal, hard）
      type: String,
      default: "normal"
    }
  },
  data: () => {
    return {
      isComplete: false, // パズルが完成しているか
      ready: false, // パズルの準備ができているか
      tiles: { // 開始タイル TODO: ランダム配置
        easy: [
          { no:1, x: 0, y: 0, move: false },
          { no:2, x: 0, y: 1, move: false },
          { no:3, x: 0, y: 2, move: false },
          { no:4, x: 1, y: 0, move: false },
          { no:5, x: 1, y: 1, move: false },
          { no:6, x: 1, y: 2, move: false },
          { no:7, x: 2, y: 0, move: false },
          { no:8, x: 2, y: 1, move: false },
        ],
        normal: [
          { no:1,  x: 0, y: 0, move: false },
          { no:2,  x: 0, y: 1, move: false },
          { no:3,  x: 0, y: 2, move: false },
          { no:4,  x: 0, y: 3, move: false },
          { no:5,  x: 1, y: 0, move: false },
          { no:6,  x: 1, y: 1, move: false },
          { no:7,  x: 1, y: 2, move: false },
          { no:8,  x: 1, y: 3, move: false },
          { no:9,  x: 2, y: 0, move: false },
          { no:10, x: 2, y: 1, move: false },
          { no:11, x: 2, y: 2, move: false },
          { no:12, x: 2, y: 3, move: false },
          { no:13, x: 3, y: 1, move: false },
          { no:14, x: 3, y: 2, move: false },
          { no:15, x: 3, y: 3, move: false },
        ],
        hard: [
          { no:'1',  x: 0, y: 0, move: false },
          { no:'2',  x: 0, y: 1, move: false },
          { no:'3',  x: 0, y: 2, move: false },
          { no:'4',  x: 0, y: 3, move: false },
          { no:'5',  x: 0, y: 4, move: false },
          { no:'6',  x: 1, y: 0, move: false },
          { no:'7',  x: 1, y: 1, move: false },
          { no:'8',  x: 1, y: 2, move: false },
          { no:'9',  x: 1, y: 3, move: false },
          { no:'10', x: 1, y: 4, move: false },
          { no:'11', x: 2, y: 0, move: false },
          { no:'12', x: 2, y: 1, move: false },
          { no:'13', x: 2, y: 2, move: false },
          { no:'14', x: 2, y: 3, move: false },
          { no:'15', x: 2, y: 4, move: false },
          { no:'16', x: 3, y: 0, move: false },
          { no:'17', x: 3, y: 1, move: false },
          { no:'18', x: 3, y: 2, move: false },
          { no:'19', x: 3, y: 3, move: false },
          { no:'20', x: 3, y: 4, move: false },
          { no:'21', x: 4, y: 0, move: false },
          { no:'22', x: 4, y: 1, move: false },
          { no:'23', x: 4, y: 2, move: false },
          { no:'24', x: 4, y: 3, move: false },
        ],
      },
      empty: { // 空白タイル
        easy: {x: 2, y: 2},
        normal: {x: 3, y: 0},
        hard: {x:4, y: 4},
      },
      ans: { // 正解タイル
        easy: [
          {no:1, x: 0, y: 0},
          {no:2, x: 0, y: 1},
          {no:3, x: 0, y: 2},
          {no:4, x: 1, y: 0},
          {no:5, x: 1, y: 1},
          {no:6, x: 1, y: 2},
          {no:7, x: 2, y: 0},
          {no:8, x: 2, y: 1},
        ],
        normal: [
          {no:1, x: 0, y: 0},
          {no:2, x: 0, y: 1},
          {no:3, x: 0, y: 2},
          {no:4, x: 0, y: 3},
          {no:5, x: 1, y: 0},
          {no:6, x: 1, y: 1},
          {no:7, x: 1, y: 2},
          {no:8, x: 1, y: 3},
          {no:9, x: 2, y: 0},
          {no:10, x: 2, y: 1},
          {no:11, x: 2, y: 2},
          {no:12, x: 2, y: 3},
          {no:13, x: 3, y: 0},
          {no:14, x: 3, y: 1},
          {no:15, x: 3, y: 2},
        ],
        hard: [
          {no:'1', x: 0, y: 0},
          {no:'2', x: 0, y: 1},
          {no:'3', x: 0, y: 2},
          {no:'4', x: 0, y: 3},
          {no:'5', x: 0, y: 4},
          {no:'6', x: 1, y: 0},
          {no:'7', x: 1, y: 1},
          {no:'8', x: 1, y: 2},
          {no:'9', x: 1, y: 3},
          {no:'10', x: 1, y: 4},
          {no:'11', x: 2, y: 0},
          {no:'12', x: 2, y: 1},
          {no:'13', x: 2, y: 2},
          {no:'14', x: 2, y: 3},
          {no:'15', x: 2, y: 4},
          {no:'16', x: 3, y: 0},
          {no:'17', x: 3, y: 1},
          {no:'18', x: 3, y: 2},
          {no:'19', x: 3, y: 3},
          {no:'20', x: 3, y: 4},
          {no:'21', x: 4, y: 0},
          {no:'22', x: 4, y: 1},
          {no:'23', x: 4, y: 2},
          {no:'24', x: 4, y: 3},
        ],
      },
    }
  },
  computed: {
    px () { // 難易度に応じてタイルの大きさを調整する
      const map = {easy: 160, normal: 120, hard: 96}
      return map[this.difficulty]
    },
    styles () { // 難易度に応じてcssにpxを適用する
      return {
        '--px': this.px + 'px'
      }
    },
  },
  mounted () {
    // タイルの初期位置を決定する
    this.tiles[this.difficulty].forEach((element,index) => {
      const tile = this.$el.getElementsByClassName(`_${element.no-1}`)[0]
      tile.style.top = `${this.tiles[this.difficulty][index].x*this.px}px`
      tile.style.left = `${this.tiles[this.difficulty][index].y*this.px}px`
    })
  },
  updated () {
    // 正解判定を行う
    for (let i = 0; i < this.tiles[this.difficulty].length; i++) {
      if ((this.tiles[this.difficulty][i].x !== this.ans[this.difficulty][i].x) ||
        (this.tiles[this.difficulty][i].y !== this.ans[this.difficulty][i].y)) {
        return
      }
    }
    // 正解していた場合、puzzleCompleteをemitする
    this.isComplete = true
    this.$emit('puzzleComplete')
  },
  created() {
    // パズルの準備ができたことを検知する
    if (process.browser) {
      this.$emit('ready')
    }
  },
  methods: {
    // @leaveでタイルをスライドさせる処理
    tileMove (e, done) {
      const tile = this.$el.getElementsByClassName(`_${e}`)[0]
      this.move(e)
      tile.style.transition = "0.25s"
    },
    // @after-leaveでタイルをスライドさせる処理
    tileMoved (e) {
      const tile = this.$el.getElementsByClassName(`_${e}`)[0]
      tile.style.top = `${this.tiles[this.difficulty][e].x*this.px}px`
      tile.style.left = `${this.tiles[this.difficulty][e].y*this.px}px`
      this.tiles[this.difficulty][e].move = false
    },
    // パズルが完成した場合の処理
    pushComplete () {
      this.$emit('pushComplete')
    },
    // 各タイルに設定する画像を指定
    image (id) {
      return `/images/${this.mapImages}/${id}.png`
    },
    // タイルが移動できるか判定する
    move (e) {
      const target = e
      // 移動してもいいか確認する, OKなら移動する
      // x + 1に移動
      if ((this.tiles[this.difficulty][target].x + 1 === this.empty[this.difficulty].x) &&
        (this.tiles[this.difficulty][target].y === this.empty[this.difficulty].y)) {
        // 空ブロックの位置を変更
        this.empty[this.difficulty].x = this.tiles[this.difficulty][target].x
        // 移動
        this.tiles[this.difficulty][target].x = this.tiles[this.difficulty][target].x + 1

      // x - 1に移動
      } else if ((this.tiles[this.difficulty][target].x - 1 === this.empty[this.difficulty].x) &&
        (this.tiles[this.difficulty][target].y === this.empty[this.difficulty].y)) {
        // 空ブロックの位置を変更
        this.empty[this.difficulty].x = this.tiles[this.difficulty][target].x
        // 移動
        this.tiles[this.difficulty][target].x = this.tiles[this.difficulty][target].x - 1

      // y + 1に移動
      } else if ((this.tiles[this.difficulty][target].x === this.empty[this.difficulty].x) &&
        (this.tiles[this.difficulty][target].y + 1 === this.empty[this.difficulty].y)) {
        // 空ブロックの位置を変更
        this.empty[this.difficulty].y = this.tiles[this.difficulty][target].y
        // 移動
        this.tiles[this.difficulty][target].y = this.tiles[this.difficulty][target].y + 1

      // y - 1に移動
      } else if ((this.tiles[this.difficulty][target].x === this.empty[this.difficulty].x) &&
        (this.tiles[this.difficulty][target].y - 1 === this.empty[this.difficulty].y)) {
        // 空ブロックの位置を変更
        this.empty[this.difficulty].y = this.tiles[this.difficulty][target].y
        // 移動
        this.tiles[this.difficulty][target].y = this.tiles[this.difficulty][target].y - 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.puzzle-area {
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
    background-color: #4a34c2;
  }

  .tile {
    width: var(--px);
    height: var(--px);
    position: absolute;
  }

  .tile--image {
    width: var(--px);
    height: var(--px);
    border: outset 6px;
  }
}

.completed-image {
  width: 480px;
  height: 480px;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 3s;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 3s;
}

.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
}

</style>
