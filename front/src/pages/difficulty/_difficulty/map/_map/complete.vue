// パズル終了
<template lang="pug">
  div
    div.margin-top-result-area
    div.result-area
      div.result-area--purple
        div.map-name {{ mapName }}完成！
        div.record
          span.time {{ min }}
          span.time-unit 分
          span.time {{ sec }}
          span.time-unit 秒
        div.personal-best あなたの自己ベスト {{ bestRecord.min }}分{{ bestRecord.sec }}秒
      div.result-area--white
        img.completed-image(:src="completedImage")
    div.share-area
      div.share-area--text 結果をSNSでシェア!
      div.share-area--buttons
        facebook-share-button.facebook-share-button(:url="url")
        twitter-share-button.twitter-share-button(
          :url="url"
          :via="via"
          :related="related"
          :hashtags="hashtags"
          :text="text")
    div.button-area
      purple-button(@onClick="pushTop") はじめの画面に戻る
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

.completed-image {
  width: 421px;
  height: 421px;
  margin-top: 40px;
  margin-left: 70px;
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
  text-align: center;
}
</style>
