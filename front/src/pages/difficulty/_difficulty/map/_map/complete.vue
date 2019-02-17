// 完成
// 
<template lang="pug">
  .page
    .margin-top-result-area
    transition(name="fade-in" appear)
      .result-area
        result(
          :mapName="mapName",
          :completedImage="completedImage",
          :min="min",
          :sec="sec",
          :isNewRecord="isNewRecord",
          :bestRecord="bestRecord")
    .button-area
      click-button(
        @onClick="pushTop"
        :src="require('~/assets/images/button/btn_bktostart.png')"
        :srcActive="require('~/assets/images/button/btn_prs_bktostart.png')")
    .share-area
      .share-area--text
        p 結果をSNSでシェア!
      facebook-share-button.facebook-share-button(:url="url")
      twitter-share-button.twitter-share-button(
        :url="url"
        :via="via"
        :related="related"
        :hashtags="hashtags"
        :text="twitterText")
    jaxa.jaxa
</template>

<script>
import Result from '~/components/Result'
import ClickButton from '~/components/buttons/ClickButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
import Jaxa from '~/components/Jaxa'
import { mapGetters, mapActions } from 'vuex'
export default {
  components:{
    Result,
    ClickButton,
    TwitterShareButton,
    FacebookShareButton,
    Jaxa,
  },
  validate ({ params }) {
    // 難易度チェック(easy, normal, hard以外は404)
    const d = params.difficulty
    const difficulty = (d === 'easy' || d === 'normal' || d === 'hard')
    if (!difficulty) {
      return false
    }
    // マップチェック
    // マップチェック（難易度に対応していないマップの場合は404）
    const selectedMap = this.selectedMap
    return selectedMap !== null
  },
  data() {
    return {
      url: 'https://satellite-puzzle.app.tellusxdp.com',
      via: 'tellus_xdata',
      related: 'tellus_xdata',
      hashtags: 'tellus, 衛星パズル',
      difficultyMap: { // 難易度と画像分割数との対応
        easy: 3,
        normal: 4,
        hard: 5,
      },
      difficulty: 'normal',
      map: 'lake-biwako'
    }
  },
  asyncData(context) {
    return {
      // asyncDataでreturnすると、dataにマージされる
      difficulty: context.params.difficulty,
      map: context.params.map
    }
  },
  computed: {
    ...mapGetters({
      min: 'min',
      sec: 'sec',
      bestRecord: 'bestRecord',
      isNewRecord: 'isNewRecord',
      puzzles: 'puzzles'
    }),
    twitterText () {
      const d = {easy: 'やさしい', normal: 'ふつう', hard: 'むずかしい'}
      const m = this.puzzles.find(v => {
        return v.id === this.map
      })
      return `衛星パズル難易度${d[this.difficulty]}の${m.name}マップを${this.min}分${this.sec}秒でクリア！`
    },
    // 選択したマップを返す（不正な値の場合はnull）
    selectedMap () {
      const m = this.puzzles
      const selected = m.filter(v => {
        return v.id === this.map
      })
      if (!selected) {
        return null
      }
      if (selected.length !== 1) {
        return null
      }
      return selected[0]
    },
    mapName () { // マップの名前を取得
      return this.selectedMap.name
    },
    mapImages () { // マップの画像のパスを取得
      const parameters = this.selectedMap.parameters
      const parameter =  parameters.filter(v => {
        return (v.split_n === this.difficultyMap[this.difficulty])
      })

      if (!parameter) { // validateで確認済み
        return null
      }
      if (parameter.length !== 1) { // validateで確認済み
        return null
      }

      const p = parameter[0]
      const kind = p.kind
      const x = p.x
      const y = p.y
      const z = p.z
      const n = p.split_n

      return `${kind}/${z}-${x}-${y}-${n}`
    },
    completedImage () { // 完成画像のパス
      return `/images/${this.mapImages}/sar/completed.png`
    },
  },
  methods: {
    pushTop () { // TOPへ遷移する
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>
.margin-top-result-area {
  height: 40px;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 1s;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.result-area {
  margin: 0 auto;
}

.share-area {
  margin-top: 58px;
  margin-left: -24px;
  text-align: center;
  height: 64px;
  line-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.share-area--text {
  margin-left: 40px;
  height: 23px;
  font-family: NotoSansCJKjp;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
}

.facebook-share-button {
  margin-top: 10px;
  margin-left: 2px;
  vertical-align: middle;
  display: inline-block;
  transform: scale(0.8);
}

.twitter-share-button {
  margin-top: 10px;
  vertical-align: middle;
  display: inline-block;
  transform: scale(0.8);
}

.button-area {
  margin-top: 49px;
  text-align: center;
}

.page {
  background-image:
    url('~assets/images/moon/img_pzlmoon.png'),
    url('~assets/images/background/background.png');
  background-repeat: no-repeat, no-repeat;
  background-size: initial, contain;
  background-position: 0 0, center center;
  width: 640px;
  height: 1148px;
}

.jaxa {
  position: absolute;
  top: 1110px;
  left: 530px;
  color: #fff;
}
</style>
