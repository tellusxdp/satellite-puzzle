// マップに表示するリボン
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
    width: 441px;
    display: inline-block;
    position: absolute;
    color: #fff;
    background: #9988f3;

    p {
      margin: 20px auto;
      height: 21px;
      font-family: NotoSansCJKjp;
      font-size: 22px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.64;
      letter-spacing: normal;
      color: #fff;
    }

    &::before {
      position: absolute;
      content: '';
      top: -10px;
      left: 0;
      border-top: solid 10px transparent;
      border-right: solid 20px #543ada;
    }

    &::after {
      position: absolute;
      content: '';
      top: 100%;
      right: -1px;
      border-bottom: solid 10px transparent;
      border-left: solid 20px #543ada;
    }
  }
}

.left {
  position: absolute;
  top: -20px;
  left: -28px;
  width: 49px;
  height: 70px;
  border-style: solid;
  border-color: #7b65f3 #7b65f3 #7b65f3 transparent;
  border-width: 35px 0 35px 15px;
  z-index: 1;
}

.right {
  position: absolute;
  top: 26px;
  left: 422px;
  width: 49px;
  height: 70px;
  border-style: solid;
  border-color: #7b65f3 transparent #7b65f3 #7b65f3;
  border-width: 35px 15px 35px 0;
  z-index: 1;
}
</style>
