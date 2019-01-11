<template>
  <div class="wrapper">
    <p>難易度選択</p>
    <div>
      ここにテキストを表示<br>
      ここにテキストを表示
    </div>
    <div>
      <grey-button :next-path="easy">初級</grey-button>
    </div>
    <div>
      <grey-button :next-path="normal">中級</grey-button>
    </div>
    <div>
      <grey-button :next-path="hard">上級</grey-button>
    </div>
    <div>
      <div>SAR画像とは</div>
      <div>
        ここにテキストを表示<br>
        ここにテキストを表示
      </div>
      <div>
        <grey-button>もっと知りたい</grey-button>
      </div>
    </div>
  </div>
</template>

<script>
import GreyButton from '~/components/buttons/GreyButton'
export default {
  components: {
    GreyButton,
  },
  computed: {
    easy () {
      return '/difficulty/easy/map'
    },
    normal () {
      return '/difficulty/normal/map'
    },
    hard () {
      return '/difficulty/hard/map'
    },
  }
}
</script>
