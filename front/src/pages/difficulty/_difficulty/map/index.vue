<template>
  <div class="wrapper">
    <div @click="difficulty">
      <grey-button>レベル選択に戻る</grey-button>
    </div>
    <div>ふつうモード</div>
    <div @click="puzzle('kilauea')">
      <grey-button>キラウエア火山</grey-button>
    </div>
    <div @click="puzzle('kilauea')">
      <grey-button>キラウエア火山</grey-button>
    </div>
    <div @click="puzzle('kilauea')">
      <grey-button>キラウエア火山</grey-button>
    </div>
  </div>
</template>

<script>
import GreyButton from '~/components/buttons/GreyButton'
export default {
  components: {
    GreyButton,
  },
  methods: {
    puzzle (map) {
      const difficulty = this.$route.params.difficulty
      this.$router.push('/difficulty/'+difficulty+'/map/'+map)
    },
    difficulty () {
      this.$router.push('/difficulty')
    }
  }
}
</script>
