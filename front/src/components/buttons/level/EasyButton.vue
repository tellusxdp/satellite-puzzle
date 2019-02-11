// レベル選択ボタン（Easy）
<template lang="pug">
  button.easy-button(@click="click")
    img(src="~assets/images/level/level_easy.png")
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('onClick')
    }
  }
}
</script>
