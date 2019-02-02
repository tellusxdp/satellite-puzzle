// パズル終了
<template>
  <div class="center">
    <div class="margin-top-result-area"/>
    <div class="result-area">
      <div class="result-area--purple">
        <div class="map-name">キラウエア火山完成！</div>
        <div class="record">
          <span class="time">{{ min }}</span>
          <span class="time-unit">分</span>
          <span class="time">{{ sec }}</span>
          <span class="time-unit">秒</span>
        </div>
        <div class="personal-best">あなたの自己ベスト {{ bestRecord.min }}分{{ bestRecord.sec }}秒</div>
      </div>
      <div class="result-area--white">
        ここに画像を表示
      </div>
    </div>
    <div class="share-area">
      <div class="share-area--text">結果をSNSでシェア!</div>
      <div class="share-area--buttons">
        <facebook-share-button
          :url="url"/>
        <twitter-share-button
          :url="url"
          :via="via"
          :related="related"
          :hashtags="hashtags"
          :text="text"/>
      </div>
    </div>
    <div class="button-area">
      <purple-button @onClick="pushTop">はじめの画面に戻る</purple-button>
    </div>
  </div>
</template>

<script>
import PurpleButton from '~/components/buttons/PurpleButton'
import GrayButton from '~/components/buttons/GrayButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
import { mapGetters, mapActions } from 'vuex'
export default {
  components:{
    PurpleButton,
    GrayButton,
    TwitterShareButton,
    FacebookShareButton,
  },
  validate ({ params }) {
    const d = params.difficulty
    // 難易度チェック
    return (d === 'easy' || d === 'normal' || d === 'hard')
    // マップチェック
    // TODO: マップチェック
  },
  data() {
    return {
      url: 'sample_url',
      via: 'sample_via',
      related: 'sample_related',
      hashtags: 'sample_hashtag',
      text: 'sample_text'
    }
  },
  computed: {
    ...mapGetters({
      min: 'min',
      sec: 'sec',
      bestRecords: 'bestRecords',
      bestRecord: 'bestRecord'
    }),
  },
  methods: {
    pushRetry () {
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map)
    },
    pushOtherMap () {
      const difficulty = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map')
    },
    pushTop () {
      this.$router.push('/')
    },
  }
}
</script>

<style>
.center {
  text-align: center;
}

.margin-top-result-area {
  height: 40px;
}

.result-area {
  margin-left: auto;
  margin-right: auto;
  width: 578px;
  height: 802px;
  background-color: #fff;
}

.result-area--purple {
  width: 578px;
  height: 261px;
  border-radius: 4px;
  background-color: #6c53f3;
}

.record {
  text-align: center;
}

.time {
  width: 68px;
  height: 45px;

  /* font-family: LTUnivers-Cond; */
  font-size: 61.3px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.time-unit {
  width: 24px;
  height: 23px;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
}

.personal-best {
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.result-area--white {
  width: 578px;
  height: 541px;
  border-radius: 4px;
  background-color: #fff;
}

.map-name {
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.share-area {
  margin-left: auto;
  margin-right: auto;
}

.share-area--text {
  padding-top: 10px;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  text-align: center;
  color: #fff;
}

.share-area--buttons {
  padding-top: 31px;
  text-align: center;
}

.facebook-share-button {
  display: inline-block;
}

.twitter-share-button {
  display: inline-block;
  margin-left: 20px;
}

.button-area {
  margin-top: 49px;
}
</style>
