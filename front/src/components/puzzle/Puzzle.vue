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
                :class="`_${tile.no}`"
                @click="tile.move = true"
                :key="index")
                transition(
                  @leave="tileMove(tile.no)"
                  @after-leave="tileMoved(tile.no)")
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
import _ from 'lodash'
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
    cTiles () {
      return this.tiles[this.difficulty]
    },
    cAns () {
      return this.ans[this.difficulty]
    },
    cEmpty () {
      return this.empty[this.difficulty]
    }
  },
  mounted () {
    this.mountedMethod()
  },
  updated () {
    this.updatedMethod()
  },
  methods: {
    // タイルの位置を変更する
    setTilePosition (no) {
      const tile = this.$el.getElementsByClassName(`_${no}`)[0]
      const cTile = this.cTiles.find(v => {
        return v.no === no
      })
      tile.style.top = `${cTile.x*this.px}px`
      tile.style.left = `${cTile.y*this.px}px`
      cTile.move = false
    },
    mountedMethod () {
      // タイルの初期位置を決定する
      this.cTiles.forEach(e => {
        this.setTilePosition(e.no)
      })
      this.$emit('ready')
    },
    updatedMethod () {
      // 正解判定を行う
      for (let i = 0; i < this.cTiles.length; i++) {
        if ((this.cTiles[i].x !== this.cAns[i].x) ||
          (this.cTiles[i].y !== this.cAns[i].y)) {
          return
        }
      }
      // 正解していた場合、puzzleCompleteをemitする
      this.isComplete = true
      this.$emit('puzzleComplete')
    },
    // @leaveでタイルをスライドさせる処理
    tileMove (no, done) {
      const tile = this.$el.getElementsByClassName(`_${no}`)[0]
      this.move(no) // 移動可能か判定し、可能ならx,yを変更する
    },
    // @after-leaveでタイルをスライドさせる処理
    tileMoved (no) {
      this.setTilePosition(no) // tileMoveで変更したx,yに従ってタイルを移動する
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
    move (no) {
      const tTiles = this.cTiles.find(v => {
        return v.no === no
      })
      // 移動してもいいか確認する, OKなら移動する
      if (this.canMoveDown(tTiles, this.cEmpty)) {
        this.cEmpty.x = tTiles.x  // 空ブロックの位置を変更
        tTiles.x = tTiles.x + 1 // 移動
        return
      }

      if (this.canMoveUp(tTiles, this.cEmpty)) {
        this.cEmpty.x = tTiles.x // 空ブロックの位置を変更
        tTiles.x = tTiles.x - 1 // 移動
        return
      }

      if (this.canMoveRight(tTiles, this.cEmpty)) {
        this.cEmpty.y = tTiles.y // 空ブロックの位置を変更
        tTiles.y = tTiles.y + 1 // 移動
        return
      }

      if (this.canMoveLeft(tTiles, this.cEmpty)) {
        this.cEmpty.y = tTiles.y // 空ブロックの位置を変更
        tTiles.y = tTiles.y - 1 // 移動
        return
      }
    },
    canMoveDown (target, empty) {
      return _.isEqual({x: target.x + 1, y: target.y}, empty)
    },
    canMoveUp (target, empty) {
      return _.isEqual({x: target.x - 1, y: target.y}, empty)
    },
    canMoveRight (target, empty) {
      return _.isEqual({x: target.x, y: target.y + 1}, empty)
    },
    canMoveLeft (target, empty) {
      return _.isEqual({x: target.x, y: target.y - 1}, empty)
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
    transition: 0.25s;
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
