<template lang="pug">
  .normal-puzzle
    .not-ready(v-show="!ready") 準備中です
    .puzzle-area(v-show="ready")
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
                :class="`_${index}`"
                @click="tile.move = true"
                :key="index")
                transition(
                  @leave="tileMove(index)"
                  @after-leave="tileMoved(index)")
                  div(v-show="!tile.move")
                    div(v-show="showSar")
                      img.tile--image(:src="image(tile.no)")
                    div(v-show="!showSar")
                      img.tile--image(:src="image(tile.no)")
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    // SAR画像と可視光画像を切り替えるパラメーター
    showSar: {
      type: Boolean,
      default: true,
    },
    mapImages: {
      type: String,
      default: "",
    },
    completedImage: {
      type: String,
      default: "",
    }
  },
  data: () => {
    return {
      // 完成判定
      isComplete: false,
      // 開始タイル
      // TODO: ランダム配置
      tiles: [
        {no:1,  x: 0, y: 0, move: false},
        {no:2,  x: 0, y: 1, move: false},
        {no:3,  x: 0, y: 2, move: false},
        {no:4,  x: 0, y: 3, move: false},
        {no:5,  x: 1, y: 0, move: false},
        {no:6,  x: 1, y: 1, move: false},
        {no:7,  x: 1, y: 2, move: false},
        {no:8,  x: 1, y: 3, move: false},
        {no:9,  x: 2, y: 0, move: false},
        {no:10, x: 2, y: 1, move: false},
        {no:11, x: 2, y: 2, move: false},
        {no:12, x: 2, y: 3, move: false},
        {no:13, x: 3, y: 0, move: false},
        {no:14, x: 3, y: 1, move: false},
        {no:15, x: 3, y: 2, move: false},
      ],
      // 正解タイル
      ans: [
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
      // 空白タイル
      empty: {x: 3, y: 3},
      width: 0,
      ready: false,
    }
  },
  mounted () {
    // 初期配置
    this.tiles.forEach((element,index) => {
      const tile = this.$el.getElementsByClassName(`_${element.no-1}`)[0]
      tile.style.top = `${this.tiles[index].x*120}px`
      tile.style.left = `${this.tiles[index].y*120}px`
    })
  },
  updated () {
    // 正解判定
    for (let i = 0; i < this.tiles.length; i++) {
      if ((this.tiles[i].x !== this.ans[i].x) ||
        (this.tiles[i].y !== this.ans[i].y)) {
        return
      }
    }
    this.isComplete = true
    this.$emit('puzzleComplete')
  },
  created() {
    if (process.browser) {
      this.ready = true
    }
  },
  methods: {
    // タイル移動
    tileMove (e, done) {
      const tile = this.$el.getElementsByClassName(`_${e}`)[0]
      this.move(e)
      tile.style.transition = "0.5s"
    },
    tileMoved (e) {
      const tile = this.$el.getElementsByClassName(`_${e}`)[0]
      tile.style.top = `${this.tiles[e].x*120}px`
      tile.style.left = `${this.tiles[e].y*120}px`
      this.tiles[e].move = false
    },
    pushComplete () {
      // パズルが完成したことを親に伝える
      this.$emit('pushComplete')
    },
    image (id) {
      return `/images/${this.mapImages}/${id}.png`
    },
    // TODO: フリックでの移動に対応
    move (e) {
      const target = e
      // 移動してもいいか確認する, OKなら移動する
      // x + 1に移動
      if ((this.tiles[target].x + 1 === this.empty.x) &&
        (this.tiles[target].y === this.empty.y)) {
        // 空ブロックの位置を変更
        this.empty.x = this.tiles[target].x
        // 移動
        this.tiles[target].x = this.tiles[target].x + 1

      // x - 1に移動
      } else if ((this.tiles[target].x - 1 === this.empty.x) &&
        (this.tiles[target].y === this.empty.y)) {
        // 空ブロックの位置を変更
        this.empty.x = this.tiles[target].x
        // 移動
        this.tiles[target].x = this.tiles[target].x - 1

      // y + 1に移動
      } else if ((this.tiles[target].x === this.empty.x) &&
        (this.tiles[target].y + 1 === this.empty.y)) {
        // 空ブロックの位置を変更
        this.empty.y = this.tiles[target].y
        // 移動
        this.tiles[target].y = this.tiles[target].y + 1

      // y - 1に移動
      } else if ((this.tiles[target].x === this.empty.x) &&
        (this.tiles[target].y - 1 === this.empty.y)) {
        // 空ブロックの位置を変更
        this.empty.y = this.tiles[target].y
        // 移動
        this.tiles[target].y = this.tiles[target].y - 1
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.not-ready {
  text-align: center;
}

.normal-puzzle {
  position: relative;
}

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
    width: 120px;
    height: 120px;
    position: absolute;
  }

  .tile--image {
    width: 120px;
    height: 120px;
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
