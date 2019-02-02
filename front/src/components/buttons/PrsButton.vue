<template>
  <button 
    @click="click" 
    class="prs-button">
    <div v-show="isPrs">
      <img
        class="prs-button--image"
        :src="prsButtonImage()">
    </div>
    <div v-show="!isPrs">
      <img
        class="prs-button--image"
        :src="buttonImage()">
    </div>
  </button>
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
    buttonImage () {
        return require('~/assets/images/button/btn_showimg.png')
    },
    prsButtonImage () {
      return require('~/assets/images/button/btn_prs_showimg.png')
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

