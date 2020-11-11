<template>
  <div class='ywMap'>
    <div class="mapMuneBtn">
      <span class="arrow" :class="{menuActve:menushow}" @click="menushow=!menushow"></span>
    </div>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :zoom="zoom" :center='center' :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :key=index :position="marker.position" :events="marker.events" :icon="marker.icon" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
      </el-amap>
    </div>
    <transition name='fade'>
      <div v-show='menushow' class="menuList">
        <MapMenu @setmarker='setmarker' :stationid='stationid' />
      </div>
    </transition>
    <div class="mapSearch">
      <input v-model="stationNameVal" type="text" placeholder="搜站点">
      <span class="el-icon-search searchBtn" @click="searchMapName"></span>
    </div>
    <div class="mapUseEleMsg">
      <ul>
        <li v-show="stationid==2">
          <p><b>{{topNum.stationNum}}</b><span>个</span></p>
          <span>基站总数</span>
        </li>
        <li v-show="stationid==2">
          <p><b>{{topNum.disChargeAllNum}}</b><span>kWh</span></p>
          <span>本月总削峰电量</span>
        </li>
        <li v-show="stationid==2">
          <p><b>{{topNum.chargeAllNum}}</b><span>kWh</span></p>
          <span>本月总填谷电量</span>
        </li>
        <li v-show="stationid==2">
          <p><b>{{topNum.saveAllNum}}</b><span>元</span></p>
          <span>本月总节省电费</span>
        </li>
        <li v-show="stationid==2">
          <p><b>{{Number(topNum.allLoadNum).toFixed(2)}}</b><span>kW</span></p>
          <span>总可响应负荷</span>
        </li>
        <!-- 工业 -->
        <li v-show="stationid==5">
          <p><b>{{topNum.allUser}}</b><span>个</span></p>
          <span>工业用户总数</span>
        </li>
        <li v-show="stationid==5">
          <p><b>{{Number(topNum.allResLoad).toFixed(2)}}</b><span>kW</span></p>
          <span>总可响应负荷</span>
        </li>
        <li v-show="stationid==5">
          <p><b>{{topNum.allAdjustNoPower}}</b><span>kVar</span></p>
          <span>总可调节无功</span>
        </li>
        <li v-show="stationid==5">
          <p><b>{{topNum.allStoredEnergyVolume}}</b><span>kW</span></p>
          <span>总储能容量</span>
        </li>
      </ul>
    </div>

    <div class="iconStatus">
      <ul>
        <li>
          <div>
            <img :src="iconImg.d" alt="">
          </div>
          <p>{{statusNum.num1}}</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.c" alt="">
          </div>
          <p>{{statusNum.num2}}</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.f" alt="">
          </div>
          <p>{{statusNum.num3}}</p>
        </li>
        <li v-if="stationid==2">
          <div>
            <img :src="iconImg.t" alt="">
          </div>
          <p>{{statusNum.num4}}</p>
        </li>
        <li v-if="stationid==5">
          <div>
            <img :src="iconImg.g" alt="">
          </div>
          <p>{{statusNum.num4}}</p>
        </li>
        <li v-if="stationid==5">
          <div>
            <img :src="iconImg.r" alt="">
          </div>
          <p>{{statusNum.num4}}</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.w" alt="">
          </div>

          <p>{{statusNum.num5}}</p>
        </li>
        <li>
          <div>
            <img :src="iconImg.l" alt="">
          </div>
          <p>{{statusNum.num6}}</p>
        </li>
      </ul>
    </div>
    <div class="alertWindow yctList" v-if="showList">
      <div class="container">
        <StationMsg :stationDetail='stationDetail' @close='closeAl'>{{jzname}}</StationMsg>
      </div>
    </div>
    <div class="alertWindow yctList" v-if="gyWindowShow">
      <div class="container">
        <GyWindow :stationDetail='stationDetail' @close='closeAl'>{{jzname}}</GyWindow>
      </div>
    </div>
  </div>
</template> 

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import markerLabel from './markerLabel'
import GyWindow from './GyWindow'
import { amapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import { mapMarker, topNum } from '@/api'
import MapMenu from './MapMenu'
import StationMsg from './StationMsg'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '	6749e07e6a17a94ea7bc2a164f9202dd',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
})
export default {
  props: {
    stationid: null
  },
  components: { MapMenu, StationMsg, GyWindow },
  data() {
    return {
      stationname: '',

      topNum: {
        stationNum: '',
        allLoadNum: '',
        saveAllNum: '',
        disChargeAllNum: '',
        chargeAllNum: '',
        /* 工业 */
        allAdjustNoPower: '',
        allStoredEnergyVolume: '',
        allUser: '',
        allResLoad: '',
      },
      iconImg: {
        d: require('@/assets/img/d.png'),
        c: require('@/assets/img/c.png'),
        f: require('@/assets/img/f.png'),
        t: require('@/assets/img/t.png'),
        w: require('@/assets/img/w.png'),
        l: require('@/assets/img/l.png'),
        g: require('@/assets/img/g.png'),
        r: require('@/assets/img/r.png'),
      },
      alsImg: {
        s1: require('@/assets/img/als1.png'),
        s2: require('@/assets/img/als2.png'),
        s3: require('@/assets/img/als3.png'),
        s4: require('@/assets/img/als4.png'),
        s5: require('@/assets/img/als5.png'),
        s6: require('@/assets/img/als6.png'),
        s7: require('@/assets/img/als7.png'),
      },
      statusNum: {
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        num6: 0,
      },
      searchName:'',
      stationNameVal: '',
      stationDetail: {},
      searchMapKey: '', // 保存搜索地图关键词
      gyWindowShow: false,
      showList: false,
      menushow: false,
      jzname: '',
      amapManager,
      zoom: 12,
      center: [120.081079, 29.310772],

      allmarkers: [], // 保存全部marker
      markers: [],
      windows: [],
      window: '',
      events: {
        init: (o) => {
          this.$nextTick(() => {
            this.$refs.map.$amap.setFitView()
          })
          o.getCity((result) => {
          })
        },
        moveend: () => { },
        zoomchange: () => { },
      },
    }
  },
  created() {
    topNum({ userType: this.stationid }).then((res) => {
      this.topNum = res.data
    })
  },

  watch: {
    stationid() {
      this.getAllMarksData().then(res => {
        if (this.$refs.map.$amap) {
          this.$nextTick(() => {
            this.$refs.map.$amap.setFitView()
          })
        }
      })
      topNum({ userType: this.stationid }).then((res) => {
        this.topNum = res.data
      })
    },
    stationname() {
      if (!this.stationNameVal) {
        this.getAllMarks();
        return
      }
      let reg = new RegExp(this.stationname)
      let markers = this.allmarkers.filter((v) => {
        return reg.test(v.stationName)
      })
      this.markers = markers
      this.$nextTick(() => {
        this.searchMapKey = this.stationname
        this.$refs.map.$amap.setFitView()
      })
    },
  },
  mounted() {
    this.getAllMarksData().then(res => {
      if (this.$refs.map.$amap) {
        this.$nextTick(() => {
          this.$refs.map.$amap.setFitView()
        })
      }
    })

  },
  methods: {
    setmarker({ s }) {
      let markers = this.allmarkers.filter((v) => {
        return v.stationName === s
      })
      this.markers = markers
      this.$nextTick(() => {
        this.searchMapKey = s
        this.$refs.map.$amap.setFitView()
      })
    },
    getAllMarks() {
      this.markers = this.allmarkers
      this.$nextTick(() => {
        this.$refs.map.$amap.setFitView()
      })
    },
    searchMapName(){
      this.stationname = this.stationNameVal
    },
    setChangeMapStatus() {
      this.getAllMarksData().then(res => {
        if (!this.searchMapKey) {
          this.markers = this.allmarkers
          return
        }
        let markers = this.allmarkers.filter((v) => {
          return v.stationName === this.searchMapKey
        })
        this.markers = markers

      })



    },
    getAllMarksData() {
      return new Promise((resolve, reject) => {
        let self = this
        let windows = []
        mapMarker({ userType: this.stationid }).then((res) => {
          this.statusNum = res.data.statusNum ? res.data.statusNum : {}

          // 工业
          if (this.stationid == 5) {
            this.topNum.allResLoad = res.data.allResLoad
          }

          let markers = res.data.list.map((v, i) => {
            let icon = require('@/assets/img/s' + (v.runStatus ? v.runStatus : 1) + '.png')
            let dcColor = 'c1', ktColor = 'c1', dcImg = 1, ktImg = 1, dcText = '充电', ktText = '停止';
            switch (v.runStatus) {
              case 3:
                dcColor = 'c1';
                ktColor = 'c4';
                dcImg = 3;
                ktImg = 6;
                dcText = '充电';
                ktText = '停止';
                break;
              case 4:
                dcColor = 'c1';
                ktColor = 'c5';
                dcImg = 3;
                ktImg = 7;
                dcText = '充电';
                ktText = '开启';
                break;
              case 5:
                dcColor = 'c2';
                ktColor = 'c4';
                dcImg = 4;
                ktImg = 6;
                dcText = '放电';
                ktText = '停止';
                break;
              case 6:
                dcColor = 'c2';
                ktColor = 'c5';
                dcImg = 4;
                ktImg = 7;
                dcText = '放电';
                ktText = '开启';
                break;
              case 7:
                dcColor = 'c3';
                ktColor = 'c4';
                dcImg = 5;
                ktImg = 6;
                dcText = '待机';
                ktText = '停止';
                break;
              case 8:
                dcColor = 'c3';
                ktColor = 'c5';
                dcImg = 5;
                ktImg = 7;
                dcText = '待机';
                ktText = '开启';
                break;
              case 9:
                dcColor = 'c3';
                ktColor = 'c5';
                dcImg = 5;
                ktImg = 7;
                dcText = '待机';
                ktText = '开启';
                break;
            }

            /* 图标弹窗 */
            let alerWins = `
          <div class='alstyle'>
            <h2 style='font-weight:700'>${v.stationName}</h2>
            <ul>
              <li><span>基站负荷：</span><span>${v.allPower ? (v.allPower).toFixed(2) : ''} kW</span></li>
              <li style="${v.runStatus == 1 || v.runStatus == 2 || !v.runStatus ? 'display:none' : ''}">
                <span>电池状态：</span>
                <span class="${dcColor}">
                <img src="${this.alsImg['s' + dcImg]}" /> 
                ${dcText}</span>
              </li>
              <li style="${v.runStatus == 1 || v.runStatus == 2 || !v.runStatus ? 'display:none' : ''}">
                <span>空调状态：</span>
                <span class="${ktColor}"><img src="${this.alsImg['s' + ktImg]}" /> ${ktText}</span>
              </li>
              <li><span>室内温度：</span><span>${v.temperature ? v.temperature : ''} ℃</span></li>
            <ul>
          </div>
          `
            if (v.runStatus == 9) {
              alerWins = `
          <div class='alstyle'>
            <h2 style='font-weight:700'>${v.stationName}</h2>
            <ul>
              <li><span>负荷：</span><span>${v.allPower ? (v.allPower).toFixed(2) : ''} kW</span></li>
              <li><span>可调负荷：</span><span class='param'>${v.adjustPower ? (v.adjustPower).toFixed(2) : 0} kW</span></li>
            <ul>
          </div>
          `
            }

            windows.push({
              position: [Number(v.longitude), Number(v.latitude)],
              content: alerWins,
              visible: false,
            })
            return {
              stationName: v.stationName,
              position: [Number(v.longitude), Number(v.latitude)],
              icon,
              events: {
                click: () => {
                  if (!v.runStatus || v.runStatus == 1) {
                    return
                  }
                  this.jzname = v.stationName

                  this.stationDetail = v
                  if (v.runStatus == 9) {
                    this.gyWindowShow = true
                  }
                  this.showList = true
                },
                mousemove: (e) => {
                  self.windows.forEach((window) => {
                    window.visible = false
                  })

                  self.window = self.windows[i]
                  self.$nextTick(() => {
                    self.window.visible = true
                  })
                },

                mouseout: (e) => {
                  self.windows.forEach((window) => {
                    window.visible = false
                  })
                },
              },
              visible: true,
              draggable: false,
              template: markerLabel,
            }
          })
          this.markers = markers
          this.windows = windows
          this.allmarkers = markers
          if (res.success) {
            resolve(this.allmarkers)
          } else {
            reject('失败')
          }
        })
      })
    },
    getMap() {
      // amap vue component
      // console.log(amapManager._componentMap)
      // // gaode map instance
      // console.log(amapManager._map)
    },

    closeAl() {
      this.showList = false
      this.gyWindowShow = false
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
.container {
  max-width: 1350px;
  width: 80%;
  max-height: 80%;
  height: 80%;
}
</style>
