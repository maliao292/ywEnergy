<template>
  <div class='screenConrainer'>
    <div class="screenTitle">
      <div>
        <i><img :src="clock" alt=""></i>
        <Time style="display:inline-block;width:290px" :fontName='fontName' />
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
            <span>{{jzNum.thisSave}}%</span>
            <p>本年节支</p>
          </div>
          <div class="zjrl">
            <p><img :src="co2" alt=""><span>0</span><span>吨</span></p>
            <span>装机容量</span>
          </div>
        </div>
        <div id="screenBar" class="screenBar eccon" style="width:100%;height:200px;overflow:hidden"></div>
      </div>
      <div class="screenMap">
        <div class="msgnum">
          <p>户数</p>
          <p><span>{{activeDist==='g5'?ychAllData.stationNum:0}}</span> <i>户</i> </p>
          <p>容量</p>
          <p><span>{{activeDist==='g5'?ychAllData.volume:0}}</span> <i>MW{{activeModel==='h'?'A':''}}</i> </p>
          <p>{{allText}}</p>
          <p><span>{{activeDist==='g5'?(ychAllData[activeModel+'AllLoadNum']?ychAllData[activeModel+'AllLoadNum']:0):0}}</span><i>MW</i></p>
        </div>
        <div class="mapshow">
          <img :src="map" alt="">
          <!-- <span class="mapicon fh test">
            <img :src="modelIcon">
          </span> -->
          <span class="mapicon fh" v-for="(val,key) in baseStationList" :key='key' :style="{top:val[0]+'%',left:val[1]+'%',zIndex:hoverIndex===key?30:10}" @mouseenter="cpm(val,key)" @mouseleave="cpmout(val)">
            <img :src="modelIcon">
          </span>
          <transition name="el-fade-in-linear">
            <div class="msgWindow" :class="activeModel" v-show="showWindow" :style="{top:windowMsg[0]+4.3+'%',left:windowMsg[1]-3.8+'%'}">
              <span class="artical"></span>
              <h3>{{windowMsg[2].station}}</h3>
              <ul>
                <li v-for="(item,key) in windowMsg[2].msg" :key="key">
                  <div><span>{{item.key}}</span><span>{{item.val}}</span><span>{{item.unit}}</span></div>
                </li>
              </ul>
            </div>
          </transition>

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
                <span>秒切负荷</span><i>MW</i>
              </p>
              <span>{{chhdNum.mqfh}}</span>
            </div>
            <div class="third">
              <p>
                <span>日前负荷</span><i>MW</i>
              </p>
              <span>0</span>
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
              <span>0</span>
            </div>
            <div class="half">
              <p>
                <span>容性无功</span><i>MVA</i>
              </p>
              <span>0</span>
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
import { screenMidData, screenCLine, screenFLine, screenServer, screenChhd, screenJzLine } from '@/api'
export default {
  components: { Time },
  data() {
    return {
      hoverIndex: 0,
      allText: '总发电功率',
      ychAllData: {
        cAllLoadNum: '',
        hAllLoadNum: '',
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
      jzNum: {
        thisSave: '',
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
      activeDist: 'gy',
      activeModel: 'h',
      baseStationList: [],

      yMsg: {
        g5: [],
        gy: [],
      },
      hMsg: {
        g5: [
          // [42, 47.6, { station: '义乌茂后基站', msg: [{ key: '基站负荷：', val: 8.6, unit: 'kW' }, { key: '可响应负荷：', val: 2.2, unit: 'kW' }] }],
        ],
        gy: [],
      },
      cMsg: {
        g5: [
          //   [45, 41, { station: '义乌溪干西基站', msg: [{ key: '电池状态：', val: '待机' }, { key: '电池容量：', val: 8.6, unit: 'kW' }, { key: '可响应负荷：', val: 8.6, unit: 'kW' }] }],
        ],
        gy: [],
      },
      windowMsg: [0, 0, { station: '', msg: [{ key: '', val: '' }] }],
      showWindow: false,
    };
  },
  created() {
    this.distChange(this.activeDist)
    this.modelChange(this.modelDist[1])
    this.getMiddleData()
    screenServer().then(res => {
      this.serverNum = res.data
    })
    screenChhd().then(res => {
      this.chhdNum = res.data
    })
  },

  methods: {
    async getMiddleData() { // 中间地图数据

    },
    async getFLineData() { // 负荷折线图
      let res = await screenFLine()
      let xInterVal = this.$publicMethods.getInterVal({ begin: res.data.xData[0], end: res.data.xData[1] ? res.data.xData[1] : '00:15' })
      let xArr = this.$publicMethods.getMinuteForX(xInterVal)
      this.$chart.screenLine('fh', '负荷', this.getLines([...res.data.yData,...res.data.yData2])['legendArr'], xArr, this.getLines([...res.data.yData,...res.data.yData2])['seriesArr'])
    },
    async getCLineData() {// 储能折线图
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
    async distChange(valt) { // 行业change

      this.yMsg = { g5: [], gy: [] }
      this.hMsg = { g5: [], gy: [] }
      this.cMsg = { g5: [], gy: [] }
      this.activeDist = valt

      let location = [
        { position: [48, 64], station: '江东商苑基站' },
        { position: [57, 54], station: '徐村基站' },
        { position: [51, 49], station: '环城西路基站' },
        { position: [49, 56], station: '屋基村西基站' },
        { position: [40, 39], station: '毛店桥头基站' },
        { position: [48, 38], station: '溪干西基站' },
        { position: [50, 45], station: '殿口东基站' },
        { position: [51, 41], station: '金哥集团二基站' },
        { position: [41, 52], station: '春晗三区40幢基站' },
        { position: [47, 50.6], station: '茂后基站' },

        { position: [63, 50.6], station: '义乌市欧雅化妆品有限公司' },
        { position: [41, 51.6], station: '义乌电力实业倍力健身充电桩' },
        { position: [45, 51.6], station: '电力大厦充电桩' },
        { position: [48, 51.6], station: '出租车服务区充电桩' },
        { position: [51, 51], station: '伊琳饰品' },
        { position: [56, 47], station: '华莱印刷包装科技产业园' },
        // { position: [42, 47.6], station: '义乌茂后基站' },
        // { position: [45, 41], station: '义乌溪干西基站' },
        // { position: [50, 59], station: '江东商苑站' },
        // { position: [49, 46], station: '殿口东站' }
      ]
      let userType = 2
      switch (valt) {
        case 'g5':
          userType = 2;
          break;
        case 'gy':
          userType = 5;
          break;
        default:
          userType = 2;

      }
      if(valt!=='g5'&&valt!=='gy') return
      let res = await screenMidData({ userType });
      let { c_volume, h_volume, cAllLoadNum, hAllLoadNum, stationNum } = res.data
      this.ychAllData = { cAllLoadNum, hAllLoadNum, stationNum }
      this.ychAllData.volume = this.ychAllDataContent['y_volume'] ? this.ychAllDataContent['y_volume'] : 0
      this.ychAllDataContent = { c_volume, h_volume }
      let list = res.data.list

      function getst(batteryStatus) {
        let st = '充电'
        // list[1].batteryStatus
        switch (batteryStatus) {
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
        return st
      }
      list.forEach((val) => {
        let thisStation = location.filter((sta) => {
          return sta.station === val.stationName
        })
        if (thisStation.length > 0) {
          if (this.activeDist == 'g5') {
            this.hMsg.g5.push([...thisStation[0]['position'], { station: val.stationName, msg: [{ key: '基站负荷：', val: !!val['allPower'] ? (val['allPower']).toFixed(2) : '', unit: 'kW' }, { key: '可响应负荷：', val: val['hresponsiveLoad'] ? (val['hresponsiveLoad']).toFixed(2) : '', unit: 'kW' }] }])
            this.cMsg.g5.push([...thisStation[0]['position'], { station: val.stationName, msg: [{ key: '电池状态：', val: getst(val.batteryStatus) }, { key: '电池容量：', val: (val.sourceFixPower).toFixed(2), unit: 'kW' }, { key: '可响应负荷：', val: (val.cresponsiveLoad).toFixed(2), unit: 'kW' }] }]);
          } else if (this.activeDist == 'gy') {
            this.hMsg.gy.push([...thisStation[0]['position'], { station: val.stationName, msg: [{ key: '负荷：', val: !!val['allPower'] ? (val['allPower']).toFixed(2) : '', unit: 'kW' }, { key: '可调负荷：', val: val['adjustPower'] ? (val['adjustPower']).toFixed(2) : 0, unit: 'kW' }] }])
          }

        }
      })
      let activeStation = this[this.activeModel + 'Msg'] ? this[this.activeModel + 'Msg'][valt] : [];
      this.baseStationList = activeStation ? activeStation : []
    },
    modelChange({ value, text, name, icon, allText }) { // 源 荷 储change
      this.ychAllData.volume = this.ychAllDataContent[value + '_volume'] ? this.ychAllDataContent[value + '_volume'] : 0
      this.allText = allText
      this.activeModel = value
      this.yhc = name
      this.modelIcon = icon
      let activeStation = this[value + 'Msg'] ? this[value + 'Msg'][this.activeDist] : [];
      this.baseStationList = activeStation ? activeStation : []
    },
    async getJZTJData() {
      let res = await screenJzLine()
      let { thisYear, lastYear } = res.data.chart
      this.jzNum.thisSave = res.data.thisSave
      this.$chart.screenBar('screenBar', thisYear, lastYear)
    },
    cpm(val, key) { // 鼠标移入 地图点
      this.showWindow = true
      if (this.showWindow) {
        this.windowMsg = val
        this.hoverIndex = key
      }
    },
    cpmout() {// 鼠标移出 地图点
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
    this.getJZTJData()
    function setData() {
      let arr = []
      for (var i = 0; i < 24; i++) {
        arr.push((Math.random() * 2000).toFixed(2))
      }
      return arr
    }
    this.$chart.hzPie('screenPie')


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

