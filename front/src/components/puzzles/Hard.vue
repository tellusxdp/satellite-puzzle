<template>
  <div class="hard-puzzle">
    <!-- パズルの枠 -->
    <div
      class="not-ready"
      v-show="!ready">
      準備中です
    </div>
    <div v-show="ready">
      <!-- SAR画像 -->
      <div v-show="showSar">
        <!-- タイル -->
        <div
          class="tile"
          v-for="(tile, index) in tiles"
          :class="'_' + index"
          @click="move"
          :key="index"
          :style="{'top': top + tile.x*100 + 'px', 'left': left + (tile.y)*100 + 'px'}"
        >
          <div :v-show="showSar === true">
            <img
              :src="image(tile)"
              class="tile--image">
          </div>
        </div>
      </div>
      <!-- 可視光画像 -->
      <div v-show="!showSar">
        <!-- タイル -->
        <div
          class="tile"
          v-for="(tile, index) in tiles"
          :class="'_' + index"
          @click="move"
          :key="index"
          :style="{'top': top + tile.x*100 + 'px', 'left': left + (tile.y)*100 + 'px'}"
        >
          <div :v-show="showSar === true">
            <img
              :src="image(tile)"
              class="tile--image light">
          </div>
        </div>
      </div>
    </div>
  </div>
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
    }
  },
  data: () => {
    return {
      // 開始タイル
      // TODO: ランダム配置
      tiles: [
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
      // 正解タイル
      ans: [
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
      // 空白タイル
      empty: {x: 4, y: 4},
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
    // イベントを発火
    this.$emit('puzzle-completed')
  },
  created() {
    if (process.browser) {
      this.ready = true
    }
  },
  methods: {
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

<style>
.not-ready {
  text-align: center;
}

.hard-puzzle {
  position: relative;
}

.tile {
  width: 99px;
  height: 99px;
  border: 1px solid blue;
  position: absolute;
  transition: transform 0.5s ease-in-out;
}

.tile--image {
  width: 99px;
  height: 99px;
}

.light {
  background-color: white;
}

</style>
