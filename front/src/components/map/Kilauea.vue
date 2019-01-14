// キラウエア火山
<template>
  <div
    class="map--kilauea"
    @click="click">
    <div class="map--kilauea--background"/>
    <br>
    <img
      src="~assets/images/map/kilauea/label.png"
      class="map--kilauea--label">
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('onClick')
    }
  }
}
</script>

<style>
.map--kilauea {
  width: 449px;
  height: 455px;
  position: relative;
}

.map--kilauea--background {
  width: 419px;
  height: 455px;
  background-color: #fff;
  position: absolute;
  left: 30px;
}

.map--kilauea--label {
  width: 249px;
  height: 70px;

  /* background-color: #6c53f3; */
  position: absolute;
  top: 344px;
}
</style>
