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
  position: relative;
  display: inline-block;
  text-align: center;

  .center {
    position: absolute;
    z-index: 2;
    display: inline-block;
    width: 441px;
    height: 77px;
    background: #9988f3;
    color: #fff;

    p {
      margin: 20px auto;
      height: 21px;
      color: #fff;
      letter-spacing: normal;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      font-size: 22px;
      font-family: NotoSansCJKjp;
      line-height: 1.64;
    }

    &::before {
      position: absolute;
      top: -10px;
      left: 0;
      border-top: solid 10px transparent;
      border-right: solid 20px #543ada;
      content: '';
    }

    &::after {
      position: absolute;
      top: 100%;
      right: -1px;
      border-bottom: solid 10px transparent;
      border-left: solid 20px #543ada;
      content: '';
    }
  }
}

.left {
  position: absolute;
  top: -20px;
  left: -28px;
  z-index: 1;
  width: 49px;
  height: 70px;
  border-width: 35px 0 35px 15px;
  border-style: solid;
  border-color: #7b65f3 #7b65f3 #7b65f3 transparent;
}

.right {
  position: absolute;
  top: 26px;
  left: 422px;
  z-index: 1;
  width: 49px;
  height: 70px;
  border-width: 35px 15px 35px 0;
  border-style: solid;
  border-color: #7b65f3 transparent #7b65f3 #7b65f3;
}
</style>
