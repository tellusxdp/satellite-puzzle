<template>
  <div class="wrapper">
    <div>
      <grey-button :next-path="difficulty">レベル選択に戻る</grey-button>
    </div>
    <div>ふつうモード</div>
    <div>
      <grey-button :next-path="kilauea">キラウエア火山</grey-button>
    </div>
    <div>
      <grey-button :next-path="kilauea">キラウエア火山</grey-button>
    </div>
    <div>
      <grey-button :next-path="kilauea">キラウエア火山</grey-button>
    </div>
  </div>
</template>

<script>
import GreyButton from '~/components/buttons/GreyButton'
export default {
  components: {
    GreyButton,
  },
  computed: {
    kilauea () {
      return '/difficulty/'+this.$route.params.difficulty+'/map/kilauea'
    },
    difficulty () {
      return '/difficulty'
    }
  }
}
</script>
