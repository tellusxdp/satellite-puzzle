// マップ選択
<template>
  <div class="map">
    <div class="return">
      <button @click="pushDifficulty">←レベル選択に戻る</button>
    </div>
    <div class="map-area">
      <div class="map-list">
        <div
          v-for="(map, index) in mapList"
          :key="index">
          <map-image
            :map-name="map.name"
            :map-image="`${map.kind}/${map.z}-${map.x}-${map.y}-${map.n}`"
            @onClick="pushPuzzle(map.id)"/>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapImage from '~/components/map/MapImage'
import { mapGetters } from 'vuex';
export default {
  validate({ params }) {
    const d = params.difficulty
    // 難易度チェック
    return (d === 'easy' || d === 'normal' || d === 'hard')
  },
  components: {
    MapImage,
  },
  methods: {
    pushPuzzle (id) {
      this.$router.push(`/difficulty/${this.$route.params.difficulty}/map/${id}`)
    },
    pushDifficulty () {
      this.$router.push('/difficulty')
    },
  },
  data() {
    return {
      difficultyMap: {
        easy: 3,
        normal: 4,
        hard: 5,
      }
    }
  },
  computed: {
    mapList() {
      const d = this.$route.params.difficulty
      const puzzles = this.puzzles
      // 指定された難易度の画像をもつObjectを取得
      const list =  puzzles.filter(puzzle => {
        return puzzle.parameters.find(parameter => {
          return parameter.split_n === this.difficultyMap[d]
        })
      })
      let target = []
      // Objectから必要な値を取得
      list.forEach(e => {
        const p = e.parameters.filter(v => {
          return v.split_n === this.difficultyMap[d]
        })
        target.push({
          id: e.id,
          name: e.name,
          kind: p[0].kind,
          x: p[0].x,
          y: p[0].y,
          z: p[0].z,
          n: p[0].split_n
        })
      })

      return target
    },
    ...mapGetters(['puzzles'])
  }
}
</script>

<style>
.return {
  /* width: 213px; */

  /* height: 24px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
  position: relative;
  left: 34px;
  top: 97px;
}

.map-area {
  margin-top: 211px;
  margin-left: 81px;
}

.map-list {
  overflow: auto;
  height: 90vh;
}

.map {
  margin-left: auto;
  margin-right: auto;
}
</style>
