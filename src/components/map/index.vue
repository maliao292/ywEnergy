<template>
  <div class='ywMap'>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
      </el-amap>
      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </div>
</template>

<script>
import {amapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
export default {
  components: {},
  data() {
    return {
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
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
        click: (e) => {
          alert('map clicked')
        },
      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o)
            },
          },
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
