// パズル終了
<template>
  <div class="center">
    <div class="margin-top-result-area"/>
    <div class="result-area">
      <div class="result-area--purple">
        <div class="map-name">キラウエア火山完成！</div>
        <div class="record">
          <span class="time">{{ $store.state.min }}</span>
          <span class="time-unit">分</span>
          <span class="time">{{ $store.state.sec }}</span>
          <span class="time-unit">秒</span>
        </div>
        <div class="personal-best">あなたの自己ベスト 02分58秒</div>
      </div>
      <div class="result-area--white">
        ここに画像を表示
      </div>
    </div>
    <div class="share">
      <div class="sns">結果をSNSでシェア!</div>
      <div>
        <div class="share-button"/>
        <span class="blank"/>
        <div class="share-button"/>
      </div>
    </div>
    <purple-button @onClick="pushTop">はじめの画面に戻る</purple-button>
  </div>
</template>

<script>
import PurpleButton from '~/components/buttons/PurpleButton'
import GrayButton from '~/components/buttons/GrayButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
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
    }
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

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
}

.personal-best {
  /* width: 280px; */

  /* height: 19px; */

  /* font-family: RodinProN-DB; */
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
  /* width: 306px; */

  /* height: 31px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.sns {
  /* width: 220px; */

  /* height: 23px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.share {
  text-align: center;
  padding-bottom: 63px;
}

.blank {
  padding-left: 40px;
}

.share-button {
  display: inline-block;
  vertical-align: top;
  width: 81px;
  height: 81px;
  background-color: #e3e5f7;
}

</style>
