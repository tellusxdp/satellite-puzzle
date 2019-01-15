<template>
  <div class="moon">
    <button
      @click="click" 
      class="button">
      <span class="image"/>
    </button>
    <div class="text"><slot/></div>
  </div>
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

<style>
.moon {
  width: 100%;
  height: 100%;
}

.button {
  width: 100%;
  height: 100%;
}

.image {
  background-image: url('~assets/images/moon/moon.png');
  background-size: contain;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.text {
  /* font-family: NotoSansCJKjp; */
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  color: #fff;
}
</style>
