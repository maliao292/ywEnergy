<template>
  <div class="">
    <div class="listHead">
      <span>
        <img :src="jzImg" alt="">
        <slot></slot>
      </span>
      <i class="fr el-icon-close" @click="changAl('ruleForm')"></i>
    </div>
    <div class="alcon">
      <div class="gyshownum">
        <div>
          <span>可响应负荷</span>
          <p>{{stationDetail.adjustPower?stationDetail.adjustPower:0}}</p>
          <i>kW</i>
        </div>
        <div>
          <div class="numtop">基本概况</div>
          <div class="numCon">
            <p><span>合同容量</span><b>{{stationDetail.volume}}</b><i>kVA</i></p>
            <p><span>监测分路个数</span><b>{{dataSratistics.monitorNum}}</b><i>个</i></p>
          </div>
        </div>
        <div>
          <div class="numtop">电量概况</div>
          <div class="numCon">
            <p><span>本月累计电量</span><b>{{Number(dataSratistics.thisMonthEle).toFixed(2)}}</b><i>万kWh</i></p>
            <p><span>上月总电量</span><b>{{dataSratistics.lastMonthEle}}</b><i>万kWh</i></p>
          </div>
        </div>
        <div>
          <div class="numtop">负荷概况</div>
          <div class="numCon">
            <p><span>本月最大负荷</span><b>{{dataSratistics.thisMonthMaxPower}}</b><i>kW</i></p>
            <p><span>本年最大负荷</span><b>{{dataSratistics.thisYearMaxPower}}</b><i>kW</i></p>
          </div>
        </div>
      </div>
      <div class="chartsCon">
        <div class="gyChart gyLine" id="gyLine" style="width:100%;height:200px"></div>
        <div class="chatsStatistics">
          <div class="ys">
            <b>昨日最大负荷：</b>
            <p><span>{{lineData.yesterdayMax}}</span><i>kW</i></p>
            <p>{{lineData.yesterdayMaxTime}}</p>
          </div>
          <div class="td ">
            <b>今日最大负荷：</b>
            <p><span>{{lineData.todayMax}}</span><i>kW</i></p>
            <p>{{lineData.todayMaxTime}}</p>
          </div>
        </div>
      </div>
      <div class="chartsCon">
        <div class="gyChart gyBar" id="gyBar" style="width:100%;height:200px"></div>
        <div class="chatsStatistics">
          <div class="ys">
            <b>本月累计电量：</b>
            <p><span>{{Number(barData.thisMonthSum).toFixed(2)}}</span><i>万kWh</i></p>
            <p>截止至{{barData.deadLineDate}} 同时段累计对比</p>
            <div class="scro up" :class="{'up':barData.hb>0,'down':barData.hb<0}">
              <span v-if="barData.hb>0" class="iconfont icon-icon-shuzhishangsheng"></span>
              <span v-if="barData.hb<0" class="iconfont icon-shuzhixiajiang"></span>
              {{barData.hb*100}}%
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { gyTopApi, gyLineApi, gyBarApi } from '@/api'
import echarts from 'echarts'
export default {
  props: {
    stationDetail: {},
  },
  data() {
    return {
      jzImg: require('@/assets/img/jz.png'),
      dataSratistics: {
        lastMonthEle: '',
        monitorNum: '',
        thisMonthEle: '',
        thisMonthMaxPower: '',
        thisYearMaxPower: '',
      },
      lineData: {
        todayMax: '',
        todayMaxTime: '',
        yesterdayMax: '',
        yesterdayMaxTime: '',
      },
      barData: {
        deadLineDate: '',
        hb: 0,
        thisMonthSum: '',
      }
    }
  },
  created() {

  },
  computed: {


  },
  methods: {

    changAl(formName) {
      this.$emit('close', false)
    },
    //处理默认选中当前日期
    getNowTime() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      // var hour = " 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}`;
      return defaultDate;
    }
  },
  mounted() {
    // 头部数据
    gyTopApi({ stationId: this.stationDetail.id }).then((res) => {
      this.dataSratistics = res.data
    }).catch((err) => {
      console.log('服务错误')
    });
    // 折线
    gyLineApi({ stationId: this.stationDetail.id }).then((res) => {

      this.lineData = {
        todayMax: res.data.todayMax,
        todayMaxTime: res.data.todayMaxTime,
        yesterdayMax: res.data.yesterdayMax,
        yesterdayMaxTime: res.data.yesterdayMaxTime,
      }

      let chart = res.data.chart
      let series = [
        {
          name: '今天',
          type: 'line',
          data: chart.yaxis
        },
        {
          name: '昨天',
          type: 'line',
          data: chart.yaxis1
        }
      ]
      this.$chart.homeLine('gyLine', '日负荷曲线', ['今天', '昨天'], chart.xaxis, series, (option, myChart) => {
        myChart.setOption(option);
      })
    }).catch((err) => {
      console.log('zhexian服务错误')
    });


    // 柱状图
    gyBarApi({ stationId: this.stationDetail.id }).then((res) => {
      this.barData = {
        deadLineDate: res.data.deadLineDate,
        hb: res.data.hb,
        thisMonthSum: res.data.thisMonthSum,
      }
      let chart = res.data.chart
      console.log(chart)

      let series2 = [
        {
          name: '本月',
          type: 'bar',
          barWidth: 10,
          data: chart.yaxis
        },
        {
          name: '上月',
          type: 'bar',
          barWidth: 10,
          data: chart.yaxis1
        }
      ]

      this.$chart.homeBar('gyBar', '月用电量柱图', ['本月', '上月'], chart.xaxis, series2, (option, myChart) => {
        myChart.setOption(option);
      })

    }).catch((err) => {
      console.log('zhexian服务错误')
    });





  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('//at.alicdn.com/t/font_1981957_xolb4kqymy.css');
.stationshow {
  width: 1350px;
}
.yctListCon {
  height: 100%;
}
.listHead {
  height: 65px;
}
.listHead,
.alcon {
  flex-shrink: 0;
}
.alcon {
  height: calc(100% - 65px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.stationLine {
  height: 100%;
  flex-shrink: 1;
}
.stationLine #stationLine {
  height: 100%;
}
.up {
  color: #f00;
}
.down {
  color: #0f0;
}
.scro {
  font-size: 22px;
}
.scro span {
  font-size: 24px;
}
</style>
