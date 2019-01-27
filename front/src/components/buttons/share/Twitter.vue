<template>
  <div class="twitter-share-button">
    <a
      :href="href"
      target="_blank">
      <img
        class="twitter-share-button--image"
        src="~assets/images/icon/icon_tw.png"
      >
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit("onClick", this.href)
    },
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    via: {
      type: String,
      default: "",
    },
    related: {
      type: String,
      default: "",
    },
    hashtags: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  computed: {
    href () {
      // TODO: 結合方法は要件が決まったら修正する
      return "https://twitter.com/share?"
               +"url="+this.url
               +"&via="+this.via
               +"&related="+this.related
               +"&hashtags="+this.hashtags
               +"&text="+this.text
    }
  }
}
</script>

<style scoped>
.twitter-share-button {
  width: 80px;
  height: 80px;
}

.twitter-share-button--image {
  width: 80px;
  height: 80px;
}
</style>

