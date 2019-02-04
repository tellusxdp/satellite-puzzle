<template lang="pug">
  button(@click="click", :style="styles")
    //- img(:src="src")
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('onClick')
    }
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    srcActive: {
      type: String,
      default: ""
    }
  },
  computed: {
    styles () {
      return {
        '--url': `url('${this.src}')`,
        '--active': `url('${this.srcActive}')`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 380px;
  height: 80px;
  background-image: var(--url);
}

button:active {
  background-image: var(--active);
}
</style>
