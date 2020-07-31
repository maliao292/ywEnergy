<template>
  <div class='ywMap'>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
    </div>
  </div>
</template>

<script>
import { amapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
export default {
  components: {},
  data() {
    return {
      amapManager,
      zoom: 12,
      events: {
        init: (o) => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity((result) => {
            console.log(result)
          })
        },
        moveend: () => {},
        zoomchange: () => {},
      },
  
    }
  },
  created() {},
  mounted() {},
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap)
      // gaode map instance
      console.log(amapManager._map)
    },
  },
}
</script>
<style scoped>
.ywMap {
  position: relative;
  height: 100%;
}
.ywMap .amap-page-container {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  top: 0; */
  border: 1px solid #999;
  z-index: 1111111111;
}
</style>
