<template>
  <button 
    @click="click" 
    class="prs-button">
    <div v-show="isPrs">
      <img
        class="prs-button--image"
        :src="srcPrs">
    </div>
    <div v-show="!isPrs">
      <img
        class="prs-button--image"
        :src="src">
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
  },
  props: {
    src: {
      type: String,
      default: "",
    },
    srcPrs: {
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

