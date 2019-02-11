// クリックボタン
// clickでonClickをemitする
<template lang="pug">
  button(@click="click", :style="styles")
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('onClick')
    }
  },
  props: {
    src: { // 通常時のボタン画像
      type: String,
      default: ""
    },
    srcActive: { // 押下時のボタン画像
      type: String,
      default: ""
    }
  },
  computed: {
    styles () {
      return {
        '--url': `url('${this.src}')`,
        '--active': `url('${this.srcActive}')`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 380px;
  height: 80px;
  background-image: var(--url);
}

button:active {
  background-image: var(--active);
}
</style>
