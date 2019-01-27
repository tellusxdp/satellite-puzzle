<template>
  <div class="hatena-share-button">
    <a
      :href="href"
      target="_blank"
      rel="nofollow">
      <img
        class="hatena-share-button--image"
        src="~assets/images/icon/icon_htn.png">
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    }
  },
  computed: {
      href () {
          return "http://b.hatena.ne.jp/add?mode=confirm&url="+this.url+"&title="+this.title
      }
  }
}
</script>

<style>
.hatena-share-button {
  width: 80px;
  height: 80px;
}

.hatena-share-button--image {
  width: 80px;
  height: 80px;
}
</style>
