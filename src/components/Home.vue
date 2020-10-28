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
        <div class="homeProName">义乌市源荷储智能集成平台 -- <b>{{currentIndustry}}</b></div>
        <div class="hySelect">
          <el-select popper-class='hySelect_s' v-model="hyvalue" placeholder="请选择" @change="changIndustry">
            <el-option v-for="item in hyList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <ul style="max-width: 700px;overflow: auto">
          <li>
            <router-link tag="div" to='/home/map'><span class="icon iconfont icon-daohangshouye"></span><span>首页</span></router-link>
          </li>
          <li style="width: 150px;">
            <router-link tag="div" to='/home/operationMonitor'><span class="icon iconfont icon-jiankong"></span><span>运行监控分析</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/report'><span class="icon iconfont icon-baobiao"></span><span>报表</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/standing'><span class="icon iconfont icon-baobiao"></span><span>设备台账</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/user'><span class="icon iconfont icon-baobiao"></span><span>用户管理</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/system'><span class="icon iconfont icon-baobiao"></span><span>系统管理</span></router-link>
          </li>
        </ul>
        <div class="homeTime"><Time /></div>
        <div class="userMsg">
          <img :src="photo" alt="">
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
      userName: '',
      stationname: '',
      stationNameVal: '',
      isMapPage: 'map',
      mapshow: true,
      photo:require('@/assets/img/logo.png'),
      logo: require('@/assets/img/g5.png'),

      hyvalue:'g5',
      currentIndustry:'5G',
      hyList: [
        { value: 'sm', name: '商贸' },
        { value: 'wl', name: '物流' },
        { value: 'g5', name: '5G' },
        { value: 'ld', name: '路灯' },
        { value: 'cdz', name: '充电桩' },
        { value: 'gy', name: '工业' },
        { value: 'zht', name: '综合体' },
        { value: 'xwy', name: '小微园' },
      ]
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
    searchStation() {
      this.stationname = this.stationNameVal
      if (!this.stationNameVal) {
        this.$refs.childNode.getAllMarks();
      }

    },
    changIndustry(){
     let obj = this.hyList.filter(({ value, name})=>{
        return value == this.hyvalue
      })
     this.currentIndustry = obj[0]['name'];
     this.logo = require(`@/assets/img/${obj[0]['value']}.png`);
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
.searchBtn {
  cursor: pointer;
}
</style>
