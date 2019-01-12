<template>
  <div class="wrapper">
    <div>ここにロゴを表示</div>
    <div>
      <grey-button @onClick="pushStart">ゲームスタート</grey-button>
    </div>
    <div>
      <grey-button @onClick="pushGallery">画像ギャラリー</grey-button>
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
    pushGallery () {
      this.$router.push('/gallery')
    },
    pushStart () {
      this.$router.push('/difficulty')
    },
  },
}
</script>
