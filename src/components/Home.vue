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
        <!--<div class="homeSearch">-->
        <!--<input v-model="stationNameVal" v-show="isMapPage == 'map'" type="text" placeholder="搜索">-->
        <!--<span v-show="isMapPage == 'map'" class="el-icon-search searchBtn" @click="searchStation"></span>-->
        <!--<b v-show="isMapPage == 'map'"></b>-->
        <!--</div>-->
        <div class="homeProName">义乌市源荷储智能集成平台 -- <b>{{currentIndustry}}</b></div>
        <div class="hySelect">
          <el-select popper-class='hySelect_s' v-model="hyvalue" placeholder="请选择" @change="changIndustry">
            <el-option v-for="item in hyList" :key="item.dict_sort" :label="item.dict_label" :value="item.dict_sort">
            </el-option>
          </el-select>
        </div>
        <ul style="max-width: 1000px">
          <li>
            <router-link tag="div" to='/home/map'><span class="icon iconfont icon-daohangshouye"></span>
              <p>首页</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/operationMonitor'><span class="icon iconfont icon-jiankong"></span>
              <p>运行监控分析</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/runStrategy'><span class="icon iconfont icon-yunhangcelveguanli"></span>
              <p>运行策略管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/sideDemand'><span class="icon iconfont icon-xuqiucexiangyingguanli"></span>
              <p>需求侧响应管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/nengxiao'><span class="icon iconfont icon-nengxiaoguanli"></span>
              <p>能效管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/user'><span class="icon iconfont icon-yonghuguanli"></span>
              <p>用户管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/standing'><span class="icon iconfont icon-shebeiguanli"></span>
              <p>设备管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/alarm'><span class="icon iconfont icon-baojingguanli"></span>
              <p>报警管理</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/report'><span class="icon iconfont icon-baobiao"></span>
              <p>报表</p>
            </router-link>
          </li>
          <li>
            <router-link tag="div" to='/home/system'><span class="icon iconfont icon-xitongguanli"></span>
              <p>系统管理</p>
            </router-link>
          </li>
        </ul>
        <div class="homeTime"><Time /></div>
        <div class="userMsg">
          <img :src="photo" alt="">
          <span class="username">{{userName}} </span>
        </div>
        <div @click="toScreen" style="color:#fff;cursor:pointer;line-height: 64px">大屏</div>
        <div class="logout icon iconfont icon-tuichu" @click="toLogin"></div>
      </div>
      <div class="homeContent">
        <router-view ref='childNode' :stationname='stationname' :stationid='hyvalue'></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Time from './Time'
import { ptType } from '@/api'
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
      photo: require('@/assets/img/logo.png'),
      logo: require('@/assets/img/g5.png'),

      hyvalue: 2,
      currentIndustry: '5G',
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
  mounted() {
    ptType().then((result) => {
      this.hyList = result.data
    }).catch((err) => {
      console.log(err)
    });
  },
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
    changIndustry() {
      let obj = this.hyList.filter(({ dict_sort, dict_label }) => {
        return dict_sort == this.hyvalue
      })
      this.currentIndustry = obj[0]['dict_label'];
      let picname = 'g5'
      switch (obj[0]['dict_sort']) {
        case 0:
          picname = 'sm';
          break;
        case 1:
          picname = 'wl';
          break;
        case 2:
          picname = 'g5';
          break;
        case 3:
          picname = 'ld';
          break;
        case 4:
          picname = 'cdz';
          break;
        case 5:
          picname = 'gy';
          break;
        case 6:
          picname = 'zht';
          break;
        case 7:
          picname = 'xwy';
          break;
      }
      this.logo = require(`@/assets/img/${picname}.png`);
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
