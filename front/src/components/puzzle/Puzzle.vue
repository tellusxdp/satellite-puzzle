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
            .tiles(v-for="(tile, index) in tiles")
              .tile(
                :style="styles"
                :class="`_${tile.no}`"
                @click="tile.move = true"
                :key="index")
                transition(
                  @leave="tileMove(tile.no)"
                  @after-leave="tileMoved(tile.no)")
                  div(v-show="!tile.move")
                    tile(
                      v-show="showSar"
                      :image="imageSar(tile.no)"
                      :size="px"
                    )
                    tile(
                      v-show="!showSar"
                      :image="image(tile.no)"
                      :size="px")
</template>

<script>
import _ from 'lodash'
import Tile from '~/components/puzzle/Tile'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Tile,
  },
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
      tiles: [],
      ans: [],
      empty: [],
    }
  },
  computed: {
    ...mapGetters({
      version: 'version'
    }),
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
      return this.tiles
    },
    cAns () {
      return this.ans
    },
    cEmpty () {
      return this.empty
    },
    puzzleSetting () {
      // jsonからタイル表示用の値を設定する
      const json = require('~/static/tiles.json')
      const tileList = json.tiles[this.difficulty]
      const positions = json.positions[this.difficulty]

      // 空白の位置を決定する
      const empty = json.empty[this.difficulty]

      // 正解の組み合わせを作成する
      const ans = []
      positions.forEach((e,i) => {
        ans.push({
          no: i+1,
          x: e.x,
          y: e.y
        })
      })

     // 使用するタイルをランダムに決定する
      const tiles = []

      let v = this.version
      // 使用するタイルの配列が指定されていない場合
      if (v === -1 || v > tileList.length) {
        v = Math.floor( Math.random() * tileList.length)
        this.setVersion(v) // 0 ~ 配列の要素数 までの乱数
      }
      tileList[v].forEach((e, i) => {
        const p = positions.find(v => {
          return v.p === e
        })
        tiles.push({
          no: i+1,
          x: p.x,
          y: p.y,
          move: false
        })
      })
      return {
        tiles: tiles,
        ans: ans,
        empty: empty,
      }
    }
  },
  created () {
    const { tiles, ans, empty } = this.puzzleSetting
    this.tiles = tiles.concat()
    this.ans = ans
    this.empty = {x: empty.x, y: empty.y}
  },
  mounted () {
    this.mountedMethod()
  },
  updated () {
    this.updatedMethod()
  },
  methods: {
    ...mapActions({
      setVersion: 'setVersion',
    }),
    reset () {
      const { tiles, empty } = this.puzzleSetting
      this.tiles = null
      this.tiles = tiles.concat()
      this.empty = {x: empty.x, y: empty.y}
    },
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
      // すでに完成判定を行なっていた場合は処理を終了する
      if (this.isComplete) {
        return
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
    imageSar (id) {
      return `/images/${this.mapImages}/sar/${id}.png`
    },
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
  background-color: #192342;

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
