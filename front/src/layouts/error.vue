<template>
  <div>
    <div v-if="error.statusCode === 403">
      <div class="error-text">
        <img src="~/assets/images/error/text_403.png">
      </div>
      <div class="error-image">
        <img src="~/assets/images/error/img_corn.png">
      </div>
    </div>
    <div v-else-if="error.statusCode === 404">
      <div class="error-text">
        <img src="~/assets/images/error/text_404.png">
      </div>
      <div class="error-image">
        <img src="~/assets/images/error/img_cat.png">
      </div>
    </div>
    <div v-else>
      <div class="error-text">
        <img src="~/assets/images/error/text_403.png">
      </div>
      <div class="error-image">
        <img src="~/assets/images/error/img_corn.png">
      </div>
    </div>
  </div>
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

.error-image {
  text-align: center;
  margin: 0 auto;
  padding-top: 22px;
}
</style>
