// 難易度選択
<template lang="pug">
  .difficulty
    .mode MODE
    .easy
      easy-button(@onClick="pushEasy") やさしい
    .normal
      normal-button(@onClick="pushNormal") ふつう
    .hard
      hard-button(@onClick="pushHard") むずかしい
    .what-is
      p.what-is--text SARとは？
      p.what-is--description 合成開口レーダー（SAR）は、センサからマイクロ波を発射し地表面で跳ね返ってきたマイクロ波をとらえるセンサです。一般的なカメラ（光学センサ）とは違い、雲がかかっている時や雨でも撮影が可能です。パズルを通してSARと光学画像の違いを目で見てみましょう。
      .detail
        .detail--button
          click-button(
            @onClick="pushSorabatake"
            :src="require('~/assets/images/button/btn_detail.png')"
            :srcActive="require('~/assets/images/button/btn_prs_detail.png')")
        p.detail--text 別ウィンドウが開きます
</template>

<script>
import ClickButton from '~/components/buttons/ClickButton'
import EasyButton from '~/components/buttons/level/EasyButton'
import NormalButton from '~/components/buttons/level/NormalButton'
import HardButton from '~/components/buttons/level/HardButton'
export default {
  components: {
    ClickButton,
    EasyButton,
    NormalButton,
    HardButton,
  },
  methods: {
    pushEasy () { // マップ選択画面（かんたん）に遷移する
      this.$router.push('/difficulty/easy/map')
    },
    pushNormal () { // マップ選択画面（ふつう）に遷移する
      this.$router.push('/difficulty/normal/map')
    },
    pushHard () { // マップ選択画面（むずかしい）に遷移する
      this.$router.push('/difficulty/hard/map')
    },
    pushSorabatake () {
       window.open('https://sorabatake.jp/3364/', '_blank')
    }
  },
}
</script>

<style lang="scss" scoped>
.mode {
  padding-top: 72px;
  margin: 0 auto;
  width: 78px;
  height: 22px;
  font-family: OpenSans;
  font-size: 28px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.moon-button {
  width: 140px;
  height: 140px;
}

.easy {
  margin-top: 120px;
  margin-left: 126px;
}

.normal {
  margin-top: -48px;
  margin-left: 362px;
}

.hard {
  margin-top: -54px;
  margin-left: 112px;
}

.what-is {
  margin: 74px auto;
  width: 578px;
  height: 374px;
  background-color: #e4e8f2;

  &--text {
    padding-top: 36px;
    margin-left: -34px;
    height: 30px;
    font-family: NotoSansCJKjp;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.13;
    letter-spacing: normal;
    text-align: center;
    color: #10172b;
  }

  &--description {
    padding-top: 58px;
    margin-left: 30px;
    width: 498px;
    height: 96px;
    font-family: NotoSansCJKjp;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #10172b;
  }

  .detail {
    text-align: center;

    &--button {
      margin-top: 108px;
      margin-left: -4px;
    }

    &--text {
      margin: 8px auto;
      width: 220px;
      height: 19px;
      font-family: NotoSansCJKjp;
      font-size: 20px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.8;
      letter-spacing: normal;
      text-align: center;
      color: #b0b3bd;
    }
  }
}
</style>

