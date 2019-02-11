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

<style scoped>
.error-text {
  text-align: center;
  margin: 0 auto;
  padding-top: 239px;
}

.error-image-404 {
  text-align: center;
  margin-top: 28px;
  margin-left: 10px;
}

.error-image-403 {
  text-align: center;
  margin-top: 76px;
  margin-left: -24px;
}

.error-text-505 {
  text-align: center;
  padding-top: 440px;
}
</style>
