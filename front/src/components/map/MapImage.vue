<template>
  <div
    class="map-"
    @click="click">
    <div class="map--background">
      <img
        class="map--background--image"
        :src="src">
    </div>
    <div class="map-label">
      <img
        src="~assets/images/map/label/label.png"
        class="map-label--image">
      <div class="map-label--text">{{ mapName }}</div>
    </div>
  </div>
</template>

<script>
export default {
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
      return `/images/maps/${this.mapImage}/completed.png`
    }
  }
}
</script>

<style>
.map- {
  width: 449px;
  height: 455px;
  position: relative;
}

.map--background {
  width: 419px;
  height: 455px;
  background-color: #fff;
  position: absolute;
  left: 30px;
}

.map--background--image {
  width: 350px;
  height: 400px;
  position: absolute;
  top: 36px;
  left: 33px;
}

.map-label {
  position: relative;
}

.map-label--image {
  width: 249px;
  height: 70px;
  position: absolute;
  top: 344px;
}

.map-label--text {
  position: absolute;
  top: 367px;
  left: 42px;
  color: #fff;
  font-size: 24px;
  line-height: 36px;
}
</style>
