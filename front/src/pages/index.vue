// TOP
<template lang="pug">
  div
    .push-start(@click="pushStart")
      title-logo
      alos2
    div.share-area
      p ゲームをSNSでシェア
      .share-area--buttons
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
    return { // TODO: データ設定
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
.push-start {
  height: 380px;
  width: 370px;
  margin: 0 auto;
}

.title-logo {
  padding-top: 239px;
}

.alos2 {
  margin-top: 94px;
  text-align: center;
}

.share-area {
  margin-top: 494px;
  width: 528px;
  height: 248px;
  margin-left: auto;
  margin-right: auto;

  p {
    height: 23px;
    font-family: NotoSansCJKjp;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }

  &--buttons {
    margin-top: 42px;
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
