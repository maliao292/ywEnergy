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
          <p>960.32</p>
          <i>kW</i>
        </div>
        <div>
          <div class="numtop">基本概况</div>
          <div class="numCon">
            <p><span>合同容量</span><b>1030</b><i>kVA</i></p>
            <p><span>监测分路个数</span><b>29</b><i>个</i></p>
          </div>
        </div>
        <div>
          <div class="numtop">电量概况</div>
          <div class="numCon">
            <p><span>本月累计电量</span><b>1030</b><i>万kWh</i></p>
            <p><span>上月总电量</span><b>29</b><i>万kWh</i></p>
          </div>
        </div>
        <div>
          <div class="numtop">负荷概况</div>
          <div class="numCon">
            <p><span>本月最大负荷</span><b>1030</b><i>kW</i></p>
            <p><span>本年最大负荷</span><b>29</b><i>kW</i></p>
          </div>
        </div>
      </div>
      <div class="chartsCon">
        <div class="gyChart gyLine" id="gyLine" style="width:100%;height:200px"></div>
        <div class="chatsStatistics">
          <div class="ys">
            <b>昨日最大负荷：</b>
            <p><span>900</span><i>kW</i></p>
            <p>09-25 17:00</p>
          </div>
          <div class="td ">
            <b>今日最大负荷：</b>
            <p><span>900</span><i>kW</i></p>
            <p>09-25 17:00</p>
          </div>
        </div>
      </div>
      <div class="chartsCon">
        <div class="gyChart gyBar" id="gyBar" style="width:100%;height:200px"></div>
        <div class="chatsStatistics">
          <div class="ys">
            <b>本月累计电量：</b>
            <p><span>900</span><i>kW</i></p>
            <p>截止至2019-09-25 同时段累计对比</p>
            <div class="scro up">
              <span class="iconfont icon-icon-shuzhishangsheng"></span>
              <span class="iconfont icon-shuzhixiajiang"></span>
              6%
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { stationDetailApi, mapLineData, controlerPort, controlQx, controlPassData } from '@/api'
import echarts from 'echarts'
export default {
  props: {
    stationDetail: {},
  },
  data() {
    return {
      jzImg: require('@/assets/img/jz.png'),
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
    // let xInterVal = this.$publicMethods.getInterVal()
    let xArr = this.$publicMethods.getMinuteForX()
    // screenLine(id, title, legendArr, xArr, seriesArr)
    // let xArr = [1, 2, 3]
    let series = [
      {
        name: 'a',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'b',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]


    this.$chart.homeLine('gyLine', '日负荷曲线', ['a', 'b'], xArr, series, (option, myChart) => {
      myChart.setOption(option);
    })
    let series2 = [
      {
        name: 'a',
        type: 'bar',
        barWidth: 10,
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'b',
        type: 'bar',
        barWidth: 10,
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
    let arr2 = []
    this.$publicMethods.getMonthNum(2020,11,arr2)
    this.$chart.homeBar('gyBar', '月用电量柱图', ['a', 'b'], arr2, series2, (option, myChart) => {
      myChart.setOption(option);
    })
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
.up{
  color: #f00;
}
.down{
  color: #0f0;
}
.scro{
  font-size: 22px;
}
.scro span{
  font-size: 24px;
}
</style>
