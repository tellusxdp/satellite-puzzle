<template>
  <button 
    @click="click" 
    class="button--grey">
    <slot/>
  </button>
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
