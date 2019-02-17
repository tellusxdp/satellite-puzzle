// マップ
// clickするとonClickをemitする
<template lang="pug">
  .puzzle-map(@click="click")
    .background
      img.image(:src="src")
    .label
      map-ribbon {{ mapName }}
</template>

<script>
import MapRibbon from '~/components/ribbon/MapRibbon'
export default {
  components: {
    MapRibbon
  },
  props: {
    mapName: { // 表示するマップ名
      type: String,
      default: "",
    },
    mapImage: { // 表示するマップの画像
      type: String,
      default: ""
    }
  },
  methods: {
    click () {
      this.$emit('onClick')
    }
  },
  computed: {
    src () {
      return `/images/${this.mapImage}/completed.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.puzzle-map {
  width: 498px;
  height: 455px;
  // position: relative;

  .background {
    margin: auto auto;
    width: 401px;
    height: 477px;
    border-radius: 4px;
    background-color: #fff;
  }

  .image {
    margin: 24px;
    width: 353px;
    height: 353px;
  }

  .label {
    margin-top: -124px;
    margin-left: 28px;
  }
}
</style>
