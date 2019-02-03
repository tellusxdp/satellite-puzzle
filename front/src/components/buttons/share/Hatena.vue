<template lang="pug">
  hatena-share-button
    base-button(:href="href", :src="require('~/assets/images/icon/icon_htn.png')")
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
    title: {
      type: String,
      default: "",
    }
  },
  computed: {
      href () {
          return `http://b.hatena.ne.jp/add?mode=confirm&url=${this.url}&title=${this.title}`
      }
  }
}
</script>
