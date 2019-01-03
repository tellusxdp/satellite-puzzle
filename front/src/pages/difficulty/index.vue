<template>
  <div class="wrapper">
    <p>難易度選択</p>
    <div>
      ここにテキストを表示<br>
      ここにテキストを表示
    </div>
    <div @click="easy">
      <grey-button>初級</grey-button>
    </div>
    <div @click="normal">
      <grey-button>中級</grey-button>
    </div>
    <div @click="hard">
      <grey-button>上級</grey-button>
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
  methods: {
    easy() {
      this.$router.push('/difficulty/easy/map')
    },
    normal() {
      this.$router.push('/difficulty/normal/map')
    },
    hard() {
      this.$router.push('/difficulty/hard/map')
    },
  }
}
</script>
