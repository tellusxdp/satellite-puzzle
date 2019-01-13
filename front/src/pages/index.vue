<template>
  <div class="wrapper">
    <div>ここにロゴを表示</div>
    <div>
      <gray-button @onClick="pushStart">ゲームスタート</gray-button>
    </div>
    <div>
      <gray-button @onClick="pushGallery">画像ギャラリー</gray-button>
    </div>
  </div>
</template>

<script>
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
    GrayButton,
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
