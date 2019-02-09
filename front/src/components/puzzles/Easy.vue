<template lang="pug">
  .easy-puzzle
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
            .tile(
              v-for="(tile, index) in tiles",
              :class="`_${index}`"
              @click="move"
              :key="index"
              :style="{'top': tile.x*160 + 'px', 'left': (tile.y)*160 + 'px'}")
              div(v-show="showSar")
                img.tile--image(:src="image(tile)")
              div(v-show="!showSar")
                img.tile--image(:src="image(tile)")
</template>

<script>
export default {
  mounted () {
  },
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
        {no:'1', x: 0, y: 0},
        {no:'2', x: 0, y: 1},
        {no:'3', x: 0, y: 2},
        {no:'4', x: 1, y: 0},
        {no:'5', x: 1, y: 1},
        {no:'6', x: 1, y: 2},
        {no:'7', x: 2, y: 0},
        {no:'8', x: 2, y: 1},
      ],
      // 正解タイル
      ans: [
        {no:'1', x: 0, y: 0},
        {no:'2', x: 0, y: 1},
        {no:'3', x: 0, y: 2},
        {no:'4', x: 1, y: 0},
        {no:'5', x: 1, y: 1},
        {no:'6', x: 1, y: 2},
        {no:'7', x: 2, y: 0},
        {no:'8', x: 2, y: 1},

      ],
      // 空白タイル
      empty: {x: 2, y: 2},
      width: 0,
      ready: false,
    }
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
    pushComplete () {
      // パズルが完成したことを親に伝える
      this.$emit('pushComplete')
    },
    image (tile) {
      return `/images/${this.mapImages}/${tile.no}.png`
    },
    // TODO: フリックでの移動に対応
    move (e) {
      // クリックしたブロックを特定
      let cName = e.currentTarget.classList
      let target = cName[1].slice(1)

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
    width: 160px;
    height: 160px;
    position: absolute;
  }

  .tile--image {
    width: 160px;
    height: 160px;
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
