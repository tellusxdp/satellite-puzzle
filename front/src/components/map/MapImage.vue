<template lang="pug">
  .puzzle-map(@click="click")
    .puzzle-map--background
      img.puzzle-map--image(:src="src")
    .puzzle-map--label
      map-ribbon {{ mapName }}
</template>

<script>
import MapRibbon from '~/components/ribbon/MapRibbon'
export default {
  components: {
    MapRibbon
  },
  props: {
    mapName: {
      type: String,
      default: "",
    },
    mapImage: {
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

  &--background {
    width: 401px;
    height: 477px;
    border-radius: 4px;
    background-color: #fff;
    margin: auto auto;
  }

  &--image {
    width: 353px;
    height: 353px;
    margin: 24px;
  }

  &--label {
    margin-top: -124px;
    margin-left: 28px;
  }
}
</style>
