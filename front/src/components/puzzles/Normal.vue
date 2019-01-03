<template>
  <div class="pazzle">
    <!-- パズルの枠 -->
    <div v-show="!ready">
      準備中です
    </div>
    <div v-show="ready">
      <div>
        <!-- タイル -->
        <div
          class="tile"
          v-for="(tile, index) in tiles"
          :class="'_' + index"
          @click="move"
          :key="index"
          :style="{'top': tile.x*50 + 'px', 'left': width/2+(tile.y)*50-125 + 'px'}"
        >
          <p>{{ tile.no }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      // 開始タイル
      // TODO: ランダム配置
      tiles: [
       {no:1,  x:0, y:1},
       {no:2,  x:1, y:0},
       {no:3,  x:0, y:3},
       {no:4,  x:2, y:3},
       {no:5,  x:0, y:0},
       {no:6,  x:1, y:1},
       {no:7,  x:1, y:3},
       {no:8,  x:0, y:2},
       {no:9,  x:2, y:0},
       {no:10, x:2, y:1},
       {no:11, x:1, y:2},
       {no:12, x:3, y:2},
       {no:13, x:3, y:0},
       {no:14, x:3, y:1},
       {no:15, x:2, y:2}
      ],
      // 正解タイル
      ans: [
        {no: 1, x: 0, y: 0},
        {no: 2, x: 0, y: 1},
        {no: 3, x: 0, y: 2},
        {no: 4, x: 0, y: 3},
        {no: 5, x: 1, y: 0},
        {no: 6, x: 1, y: 1},
        {no: 7, x: 1, y: 2},
        {no: 8, x: 1, y: 3},
        {no: 9, x: 2, y: 0},
        {no: 10, x: 2, y: 1},
        {no: 11, x: 2, y: 2},
        {no: 12, x: 2, y: 3},
        {no: 13, x: 3, y: 0},
        {no: 14, x: 3, y: 1},
        {no: 15, x: 3, y: 2},
      ],
      // 空白タイル
      empty: {x: 3, y: 3},
      width: 0,
      ready: false,
    }
  },
  updated () {
    // 正解判定
    for (var i = 0; i < this.tiles.length; i++) {
      if ((this.tiles[i].x !== this.ans[i].x) ||
        (this.tiles[i].y !== this.ans[i].y)) {
        return
      }
    }
    // イベントを発火
    this.$emit('puzzle-completed')
  },
  created: function() {
    if (process.browser) {
      this.handleResize()
      window.addEventListener('resize', this.handleResize, false);
      this.ready = true
    }
  },
  methods: {
    handleResize: function() {
      this.width = window.innerWidth;
    },
    // TODO: フリックでの移動に対応
    move (e) {
      // クリックしたブロックを特定
      var cName = e.currentTarget.classList
      console.log(cName)
      var target = cName[1].slice(1)
      console.log(target)

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
.pazzle {
  position: relative;
  margin: 30px;
  height: 200px;
}

.tile {
  width: 49px;
  height: 49px;
  border: 1px solid blue;
  position: absolute;
  transition: transform 0.5s ease-in-out;
}
</style>
