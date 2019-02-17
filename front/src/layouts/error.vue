// エラーページ
// 403, 404, その他の場合でエラー画面を切り分け
<template lang="pug">
  .error-page
    div(v-if="error.statusCode === 403")
      .error-text
        img(src="~/assets/images/error/text_403.png")
      .error-image-403
        img(src="~/assets/images/error/img_corn.png")
    div(v-else-if="error.statusCode === 404")
      .error-text
        img(src="~/assets/images/error/text_404.png")
      .error-image-404
        img(src="~/assets/images/error/img_cat.png")
    div(v-else)
      .error-text-505
        img(src="~/assets/images/error/505.png")
</template>

<script>
export default {
  props: {
      error: {
          type: Object,
          default: null,
      }
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  .error-text {
    margin: 0 auto;
    padding-top: 239px;
    text-align: center;
  }

  .error-image-404 {
    margin-top: 28px;
    margin-left: 10px;
    text-align: center;
  }

  .error-image-403 {
    margin-top: 76px;
    margin-left: -24px;
    text-align: center;
  }

  .error-text-505 {
    padding-top: 440px;
    text-align: center;
  }
}

</style>
