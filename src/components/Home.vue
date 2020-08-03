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
          <input type="text" placeholder="搜索">
          <span class="el-icon-search searchBtn"></span>
          <b></b>
        </div>
        <div class="homeProName">义乌市通讯基站能源管控平台  </div>
        <ul>
          <li>
            <router-link tag="div" to='/home'><span class="icon iconfont icon-daohangshouye"></span><span>首页</span></router-link>
          </li>
          <li style="width: 150px;">
            <router-link tag="div" to='operationMonitor'><span class="icon iconfont icon-jiankong"></span><span>运行监控分析</span></router-link>
          </li>
          <li>
            <router-link tag="div" to='report'><span class="icon iconfont icon-baobiao"></span><span>报表</span></router-link>
          </li>
        </ul>
        <div class="homeTime"><Time /></div>
        <div class="userMsg">
          <img :src="logo" alt="">
          <span class="username">admin </span>
        </div>
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
      mapshow:true,
      logo: require('@/assets/img/logo.png'),
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
  },
}
</script>
<style scoped>
</style>
