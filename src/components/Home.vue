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
          <template v-show="isMapPage == map">
            <input type="text" placeholder="搜索">
            <span class="el-icon-search searchBtn"></span>
            <b></b>
          </template>

        </div>
        <div class="homeProName">义乌市通讯基站能源管控平台 </div>
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
          <span class="username">admin </span>
        </div>
        <div @click="toScreen" style="color:#fff;cursor:pointer">大屏</div>
        <div class="logout icon iconfont icon-tuichu"></div>
      </div>
      <div class="homeContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Time from './Time'
export default {
  components: {
    Time,
  },
  data() {
    return {
      isMapPage: true,
      mapshow: true,
      logo: require('@/assets/img/logo.png'),
    }
  },
  computed: {},
  watch: {},
  methods: {
    toScreen() { this.$router.push({ name: 'screen' }) }
  },
  created() {
    this.isMapPage = this.$route.name
  },
  beforeEnter(to, from, next) {

    console.log(to)

    //　　next() //正常跳转，不写的话，不会跳转

  }
}
</script>
<style scoped>
</style>
