// レベル選択ボタン（Normal）
<template lang="pug">
  button.normal-button(@click="click")
    img(src="~assets/images/level/level_normal.png")
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
