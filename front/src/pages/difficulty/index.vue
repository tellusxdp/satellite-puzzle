<template>
  <div class="difficulty">
    <div class="mode">MODE</div>
    <moon-button
      @onClick="pushEasy"
      class="button--moon easy">やさしい</moon-button>
    <moon-button
      @onClick="pushNormal"
      class="button--moon normal">ふつう</moon-button>
    <moon-button
      @onClick="pushHard"
      class="button--moon hard">むずかしい</moon-button>
    <div class="what-is">
      <div class="what-is--title">SAR画像とは？</div>
      <div class="what-is--text">
        SAR画像説明説明説明SAR画像説明説明説明SAR画像説明説明説明SAR画像説明説明説明SAR画像説明説明説明S
      </div>
      <div class="detail">
        <gray-button>くわしい説明をみる</gray-button>
      </div>
      <div class="sorabatake">※SORABATAKEのサイトへ飛びます</div>
    </div>
  </div>
</template>

<script>
import MoonButton from '~/components/buttons/MoonButton'
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
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
.difficulty {
  position: relative;
  width: 100%;
  height: 100%;
}

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
  position: absolute;
  top: 5%;
  left: calc((100vh / 1149 * 640 / 2) - (78px / 2));
  color: #fff;
}

/* button */
.button--moon {
  text-align: center;
  width: 15vh;
  height: 15vh;
}

.easy {
  position: absolute;
  top: 10%;
  left: 10%;
}

.normal {
  position: absolute;
  top: 25%;
  right: 10%;
}

.hard {
  position: absolute;
  top: 40%;
  left: 20%;
}

.what-is {
  /* width: 577px; */

  /* height: 374px; */
  background-color: #cfd7ef;
  position: absolute;
  top: 60%;
  width: calc(100vh / 1149 * 640 * 0.7);
  height: calc(100vh * 0.3);
  left: calc((100vh / 1149 * 640 / 2) - ((100vh / 1149 * 640 * 0.7) / 2));
}

.what-is--title {
  /* width: 209px; */

  /* height: 30px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 32px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: center;
  color: #10172b;
}

.what-is--text {
  width: 471px;
  height: 96px;

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
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
}

.sorabatake {
  /* width: 323px; */

  /* height: 19px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: center;
  color: #10172b;
}
</style>

