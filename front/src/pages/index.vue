// TOP
<template lang="pug">
  div
    title-logo
    alos2(@onClick="pushStart")
    div.share-area
      p ゲームをSNSでシェア
      div.share-area--buttons
        facebook-share-button.facebook-share-button(:url="url")
        twitter-share-button.twitter-share-button(:url="url", :via="via", :related="related", :hashtags="hashtags", :text="text")
        hatena-share-button.hatena-share-button(:url="url", :title="title")
</template>

<script>
import TitleLogo from '~/components/logo/TitleLogo'
import Alos2 from '~/components/buttons/Alos2'
import FacebookShareButton from '~/components/buttons/share/Facebook'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import HatenaShareButton from '~/components/buttons/share/Hatena'
export default {
  components: {
    TitleLogo,
    Alos2,
    FacebookShareButton,
    TwitterShareButton,
    HatenaShareButton,
  },
  data () {
    return {
      url: 'sample_url',
      via: 'sample_via',
      related: 'sample_related',
      hashtags: 'sample_hashtag1',
      text: 'sample_text',
      title: 'sample_title'
    }
  },
  methods: {
    pushStart () {
      this.$router.push('/difficulty')
    }
  }
}
</script>

<style lang="scss" scoped>
.title-logo {
  padding-top: 239px;
}

.alos2 {
  padding-top: 88px;
  text-align: center;
}

.share-area {
  padding-top: 172px;
  width: 528px;
  height: 288px;
  margin-left: auto;
  margin-right: auto;

  p {
    padding-top: 78px;
    // font-family: "NotoSansCJKjp";
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    text-align: center;
    color: #fff;
  }

  &--buttons {
    padding-top: 35px;
    text-align: center;
  }

  .facebook-share-button {
    display: inline-block;
  }

  .twitter-share-button {
    display: inline-block;
    margin-left: 20px;
  }

  .hatena-share-button {
    display: inline-block;
    margin-left: 20px;
  }
}

</style>
