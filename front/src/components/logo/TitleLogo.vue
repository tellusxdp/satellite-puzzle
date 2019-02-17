// タイトルロゴ
<template lang="pug">
  .title-logo
    img.image(src="~/assets/images/logo/img_logo.png")
    p.text だいち２号のSAR画像でパズル編
</template>

<style lang="scss" scoped>
.title-logo {
  text-align: center;

  .image {
    width: 357px;
    height: 234px;
  }

  .text {
    margin: 40px 0 auto;
    height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: normal;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    font-size: 24px;
    font-family: NotoSansCJKjp;
    line-height: 1.5;
  }
}
</style>
