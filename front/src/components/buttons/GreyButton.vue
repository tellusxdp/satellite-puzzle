<template>
  <button 
    @click="click" 
    class="button--grey">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    nextPath: {
      type: String,
      default: '',
    }
  },
  methods: {
    click () {
      this.$router.push(this.nextPath)
    }
  }
}
</script>
