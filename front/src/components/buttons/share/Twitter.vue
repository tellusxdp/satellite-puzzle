<template lang="pug">
  .twitter-share-button
    base-button(:href="href", :src="src")
</template>

<script>
import BaseButton from '~/components/buttons/share/Base'
export default {
  components: {
    BaseButton
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
      return `https://twitter.com/share?url=${this.url}&via=${this.via}&related=${this.related}&hashtags=${this.hashtags}&text=${this.text}`
    }
  },
  data: () => {
    return {
      src: require('~/assets/images/icon/icon_tw.png')
    }
  }
}
</script>
