<template lang="pug">
  .ribbon
    .left
    .right
    .center
      p
        slot
</template>

<style lang="scss" scoped>
.ribbon {
  display: inline-block;
  position: relative;
  text-align: center;

  .center {
    z-index: 2;
    height: 77px;
    width: 420px;
    display: inline-block;
    position: absolute;
    color: #fff;
    background: #9988f3;

    p {
      margin-top: 10px;
      text-align: center;
      font-size: 32px;
    }

    &::before {
      position: absolute;
      content: '';
      top: 100%;
      left: 0;
      border-bottom: solid 10px transparent;
      border-right: solid 20px #543ada;
    }

    &::after {
      position: absolute;
      content: '';
      top: 100%;
      right: 0;
      border-bottom: solid 10px transparent;
      border-left: solid 20px #543ada;
    }
  }
}

.left {
  position: absolute;
  top: 10px;
  left: -30px;
  width: 49px;
  height: 77px;
  border-style: solid;
  border-color: #7b65f3 #7b65f3 #7b65f3 transparent;
  border-width: 39px 0 39px 15px;
  z-index: 1;
}

.right {
  position: absolute;
  top: 10px;
  left: 400px;
  width: 49px;
  height: 77px;
  border-style: solid;
  border-color: #7b65f3 transparent #7b65f3 #7b65f3;
  border-width: 39px 15px 39px 0;
  z-index: 1;
}
</style>
