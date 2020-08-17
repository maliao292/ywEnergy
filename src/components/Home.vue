<template>
  <div class='homeContainer'>
    <!--<div class="mapMenuControl">-->
    <!--<div class="homeLogo">-->
    <!--<img :src="logo">-->
    <!--</div>-->
    <!--<div class="mapMuneBtn">-->
    <!--<span class="arrow "></span>-->
    <!--</div>-->
    <!--</div>-->
    <div class="homeRight">
      <div class="navigation">
        <div class="homeLogo">
          <img :src="logo">
        </div>
        <div class="homeSearch">
            <input v-model="stationNameVal" v-show="isMapPage == 'map'" type="text" placeholder="搜索">
            <span v-show="isMapPage == 'map'" class="el-icon-search searchBtn" @click="searchStation"></span>
            <b v-show="isMapPage == 'map'"></b>
        </div>
        <div class="homeProName">义乌市源荷储智能集成平台 </div>
        <ul>
          <li>
            <router-link tag="div" to='/home/map'><span class="icon iconfont icon-daohangshouye"></span><span>首页</span></router-link>
          </li>
          <li style="width: 150px;">
            <router-link tag="div" to='/home/operationMonitor'><span class="icon iconfont icon-jiankong"></span><span>运行监控分析</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/report'><span class="icon iconfont icon-baobiao"></span><span>报表</span></router-link>
          </li>
        </ul>
        <div class="homeTime"><Time /></div>
        <div class="userMsg">
          <img :src="logo" alt="">
          <span class="username">{{userName}} </span>
        </div>
        <div @click="toScreen" style="color:#fff;cursor:pointer">大屏</div>
        <div class="logout icon iconfont icon-tuichu" @click="toLogin"></div>
      </div>
      <div class="homeContent">
        <router-view ref='childNode' :stationname='stationname'></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Time from './Time'
import { mapMutations } from 'vuex'
export default {
  components: {
    Time,
  },
  data() {
    return {
      userName:'',
      stationname:'',
      stationNameVal:'',
      isMapPage: 'map',
      mapshow: true,
      logo: require('@/assets/img/logo.png'),
    }
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.isMapPage = to.name
    },
  },

  methods: {
    ...mapMutations(['clearInfo']),
    toLogin() {
      this.clearInfo();
      this.$router.replace({ name: 'login' })
    },
    searchStation(){
      this.stationname = this.stationNameVal
      if(!this.stationNameVal){
        this.$refs.childNode.getAllMarks();
      }
      
    },
    toScreen() { this.$router.push({ name: 'screen' }) }
  },
  created() {
    this.userName = localStorage.getItem('ywUserName')
    this.isMapPage = this.$route.name
  },

}
</script>
<style scoped>
.searchBtn{
  cursor: pointer;
}
</style>
