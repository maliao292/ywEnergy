<template>
  <div class="ifmContent">
    <div class="dtyc_data bg_fff">
      <div class="searchText">
        <span>需求侧响应动态预测</span>
        <div class="fr">
          <el-button type="primary" :disabled="topData.xysy<0" @click="showList=!showList">立即生成指标</el-button>
        </div>
      </div>
      <div class="datashow">
        <div>
          <p>本月需量</p>
          <b style="color:#1e8ae4">{{topData.byxl}}</b><span>kW</span>
        </div>
        <div>
          <p>今日预测最高负荷</p>
          <b style="color:#ea3939">{{topData.jryczgfh}}</b><span>kW</span>
        </div>
        <div>
          <p>预测响应需求</p>
          <b style="color:#1e8ae4">{{topData.ycxyxq}}</b><span>kW</span>
        </div>
        <div>
          <p>当前可响应负荷</p>
          <b style="color:#ea3939">{{topData.dqkxyfh}}</b><span>kW</span>
        </div>
        <div>
          <p>响应收益</p>
          <b style="color:#ec6c29">{{topData.xysy}}</b><span>元</span>
        </div>
      </div>
    </div>

    <div class="dtyc_fhyc bg_fff">
      <div class="sssj_s">
        <b>当前预测负荷 {{presentData.ycData}}&nbsp; &nbsp;&nbsp;当前实测负荷 {{presentData.dqData}}</b>
      </div>
      <div class="dtyc_line" id="main"></div>
    </div>

    <div class="alertWindow yctList" v-if="showList">
      <div class="container">
        <addNew @close='closeAl' :detailObj='detailObj'/>
      </div>
    </div>
  </div>
</template>

<script>
import addNew from './Add'
import { forecastListData as list } from '@/api'
export default {
  data() {
    return {
      showList: false,
      presentData:{
        dqData:0,
        ycData:0
      },
      detailObj:{},
      topData: {
        byxl: 0,
        jryczgfh: 0,
        ycxyxq: 0,
        dqkxyfh: 0,
        xysy: 0
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await list()
      let { BYXL, YCZDFH, YCXYXQ, KXYFH, XYSY, SSFHXQ, YCFHXQ ,CREATE} = res
      this.topData = {
        byxl: BYXL,
        jryczgfh: YCZDFH,
        ycxyxq: YCXYXQ,
        dqkxyfh: KXYFH,
        xysy: XYSY
      }

      this.line(SSFHXQ, YCFHXQ, BYXL)

     this.detailObj = CREATE
    },
    closeAl() {
      this.showList = false
    },
    line(ssData, ycArr, BYXL) {
      let fd_xdata = []
      let todayArr = []
      let yesterdayArr = []
      let MDListArr = []

      let n = 0
      while (n < 288) {
        MDListArr.push(BYXL)
        let hh =
          Math.floor(n / 12) > 9 ? Math.floor(n / 12) : '0' + Math.floor(n / 12)
        let mm = (n % 12) * 5 > 9 ? (n % 12) * 5 : '0' + (n % 12) * 5
        fd_xdata.push(hh + ':' + mm)
        n++
      }
      ssData.forEach(res => {
        todayArr.push(res.VALUE)
      })
      ycArr.forEach(res => {
        yesterdayArr.push(res.VALUE)
      })
      this.presentData.dqData = todayArr[todayArr.length-1]
      this.presentData.ycData = yesterdayArr[todayArr.length-1]

      /* 充放电曲线 */
      var fd_seriesArrData = [
        {
          name: '实时负荷',
          arr: todayArr
        },
        {
          name: '预测负荷',
          arr: yesterdayArr
        },
        {
          name: '本月MD',
          arr: MDListArr,
          lineStyle: {
            type: 'dashed'
          }
        }
      ]

      this.$chart.setLine('main', fd_xdata, fd_seriesArrData, function(
        myChart,
        option
      ) {
        option.grid = {
          top: 150,
          bottom: 30,
          left: '3%',
          right: '2%'
        }
        option.yAxis[0].name = '单位：kW'
        // option.legend.formatter = function(name) {
        //   return name + '2019-02-11 20 kW'
        // }
        myChart.setOption(option)
      })
    }
  },
  components: {
    addNew
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchText {
  border: none;
}
.ifmContent {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.dtyc_fhyc {
  display: flex;
}
.dtyc_line {
  width: 100%;
  height: 100%;
}
</style>
