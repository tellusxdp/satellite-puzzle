<template>
  <button 
    @click="click" 
    class="button--gray">
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
