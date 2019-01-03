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
      <grey-button>ヒントを見る</grey-button>
    </div>
    <div>ここにテキストを表示</div>
    <div>
      <grey-button>諦める</grey-button>
    </div>
  </div>
</template>

<script>
import GreyButton from '~/components/buttons/GreyButton'
import NormalPuzzle from '~/components/puzzles/Normal'
export default {
  components: {
    GreyButton,
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
