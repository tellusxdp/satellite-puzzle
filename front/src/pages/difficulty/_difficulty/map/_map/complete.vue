// パズル終了
<template lang="pug">
  .container
    .margin-top-result-area
    transition(name="fade-in" appear)
      .result-area
        result(
          :mapName="mapName",
          :completedImage="completedImage",
          :min="min",
          :sec="sec",
          :bestMin="bestRecord.min",
          :bestSec="bestRecord.sec")
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
        :text="text")
</template>

<script>
import Result from '~/components/Result'
import ClickButton from '~/components/buttons/ClickButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
import { mapGetters, mapActions } from 'vuex'
export default {
  components:{
    Result,
    ClickButton,
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
      text: 'sample_text',
      difficultyMap: {
        easy: 3,
        normal: 4,
        hard: 5,
      }
    }
  },
  computed: {
    ...mapGetters({
      min: 'min',
      sec: 'sec',
      bestRecords: 'bestRecords',
      bestRecord: 'bestRecord',
      puzzles: 'puzzles'
    }),
    // 選択したマップを返す（不正な値の場合はnull）
    selectedMap () {
      const m = this.puzzles
      const selected = m.filter(v => {
        return v.id === this.$route.params.map
      })
      if (!selected) {
        return null
      }
      if (selected.length !== 1) {
        return null
      }
      return selected[0]
    },
    mapName () {
      return this.selectedMap.name
    },
    mapImages () {
      const parameters = this.selectedMap.parameters
      const parameter =  parameters.filter(v => {
        return (v.split_n === this.difficultyMap[this.$route.params.difficulty])
      })

      // TODO: エラー処理
      if (!parameter) {
        return null
      }
      if (parameter.length !== 1) {
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
    completedImage () {
      return `/images/${this.mapImages}/completed.png`
    }
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
  margin-top: 38px;
  margin-left: -20px;
  text-align: center;
  height: 64px;
  line-height: 64px;
}

.share-area--text {
  margin-left: 40px;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  color: #fff;
  vertical-align: middle;
  display: inline-block;
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

.container {
  background-image:
    url('~assets/images/moon/img_pzlmoon.png'),
    url('~assets/images/background/background.png');
  background-repeat: no-repeat, no-repeat;
  background-size: initial, contain;
  background-position: 0 0, center center;
  width: 640px;
  height: 1148px;
}
</style>
