// マップ選択
// params.difficulty(easy, normal, hard)に対応するマップの一覧を表示する
<template lang="pug">
  div.map
    div.return
      button(@click="pushDifficulty") ←レベル選択に戻る
    div.map-area
      div.map-list
        div(v-for="(map, index) in mapList", :key="index")
          puzzle-map(
            :map-name="map.name",
            :map-image="`${map.kind}/${map.z}-${map.x}-${map.y}-${map.n}`",
            @onClick="pushPuzzle(map.id)")
</template>

<script>
import PuzzleMap from '~/components/map/MapImage'
import { mapGetters } from 'vuex';
export default {
  components: {
    PuzzleMap,
  },
  validate({ params }) {
    // 難易度チェック(easy, normal, hard以外は404)
    const d = params.difficulty
    return (d === 'easy' || d === 'normal' || d === 'hard')
  },
  methods: {
    pushPuzzle (id) { // 選択した難易度・マップに対応するパズル画面に遷移する
      this.$router.push(`/difficulty/${this.$route.params.difficulty}/map/${id}`)
    },
    pushDifficulty () { // 難易度選択画面に遷移する
      this.$router.push('/difficulty')
    },
  },
  mounted () {
    var mapList = this.$el.getElementsByClassName('map-list')

    // マップリストのスクロール処理
    mapList[0].addEventListener('scroll', function(event) {
     if (mapList[0].scrollTop === 0) {
        mapList[0].scrollTop = 1;
      }
      else if (mapList[0].scrollTop + mapList[0].clientHeight === mapList[0].scrollHeight) {
        mapList[0].scrollTop = mapList[0].scrollTop - 1;
      }
    },{ passive: false })
  },
  data() {
    return {
      difficultyMap: { // 難易度と画像分割数との対応
        easy: 3,
        normal: 4,
        hard: 5,
      }
    }
  },
  computed: {
    mapList() { // 表示するマップのリストを作成する
      const d = this.$route.params.difficulty // 難易度選択画面で選択した難易度
      const puzzles = this.puzzles // storeからパズルの設定を取得
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


<style lang="scss" scoped>
.return {
  padding-top: 42px;
  margin-left: 34px;
  height: 24px;
  font-family: NotoSansCJKjp;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}

.map-area {
  margin-top: 90px;
}

.map-list {
  overflow: auto;
  height: 1000px;
  width: 640px;
}

.map {
  margin-left: auto;
  margin-right: auto;
}

.puzzle-map {
  margin-bottom: 82px;
  margin-left: auto;
  margin-right: auto;
}
</style>
