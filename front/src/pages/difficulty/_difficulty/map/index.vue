<template>
  <div class="wrapper">
    <div>
      <gray-button @onClick="pushDifficulty">レベル選択に戻る</gray-button>
    </div>
    <div>ふつうモード</div>
    <div>
      <gray-button @onClick="pushKilauea">キラウエア火山</gray-button>
    </div>
    <div>
      <gray-button @onClick="pushKilauea">キラウエア火山</gray-button>
    </div>
    <div>
      <gray-button @onClick="pushKilauea">キラウエア火山</gray-button>
    </div>
  </div>
</template>

<script>
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
    GrayButton,
  },
  methods :{
    pushKilauea () {
      this.$router.push('/difficulty/'+this.$route.params.difficulty+'/map/kilauea')
    },
    pushDifficulty () {
      this.$router.push('/difficulty')
    }
  }
}
</script>
