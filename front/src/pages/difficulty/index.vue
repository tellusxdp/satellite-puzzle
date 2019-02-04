// 難易度選択
<template lang="pug">
  div.difficulty
    div.mode MODE
    div.easy
      moon-button(@onClick="pushEasy") やさしい
    div.normal
      moon-button(@onClick="pushNormal") ふつう
    div.hard
      moon-button(@onClick="pushHard") むずかしい
    div.what-is
      p.what-is--text SAR画像とは
      div.description SAR画像説明説明説明SAR画像説明説明説SAR画像説明説明説明SAR画像説明説明説明SAR画像説明説明説明S
      div.detail
        click-button(
          :src="require('~/assets/images/button/btn_detail.png')"
          :srcActive="require('~/assets/images/button/btn_prs_detail.png')")
        p.detail--text 別ウィンドウが開きます
</template>

<script>
import ClickButton from '~/components/buttons/ClickButton'
import PurpleButton from '~/components/buttons/PurpleButton'
import MoonButton from '~/components/buttons/MoonButton'
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
    ClickButton,
    MoonButton,
    GrayButton,
  },
  methods: {
    pushEasy () {
      this.$router.push('/difficulty/easy/map')
    },
    pushNormal () {
      this.$router.push('/difficulty/normal/map')
    },
    pushHard () {
      this.$router.push('/difficulty/hard/map')
    },
  },
}
</script>

<style lang="scss" scoped>
.mode {
  width: 78px;
  height: 22px;

  /* font-family: LTUnivers-Cond; */
  font-size: 28px;
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  padding-top: 79px;
  padding-left: 280px;
  color: #fff;
}

.moon-button {
  width: 140px;
  height: 140px;
}

.easy {
  padding-top: 30px;
  padding-left: 133px;
}

.normal {
  padding-left: 408px;
}

.hard {
  padding-left: 133px;
}

.what-is {
  margin-top: 74px;
  margin-left: 32px;
  width: 577px;
  height: 374px;
  background-color: #cfd7ef;

  &--text {
    // font-family: NotoSansCJKjp;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.13;
    letter-spacing: normal;
    text-align: center;
    color: #10172b;
    padding-top: 38px;
  }

  .description {
    // font-family: NotoSansCJKjp;
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #10172b;
    padding-left: 29px;
    padding-right: 52px;
    padding-top: 32px;
  }

  .detail {
    padding-top: 30px;
    text-align: center;

    &--text {
      padding-top: 19px;
      // font-family: NotoSansCJKjp;
      font-size: 20px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      text-align: center;
      color: #10172b;
    }
  }
}
</style>

