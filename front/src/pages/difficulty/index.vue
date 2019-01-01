<template>
  <div>
    <p>難易度選択画面</p>
    <button
      class="button--green"
      @click="easy"
    >
      初級
    </button>
    <button
      class="button--green"
      @click="normal"
    >
      中級
    </button>
    <button
      class="button--green"
      @click="hard"
    >
      上級
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    easy() {
      this.$router.push('/difficulty/easy/map')
    },
    normal() {
      this.$router.push('/difficulty/normal/map')
    },
    hard() {
      this.$router.push('/difficulty/hard/map')
    },
  }
}
</script>