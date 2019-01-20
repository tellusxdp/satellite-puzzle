<template>
  <div>
    <div v-if="error.statusCode === 403">
      <div class="error-title">403</div>
      <br>
      <div class="error-message">Forbidden area In Space</div>
    </div>
    <div v-else-if="error.statusCode === 404">
      <div class="error-title">404</div>
      <br>
      <div class="error-message">Lost In Space</div>
    </div>
    <div v-else-if="error.statusCode === 505">
      <div class="error-title">505</div>
      <br>
      <div class="error-message">Internal Server Error</div>
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
.error-title {
  text-align: center;
  padding-top: 239px;
  font-size: 160px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.15;
  letter-spacing: normal;
  color: #fff;
}

.error-message {
  text-align: center;
  padding-top: 32px;
  font-size: 28px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #fff;
}

</style>
