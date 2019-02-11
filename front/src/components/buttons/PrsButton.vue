// オンオフボタン
// clickで自分のisPrs状況を確認して反転し、
// isPrsがtrueであれば、isNotPrsをemitし、
// isPrsがfalseになれば、isNotPrsをemitする
<template lang="pug">
  button.prs-button(@click="click")
    div(v-show="isPrs")
      img.prs-button--image(:src="srcPrs")
    div(v-show="!isPrs")
      img.prs-button--image(:src="src")
</template>

<script>
export default {
  methods: {
    click () {
      this.isPrs = !this.isPrs
      if (this.isPrs) {
        return this.$emit('isPrs')
      }
      return this.$emit('isNotPrs')
    },
  },
  props: {
    src: { // isPrs=false時の画像
      type: String,
      default: "",
    },
    srcPrs: { // isPrs=true時の画像
      type: String,
      default: "",
    }
  },
  data () {
      return {
          isPrs: false
      }
  },
}
</script>

<style>
.prs-button--image {
  background-repeat: no-repeat;
  background-size: contain;
  width: 380px;
  height: 80px;
}
</style>

