// 結果モーダルに表示するリボン
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
    width: 456px;
    height: 77px;
    background: #9988f3;
    color: #fff;

    p {
      margin-top: 22px;
      height: 26px;
      color: #fefeff;
      text-align: center;
      letter-spacing: normal;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      font-size: 28px;
      font-family: NotoSansCJKjp;
      line-height: 1.29;
    }

    &::before {
      position: absolute;
      top: 100%;
      left: 0;
      border-right: solid 20px #543ada;
      border-bottom: solid 10px transparent;
      content: '';
    }

    &::after {
      position: absolute;
      top: 100%;
      right: 0;
      border-bottom: solid 10px transparent;
      border-left: solid 20px #543ada;
      content: '';
    }
  }
}

.left {
  position: absolute;
  top: 16px;
  left: -30px;
  z-index: 1;
  width: 49px;
  height: 70px;
  border-width: 35px 0 35px 15px;
  border-style: solid;
  border-color: #7b65f3 #7b65f3 #7b65f3 transparent;
}

.right {
  position: absolute;
  top: 16px;
  left: 436px;
  z-index: 1;
  width: 49px;
  height: 70px;
  border-width: 35px 15px 35px 0;
  border-style: solid;
  border-color: #7b65f3 transparent #7b65f3 #7b65f3;
}
</style>
