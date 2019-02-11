// Twitterシェアボタン 
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
    url: { // URL
      type: String,
      default: "",
    },
    via: { // アカウント名
      type: String,
      default: "",
    },
    related: { // 投稿後にフォローさせたいユーザーID
      type: String,
      default: "",
    },
    hashtags: { // ハッシュタグ（複数の場合はカンマ区切り）
      type: String,
      default: "",
    },
    text: {  // ツイートするテキスト
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
