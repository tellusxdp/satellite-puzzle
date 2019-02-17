// だいち２号のボタン
<template lang="pug">
  .alos2
    button(@click="click")
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


<style lang="scss" scoped>
.alos2 {
  button {
    width: 289px;
    height: 77px;
    background-image: url('~assets/images/alos-2/alos-2.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>


