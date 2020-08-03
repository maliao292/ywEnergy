<template>
  <div class='ywMap'>
    <div class="mapMuneBtn">
      <span class="arrow" :class="{menuActve:menushow}" @click="menushow=!menushow"></span>
    </div>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key=index :position="marker.position" :events="marker.events" :icon="marker.icon" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
    </div>
    <transition name='fade'>
      <div v-show='menushow' class="menuList">
        <MapMenu />
      </div>
    </transition>

    <div class="mapUseEleMsg">
      <ul>
        <li>
          <p><b>530</b><span>个</span></p>
          <span>基站总数</span>
        </li>
        <li>
          <p><b>15600</b><span>kWh</span></p>
          <span>本月总削峰电量</span>
        </li>
        <li>
          <p><b>17500</b><span>kWh</span></p>
          <span>本月总填谷电量</span>
        </li>
        <li>
          <p><b>15600</b><span>元</span></p>
          <span>本月总节省电费</span>
        </li>
        <li>
          <p><b>800</b><span>kW</span></p>
          <span>总可响应负荷</span>
        </li>
      </ul>
    </div>

    <div class="iconStatus">
      <ul>
        <li>
          <div>
            <img :src="iconImg.d" alt="">
          </div>
          <p>1</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.c" alt="">
          </div>
          <p>1</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.f" alt="">
          </div>
          <p>1</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.t" alt="">
          </div>
          <p>1</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.w" alt="">
          </div>

          <p>1</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.l" alt="">
          </div>
          <p>1</p>
        </li>
      </ul>
    </div>
  </div>
</template> 

<script>
import { amapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import MapMenu from './MapMenu'
export default {
  components: { MapMenu },
  data() {
    return {
      iconImg: {
        d: require('@/assets/img/d.png'),
        c: require('@/assets/img/c.png'),
        f: require('@/assets/img/f.png'),
        t: require('@/assets/img/t.png'),
        w: require('@/assets/img/w.png'),
        l: require('@/assets/img/l.png'),
      },
      menushow: false,
      amapManager,
      zoom: 12,
      markers: [
        {
          position: [121.5273285, 31.21515044],
          icon: require('@/assets/img/d.png'),
          events: {
            click: () => {
              // alert('click marker')
            },
            mousemove:(e) => {
              
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            },
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>',
        },
        {
          position: [121.5273285, 31.2195044],
          events: {
            click: () => {
              // alert('click marker')
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            },
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>',
        },
      ],
      events: {
        init: (o) => {
          console.log(o.getCenter())
          this.$nextTick(() => {
            this.$refs.map.$amap.setFitView()
          })
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
    menuShowBtn() {},
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left: -250px;
}

.ywMap {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.ywMap .mapMuneBtn {
  width: 50px;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
.ywMap .mapMuneBtn span {
  display: inline-block;
  margin-right: 10px;
}
.mapMuneBtn .arrow.menuActve {
  display: inline-block;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-left: 10px solid #333;
  border-bottom: 10px solid transparent;
  margin-left: 10px;
  margin-right: 0;
}
.ywMap .amap-page-container {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  top: 0; */
  border: 1px solid #999;
  z-index: 10;
}
.menuList {
  position: absolute;
  top: 0;
  left: 50px;
  bottom: 0;
  width: 200px;
  z-index: 11;
  background: #000710;
}
</style>
