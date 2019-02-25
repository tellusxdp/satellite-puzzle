// トップ画面
<template lang="pug">
  .page
    .push-start(@click="pushStart")
      title-logo
      alos2
    .share-area
      p ゲームをSNSでシェア！
      .buttons
        facebook-share-button.facebook-share-button(
          :url="url"
        )
        twitter-share-button.twitter-share-button(
          :url="url",
          :via="via",
          :related="related",
          :hashtags="hashtags",
          :text="text"
        )
        hatena-share-button.hatena-share-button(
          :url="url",
          :title="title"
        )
    github-link()
</template>

<script>
import TitleLogo from '~/components/logo/TitleLogo'
import Alos2 from '~/components/buttons/Alos2'
import FacebookShareButton from '~/components/buttons/share/Facebook'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import HatenaShareButton from '~/components/buttons/share/Hatena'
import GithubLink from '~/components/buttons/Github'
export default {
  components: {
    TitleLogo,
    Alos2,
    FacebookShareButton,
    TwitterShareButton,
    HatenaShareButton,
    GithubLink,
  },
  data () {
    return { // TODO: データ設定
      url: 'https://satellite-puzzle.app.tellusxdp.com',
      via: 'tellus_xdata',
      related: 'tellus_xdata',
      hashtags: 'tellus, 衛星パズル',
      text: 'ゲームを通じて、衛星画像を身近な存在に！',
      title: '衛星パズル'
    }
  },
  methods: {
    pushStart () { // 難易度選択画面に遷移する
      this.$router.push('/difficulty')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .push-start {
    margin: 0 auto;
    width: 370px;
    height: 380px;

    .title-logo {
      padding-top: 200px;
    }

    .alos2 {
      margin-top: 94px;
      text-align: center;
    }
  }

  .share-area {
    margin-top: 440px;
    margin-right: auto;
    margin-left: auto;
    width: 528px;
    height: 230px;

    p {
      height: 23px;
      color: #fff;
      text-align: center;
      letter-spacing: normal;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      font-size: 24px;
      font-family: NotoSansCJKjp;
      line-height: 1.5;
    }

    .buttons {
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
}

</style>
