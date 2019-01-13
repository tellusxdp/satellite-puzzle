<template>
  <div class="wrapper">
    <div>
      <div>ここに完成画像を表示</div>
      <div>◯◯◯◯◯◯◯◯（場所名）</div>
      <div>◯◯分◯秒で完成！</div>
      <div>あなたの自己ベスト</div>
      <div>◯◯分◯秒</div>
      <div>
        <div>結果をシェア</div>
        <div>
          <div class="share-button"><facebook-share-button/></div>
          <div class="share-button"><twitter-share-button/></div>
        </div>
      </div>
      <div>
        <gray-button @onClick="pushRetry">もう一度チャレンジ</gray-button>
      </div>
      <div>
        <gray-button @onClick="pushOtherMap">別の画像で遊ぶ</gray-button>
      </div>
      <div>
        <gray-button @onClick="pushTop">終了</gray-button>
      </div>
    </div>
  </div>
</template>

<script>
import GrayButton from '~/components/buttons/GrayButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
export default {
  components:{
    GrayButton,
    TwitterShareButton,
    FacebookShareButton,
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
.share-button {
  display: inline-block;
  vertical-align: top;
}
</style>
