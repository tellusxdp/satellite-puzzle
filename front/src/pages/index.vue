<template>
  <div class="wrapper">
    <div>ここにロゴを表示</div>
    <div>
      <grey-button :next-path="start">ゲームスタート</grey-button>
    </div>
    <div>
      <grey-button :next-path="gallery">画像ギャラリー</grey-button>
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
    start () {
      return '/difficulty'
    },
    gallery () {
      return '/gallery'
    }
  }
}
</script>
