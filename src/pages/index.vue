<template>
  <div>
    <p>スタート画面</p>
    <button
      class="button--green"
      @click="start"
    >
      ゲームスタート
    </button>
    <button
      class="button--green"
      @click="gallery"
    >
      画像ギャラリー
    </button> 
  </div>
</template>

<script>
export default {
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
