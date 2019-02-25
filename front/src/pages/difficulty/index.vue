// 難易度選択
<template lang="pug">
  .page
    .return
      button(@click="pushIndex") ←スタート画面に戻る
    .mode MODE
    .easy
      easy-button(@onClick="pushEasy") やさしい
    .normal
      normal-button(@onClick="pushNormal") ふつう
    .hard
      hard-button(@onClick="pushHard") むずかしい
    .what-is
      p.text パズルに使われている画像のひみつ
      p.description 
        a(:href="href", target="_blank", rel="nofollow") Tellus
        span で公開されている合成開口レーダー（SAR）の画像を使ったパズルです。SARとは、センサからマイクロ波を発射し地表面で跳ね返ってきたマイクロ波をとらえるセンサです。一般的なカメラとは違い、雲がかかっている時や雨でも撮影が可能です。ときどきカラー画像が見られるという噂も…？
      .detail
        .button
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
  data: () => {
    return {
      href: "https://www.tellusxdp.com",
    }
  },
  components: {
    ClickButton,
    EasyButton,
    NormalButton,
    HardButton,
  },
  methods: {
    pushIndex () { // スタート画面に遷移する
      this.$router.push('/')
    },
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
.page {
  .return {
    margin-left: 34px;
    padding-top: 42px;
    height: 24px;
    color: #fff;
    text-align: left;
    letter-spacing: normal;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    font-size: 24px;
    font-family: NotoSansCJKjp;
    line-height: 1.5;
  }

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

    .text {
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

    .description {
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

      .button {
        margin-top: 98px;
        margin-left: -4px;
      }
    }
  }
}
</style>

