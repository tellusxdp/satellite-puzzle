<template>
  <div>
    <p>パズル終了画面</p>
    <button
      class="button--green"
      @click="retry"
    >
      もう一度チャレンジ
    </button>
    <button
      class="button--green"
      @click="otherMap"
    >
      別の画像で遊ぶ
    </button>
    <button
      class="button--green"
      @click="top"
    >
      終了ボタン
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    retry() {
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map)
    },
    otherMap() {
      const difficulty = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map')
    },
    top() {
      this.$router.push('/')
    }
  }
}



</script>
