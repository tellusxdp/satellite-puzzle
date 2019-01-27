<template>
  <div class="facebook-share-button">
    <a
      :href="href"
      rel="nofollow"
      target="_blank">
      <img
        class="facebook-share-button--image"
        src="~assets/images/icon/icon_fb.png"
      >
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    }
  },
  computed: {
    href () {
      return `http://www.facebook.com/share.php?u=${this.url}`
    }
  }
}
</script>

<style scoped>
.facebook-share-button {
  width: 80px;
  height: 80px;
}

.facebook-share-button--image {
  width: 80px;
  height: 80px;
}
</style>

