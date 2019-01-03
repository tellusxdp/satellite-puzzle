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
      <div @click="retry">
        <grey-button>もう一度チャレンジ</grey-button>
      </div>
      <div @click="otherMap">
        <grey-button>別の画像で遊ぶ</grey-button>
      </div>
      <div @click="top">
        <grey-button>終了</grey-button>
      </div>
    </div>
  </div>
</template>

<script>
import GreyButton from '~/components/buttons/GreyButton'
import TwitterShareButton from '~/components/buttons/share/Twitter'
import FacebookShareButton from '~/components/buttons/share/Facebook'
export default {
  components:{
    GreyButton,
    TwitterShareButton,
    FacebookShareButton,
  },
  methods: {
    retry() {
      const difficulty = this.$route.params.difficulty
      const map = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map/'+map)
    },
    otherMap() {
      const difficulty = this.$route.params.map
      this.$router.push('/difficulty/'+difficulty+'/map')
    },
    top() {
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
