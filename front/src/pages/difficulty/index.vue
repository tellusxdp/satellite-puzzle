<template>
  <div class="wrapper">
    <p>難易度選択</p>
    <div>
      ここにテキストを表示<br>
      ここにテキストを表示
    </div>
    <div>
      <gray-button @onClick="pushEasy">初級</gray-button>
    </div>
    <div>
      <gray-button @onClick="pushNormal">中級</gray-button>
    </div>
    <div>
      <gray-button @onClick="pushHard">上級</gray-button>
    </div>
    <div>
      <div>SAR画像とは</div>
      <div>
        ここにテキストを表示<br>
        ここにテキストを表示
      </div>
      <div>
        <gray-button>もっと知りたい</gray-button>
      </div>
    </div>
  </div>
</template>

<script>
import GrayButton from '~/components/buttons/GrayButton'
export default {
  components: {
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
