<template>
  <button 
    @click="click" 
    class="button--purple">
    <div class="button--purple--label">
      <slot/>
    </div>
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

<style>
.button--purple {
  background-image: url('~assets/images/purple-button/button.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 380px;
  height: 80px;
}

.button--purple--label {
  /* width: 231px; */

  /* height: 29px; */

  /* font-family: TunnelMin-Wideline; */
  font-size: 28px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.86;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

</style>

