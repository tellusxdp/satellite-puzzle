<template>
  <div class="wrapper">
    <div>
      <div>スタートから</div>
      <div>ここにタイマーを表示</div>
    </div>
    <div>
      <normal-puzzle @puzzle-completed="completed"/>
    </div>
    <div>
      <gray-button>ヒントを見る</gray-button>
    </div>
    <div>ここにテキストを表示</div>
    <div>
      <gray-button>諦める</gray-button>
    </div>
  </div>
</template>

<script>
import GrayButton from '~/components/buttons/GrayButton'
import NormalPuzzle from '~/components/puzzles/Normal'
export default {
  components: {
    GrayButton,
    NormalPuzzle,
  },
  methods: {
    completed () {
      alert('パズルが完成しました！') // TODO: アニメーションにする
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map+'/complete')
    }
  }
}
</script>
