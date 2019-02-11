<template lang="pug">
  .facebook-share-button
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
    }
  },
  computed: {
    href () {
      return `http://www.facebook.com/share.php?u=${this.url}`
    },
  },
  data: () => {
    return {
      src: require('~/assets/images/icon/icon_fb.png')
    }
  }
}
</script>
