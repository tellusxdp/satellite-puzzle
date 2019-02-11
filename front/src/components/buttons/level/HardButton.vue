// レベル選択ボタン（Hard）
<template lang="pug">
  button.hard-button(@click="click")
    img(src="~assets/images/level/level_hard.png")
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
