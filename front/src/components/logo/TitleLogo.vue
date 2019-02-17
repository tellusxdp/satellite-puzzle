// タイトルロゴ
<template lang="pug">
  .title-logo
    img.title-logo--image(src="~/assets/images/logo/img_logo.png")
    p.title-logo--text だいち２号のSAR画像でパズル編
</template>

<style lang="scss" scoped>
.title-logo {
  text-align: center;

  &--image {
    width: 357px;
    height: 234px;
  }

  &--text {
    margin: 40px 0 auto;
    // width: 356px;
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
