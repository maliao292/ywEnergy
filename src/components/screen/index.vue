<template>
  <div class='screenConrainer'>
    <div class="screenTitle">
      <div>
        <i><img :src="clock" alt=""></i>
        <Time style="display:inline-block;width:285px" :fontName='fontName' />
        <span class="timeFont">TIME</span>
      </div>
      <div class="stitle">义乌市源荷储智能集成平台</div>
      <div class="userBtn">
        <span class="timeFont">
          Welcome,admin!
        </span>
        <img :src="back" alt="" @click="backFun">
        <img :src="out" alt="" @click="toLogin">
      </div>
    </div>
    <div class="screenCon">
      <div class="sreenLeft">
        <div class="enerynum fw">
          <h4 class="modelTitle">能效服务</h4>
          <div>
            <span>用户总数</span>
            <p><i>{{serverNum.userNum}}</i><span>户</span></p>
          </div>
          <div>
            <span>装机容量</span>
            <p><i>{{serverNum.allVolume}}</i><span>MVA</span></p>
          </div>
        </div>
        <div id="screenPie" class="screenPie eccon" style="width:100%;height:300px"></div>
        <div class="enerynum jztj">
          <h4 class="modelTitle">节支统计</h4>
          <div class="thisYearJZ">
            <span>3.5%</span>
            <p>本年节支</p>
          </div>
          <div class="zjrl">
            <p><img :src="co2" alt=""><span>4545</span><span>吨</span></p>
            <span>装机容量</span>
          </div>
        </div>
        <div id="screenBar" class="screenBar eccon" style="width:100%;height:200px;overflow:hidden"></div>
      </div>
      <div class="screenMap">
        <div class="msgnum">
          <p>户数</p>
          <p><span>{{ychAllData.stationNum}}</span> <i>户</i> </p>
          <p>容量</p>
          <p><span>{{ychAllData.volume}}</span> <i>MW</i> </p>
          <p>{{allText}}</p>
          <p><span>{{ychAllData.allLoadNum}}</span><i>MW</i></p>
        </div>
        <div class="mapshow">
          <img :src="map" alt="">
          <span class="mapicon fh" v-for="(val,key) in baseStationList" :key='key' :style="{top:val[0]+'%',left:val[1]+'%'}" @mouseenter="cpm(val)" @mouseleave="cpmout(val)">
            <img :src="modelIcon">
          </span>

          <div class="msgWindow" :class="activeModel" v-show="showWindow" :style="{top:windowMsg[0]+4.3+'%',left:windowMsg[1]-3.8+'%'}">
            <span class="artical"></span>
            <h3>{{windowMsg[2].station}}</h3>
            <ul>
              <li v-for="(item,key) in windowMsg[2].msg" :key="key">
                <div><span>{{item.key}}</span><span>{{item.val}}</span><span>{{item.unit}}</span></div>
              </li>
            </ul>
          </div>

        </div>
        <div class="mapBtn">
          <div><img :src="modelIcon" alt=""><span class="yhc">{{yhc}}</span></div>
          <ul>
            <li v-for="item in eneryDist" :key="item.value">
              <span class="sm" :class="{active:activeDist===item.value}" @click="distChange(item.value,item.text)">{{item.text}}</span>
            </li>
          </ul>
          <div class="mapModel">
            <div v-for="item in modelDist" :key="item.value">
              <span class="sm" :class="{active:activeModel===item.value}" @click="modelChange(item)">{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sreenRight">
        <div>
          <div class="modelTitle">储荷互动</div>
          <div class="chhdNum">
            <div class="third">
              <p>
                <span>秒切负荷</span><i>kW</i>
              </p>
              <span>{{chhdNum.mqfh}}</span>
            </div>
            <div class="third">
              <p>
                <span>目前负荷</span><i>kW</i>
              </p>
              <span>4683.36</span>
            </div>
            <div class="third">
              <p>
                <span>秒投储能</span><i>MW</i>
              </p>
              <span>{{chhdNum.mtcn}}</span>
            </div>
            <div class="half">
              <p>
                <span>感性无功</span><i>MVA</i>
              </p>
              <span>4683.36</span>
            </div>
            <div class="half">
              <p>
                <span>容性无功</span><i>MVA</i>
              </p>
              <span>4683.36</span>
            </div>

          </div>
        </div>
        <div class="lineCon">
          <div id="gf"></div>
          <div id="fh"></div>
          <div id="cn"></div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Time from '../Time'
import { screenMidData, screenCLine, screenFLine, screenServer, screenChhd } from '@/api'
export default {
  components: { Time },
  data() {
    return {
      allText: '总发电功率',
      ychAllData: {
        allLoadNum: '',
        volume: '',
        stationNum: '',
      },
      serverNum: {
        userNum: '',
        allVolume: ''
      },
      chhdNum: {
        mqfh: '',
        mtcn: ''
      },
      ychAllDataContent: {

      },
      fontName: 'circle',
      clock: require('@/assets/img/screen/screenTime.png'),
      back: require('@/assets/img/screen/screenBack.png'),
      out: require('@/assets/img/screen/screenOut.png'),
      co2: require('@/assets/img/screen/co2.png'),
      map: require('@/assets/img/screen/ditu.png'),
      modelIcon: require('@/assets/img/screen/screenY.png'),
      yhc: '负荷',
      eneryDist: [
        { value: 'sm', text: '商贸' },
        { value: 'wl', text: '物流' },
        { value: 'g5', text: '5G' },
        { value: 'ld', text: '路灯' },
        { value: 'cdz', text: '充电桩' },
        { value: 'gy', text: '工业' },
        { value: 'zht', text: '综合体 ' },
        { value: 'xwy', text: '小微园 ' },
      ],

      modelDist: [
        { value: 'y', text: '源', name: '光伏', icon: require('@/assets/img/screen/screenY.png'), allText: '总发电功率' },
        { value: 'h', text: '荷', name: '负荷', icon: require('@/assets/img/screen/screenFh.png'), allText: '总可响应负荷' },
        { value: 'c', text: '储', name: '储能', icon: require('@/assets/img/screen/screenCn.png'), allText: '总可响应负荷' },
      ],
      activeDist: 'sm',
      activeModel: 'y',
      baseStationList: [],

      yMsg: {},
      hMsg: {
        g5: [
          // [42, 47.6, { station: '义乌茂后基站', msg: [{ key: '基站负荷：', val: 8.6, unit: 'kW' }, { key: '可响应负荷：', val: 2.2, unit: 'kW' }] }],
        ]
      },
      cMsg: {
        g5: [
          //   [45, 41, { station: '义乌溪干西基站', msg: [{ key: '电池状态：', val: '待机' }, { key: '电池容量：', val: 8.6, unit: 'kW' }, { key: '可响应负荷：', val: 8.6, unit: 'kW' }] }],
        ]
      },
      windowMsg: [0, 0, { station: '', msg: [{ key: '', val: '' }] }],
      showWindow: false,
    };
  },
  created() {
    this.getMiddleData()
    screenServer().then(res => {
      this.serverNum = res.data
    })
    screenChhd().then(res => {
      this.chhdNum = res.data
    })
  },
  methods: {
    async getMiddleData() {
      let res = await screenMidData();
      let { c_volume, h_volume, allLoadNum, stationNum } = res.data
      this.ychAllData = { allLoadNum, stationNum }
      this.ychAllData.volume = this.ychAllDataContent['y_volume'] ? this.ychAllDataContent['y_volume'] : 0
      this.ychAllDataContent = { c_volume, h_volume }
      let list = res.data.list
      let st = '充电'
      switch (list[1].batteryStatus) {
        case 0:
          st = '充电'
          break
        case 1:
          st = '放电'
          break
        case 2:
          st = '待机'
          break
      }
      this.hMsg.g5[0] = [42, 47.6, { station: '义乌茂后基站', msg: [{ key: '基站负荷：', val: list[0]['allPower'], unit: 'kW' }, { key: '可响应负荷：', val: list[0]['responsiveLoad'], unit: 'kW' }] }];
      this.cMsg.g5[0] = [45, 41, { station: '义乌溪干西基站', msg: [{ key: '电池状态：', val: st }, { key: '电池容量：', val: list[1].sourceFixPower, unit: 'kW' }, { key: '可响应负荷：', val: list[1].responsiveLoad, unit: 'kW' }] }];
    },
    async getFLineData() {
      let res = await screenFLine()
      let xInterVal = this.$publicMethods.getInterVal({ begin: res.data.xData[0], end: res.data.xData[1] ? res.data.xData[1] : '00:15' })
      let xArr = this.$publicMethods.getMinuteForX(xInterVal)
      this.$chart.screenLine('fh', '负荷', this.getLines(res.data.yData)['legendArr'], xArr, this.getLines(res.data.yData)['seriesArr'])
    },
    async getCLineData() {
      let res = await screenCLine()
      let xInterVal = this.$publicMethods.getInterVal({ begin: res.data.xData[0], end: res.data.xData[1] ? res.data.xData[1] : '00:15' })
      let xArr = this.$publicMethods.getMinuteForX(xInterVal)
      this.$chart.screenLine('cn', '储能', this.getLines(res.data.yData)['legendArr'], xArr, this.getLines(res.data.yData)['seriesArr'])
      this.$chart.screenLine('gf', '光伏', this.getLines(res.data.yData)['legendArr'], xArr, [])
    },
    getLines(yData) {
      let legendArr = [], seriesArr = []
      yData.forEach(({ name, arr }) => {
        legendArr.push(name)
        seriesArr.push({
          name: name,
          type: 'line',
          smooth: false,
          symbol: 'none',
          data: arr
        })
      })
      return {
        legendArr, seriesArr
      }
    },
    distChange(val) {
      this.activeDist = val
      let activeStation = this[this.activeModel + 'Msg'] ? this[this.activeModel + 'Msg'][val] : [];
      this.baseStationList = activeStation ? activeStation : []
    },
    modelChange({ value, text, name, icon, allText }) {
      this.ychAllData.volume = this.ychAllDataContent[value + '_volume'] ? this.ychAllDataContent[value + '_volume'] : 0
      this.allText = allText
      this.activeModel = value
      this.yhc = name
      this.modelIcon = icon
      let activeStation = this[value + 'Msg'] ? this[value + 'Msg'][this.activeDist] : [];
      this.baseStationList = activeStation ? activeStation : []
    },
    cpm(val) {
      this.showWindow = true

      if (this.showWindow) {
        this.windowMsg = val
      }
    },
    cpmout() {
      this.showWindow = false
    },
    backFun() {
      this.$router.go(-1)
    },
    toLogin() {
      this.$router.replace({ name: 'login' })
    }
  },

  mounted() {
    this.getCLineData()
    this.getFLineData()
    function setData() {
      let arr = []
      for (var i = 0; i < 24; i++) {
        arr.push((Math.random() * 2000).toFixed(2))
      }
      return arr
    }
    this.$chart.hzPie('screenPie')
    this.$chart.screenBar('screenBar')


  },
}
</script>
<style scoped>
.timeFont {
  font-family: time;
  font-size: 14px;
  color: #a8daee;
  vertical-align: sub;
}
.stitle {
  font-family: stitle;
  font-size: 44px;
  color: #f1fbf8;
  vertical-align: sub;
}
.userBtn {
  align-self: flex-end;
  padding: 5px 0;
}
.userBtn span,
.userBtn img {
  margin-left: 10px;
}
.userBtn img {
  cursor: pointer;
}
</style>

