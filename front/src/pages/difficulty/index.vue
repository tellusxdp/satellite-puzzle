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
  margin: 0 auto;
  padding-top: 72px;
  width: 78px;
  height: 22px;
  color: #fff;
  text-align: center;
  letter-spacing: normal;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  font-size: 28px;
  font-family: OpenSans;
  line-height: 1.29;
}

.moon-button {
  width: 140px;
  height: 140px;
}

.easy {
  margin-top: 108px;
  margin-left: 126px;
}

.normal {
  margin-top: -42px;
  margin-left: 362px;
}

.hard {
  margin-top: -106px;
  margin-left: 112px;
}

.what-is {
  margin: 74px auto;
  width: 578px;
  height: 444px;
  background-color: #e4e8f2;

  &--text {
    margin-left: -34px;
    padding-top: 36px;
    height: 30px;
    color: #10172b;
    text-align: center;
    letter-spacing: normal;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-size: 32px;
    font-family: NotoSansCJKjp;
    line-height: 1.13;
  }

  &--description {
    margin-left: 30px;
    padding-top: 58px;
    width: 508px;
    height: 204px;
    color: #10172b;
    text-align: left;
    letter-spacing: normal;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    font-size: 22px;
    font-family: NotoSansCJKjp;
    line-height: 1.64;
  }

  .detail {
    text-align: center;

    &--button {
      margin-top: 98px;
      margin-left: -4px;
    }
  }
}
</style>

