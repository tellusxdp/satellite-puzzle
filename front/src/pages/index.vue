<template>
  <div class="wrapper">
    <div>ここにロゴを表示</div>
    <div @click="start">
      <grey-button>ゲームスタート</grey-button>
    </div>
    <div @click="gallery">
      <grey-button>画像ギャラリー</grey-button>
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
    start() {
      this.$router.push('/difficulty')
    },
    gallery() {
      this.$router.push('/gallery')
    },
  }
}
</script>
