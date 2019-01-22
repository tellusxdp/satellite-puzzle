// 難易度選択
<template>
  <div class="difficulty">
    <div class="mode">MODE</div>
    <div class="easy">
      <moon-button
        @onClick="pushEasy"
        class="button--moon">やさしい</moon-button>
    </div>
    <div class="normal">
      <moon-button
        @onClick="pushNormal"
        class="button--moon">ふつう</moon-button>
    </div>
    <div class="hard">
      <moon-button
        @onClick="pushHard"
        class="button--moon">むずかしい</moon-button>
    </div>
    <div class="what-is">
      <div class="what-is--title">SAR画像とは？</div>
      <div class="what-is--text">
        SAR画像説明説明説明SAR画像説明説明説SAR画像説明説明説明SAR画像説明説明説明SAR画像説明説明説明S
      </div>
      <div class="detail">
        <purple-button>くわしい説明をみる</purple-button>
      </div>
      <div class="sorabatake">別ウィンドウが開きます</div>
    </div>
  </div>
</template>

<script>
import PurpleButton from '~/components/buttons/PurpleButton'
import MoonButton from '~/components/buttons/MoonButton'
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
    PurpleButton,
    MoonButton,
    GrayButton,
  },
  methods: {
    pushEasy () {
      this.$router.push('/difficulty/easy/map')
    },
    pushHard () {
      this.$router.push('/difficulty/normal/map')
    },
    pushNormal () {
      this.$router.push('/difficulty/hard/map')
    },
  },
}
</script>

<style>
/* .difficulty {
  position: relative;
  width: 100%;
  height: 100%;
} */

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

/* button */
.button--moon {
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
}

.what-is--title {
  /* font-family: NotoSansCJKjp; */
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

.what-is--text {
  /* width: 471px; */

  /* height: 96px; */

  /* font-family: NotoSansCJKjp; */
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
}

.sorabatake {
  /* font-family: NotoSansCJKjp; */
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  color: #10172b;
  margin-top: 19px;
}
</style>

