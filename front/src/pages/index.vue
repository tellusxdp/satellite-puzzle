// TOP
<template>
  <div>
    <div class="title-logo">
      <p>衛星<br>パズル</p>
    </div>
    <div>
      <p class="title-logo-sub">だいち２号のSAR画像でパズル編</p>
    </div>
    <div class="button-center">
      <button
        @click="pushStart"
        class="button--alos-2"/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pushStart () {
      this.$router.push('/difficulty')
    },
  },
}
</script>

<style scoped>
.title-logo {
  padding-top: 239px;

  /* width: 357px; */

  /* height: 234px; */
  font-size: 88px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.title-logo-sub {
  padding-top: 50px;

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.button-center {
  padding-top: 88px;
  text-align: center;
}

.button--alos-2 {
  background-image: url('~assets/images/alos-2/alos-2.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 289px;
  height: 77px;
}

</style>
