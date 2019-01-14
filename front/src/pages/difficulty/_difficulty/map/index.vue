<template>
  <div class="map">
    <div class="return">
      <button @click="pushDifficulty">←レベル選択に戻る</button>
    </div>
    <div class="map-area">
      <div class="map-list">
        <kilauea-map @onClick="pushKilauea"/>
        <br>
        <kilauea-map @onClick="pushKilauea"/>
        <br>
        <kilauea-map @onClick="pushKilauea"/>
      </div>
    </div>
  </div>
</template>

<script>
import KilaueaMap from '~/components/map/Kilauea'
export default {
  components: {
    KilaueaMap
  },
  methods :{
    pushKilauea () {
      this.$router.push('/difficulty/'+this.$route.params.difficulty+'/map/kilauea')
    },
    pushDifficulty () {
      this.$router.push('/difficulty')
    }
  }
}
</script>

<style>
.return {
  /* width: 213px; */

  /* height: 24px; */

  /* font-family: NotoSansCJKjp; */
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #fff;
  position: relative;
  left: 34px;
  top: 97px;
}

.map-area {
  margin-top: 211px;
  margin-left: 81px;
}

.map-list {
  overflow: auto;
  height: 90vh;
}

.map {
  margin-left: auto;
  margin-right: auto;
}
</style>
