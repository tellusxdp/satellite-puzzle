// TOP
<template>
  <div>
    <div class="title-logo">
      <p>衛星<br>パズル</p>
    </div>
    <div>
      <p class="title-logo-sub">だいち２号のSAR画像でパズル編</p>
    </div>
    <div class="button-center">
      <button
        @click="pushStart"
        class="button--alos-2"/>
    </div>
    <div class="share-area">
      <div class="share-area--text">ゲームをSNSでシェア</div>
      <div class="share-area--buttons">
        <facebook-share-button
          :url="url"/>
        <twitter-share-button
          :url="url"
          :via="via"
          :related="related"
          :hashtags="hashtags"
          :text="text"/>
        <hatena-share-button
          :url="url"
          :title="title"/>
      </div>
    </div>
  </div>
</template>

<script>
import FacebookShareButton from '~/components/buttons/share/Facebook'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import HatenaShareButton from '~/components/buttons/share/Hatena'
export default {
  components: {
    FacebookShareButton,
    TwitterShareButton,
    HatenaShareButton,
  },
  data () {
    return {
      url: 'sample_url',
      via: 'sample_via',
      related: 'sample_related',
      hashtags: ['sample_hashtag1', 'sample_hashtag2'],
      text: 'sample_text',
      title: 'sample_title'
    }
  },
  methods: {
    pushStart () {
      this.$router.push('/difficulty')
    },
  },
}
</script>

<style scoped>
.title-logo {
  padding-top: 239px;

  /* width: 357px; */

  /* height: 234px; */
  font-size: 88px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.title-logo-sub {
  padding-top: 50px;

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.button-center {
  padding-top: 88px;
  text-align: center;
}

.button--alos-2 {
  background-image: url('~assets/images/alos-2/alos-2.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 289px;
  height: 77px;
}

.share-area {
  width: 528px;
  height: 288px;
  padding-top: 94px;
  margin-left: auto;
  margin-right: auto;
}

.share-area--text {
  padding-top: 78px;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  text-align: center;
  color: #fff;
}

.share-area--buttons {
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
</style>
