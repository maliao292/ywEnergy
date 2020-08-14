<template>
  <div class="MonContent">
    <p class="monConTit" >运行监控分析 - <span class="TitactiveColor">负荷用电分析</span></p>
    <!--下拉选框-->
    <div class="monChosen">
      <el-select v-model="stationParam.streetId" placeholder="请选择" class="monStaSelect" @change="changeStreet">
        <el-option
          v-for="item in streetOption"
          :key="item.id"
          :label="item.stationName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="stationParam.stationId" placeholder="请选择" class="monStaSelect" @change="changeStation">
        <el-option
          v-for="item in stationOption"
          :key="item.id"
          :label="item.stationName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="stationParam.queryDate"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :clearable="false"
        class="monStaSelect"
        @change="changeStation"
      >
      </el-date-picker>
    </div>
    <!--内容部分-->
    <div class="monEcharts">
      <div class="loadChartMain">
        <div class="loadChartEach">
          <p class="echartsTit">基站用电分析</p>
          <div class="pieCharts" ref="stationElecChart"></div>
        </div>
        <div class="loadChartEach">
          <p class="echartsTit">分时用电分析</p>
          <div class="pieCharts" ref="fenshiElecChart"></div>
        </div>
      </div>

      <div class="monEcharts_one">
        <p class="echartsTit">基站负荷</p>
        <div class="monEchartsMainDiv">
          <div class="monEcharts_chart" ref="stationLoadChart"></div>
          <div class="monEcharts_info" style="width: auto">
            <div class="monEcharts_infoEach" style="height: 150px;margin-top: 15px">
              <div>
                <p style="height: 40px;">基站最大负荷 <span class="specialSt1 specialSt3">{{stationLoadInfo.maxJzfh}}</span> <span class="specialUnit1">kW</span></p>
                <p style="height: 50px;">最大时刻 <span class="specialStTime">{{stationLoadInfo.maxJzfhTime}}</span></p>
              </div>
            </div>
            <div class="monEcharts_infoEach" style="height: 150px;">
              <div>
                <p style="height: 40px;">基站最小负荷 <span class="specialSt1">{{stationLoadInfo.minJzfh}}</span> <span class="specialUnit1">kW</span></p>
                <p style="height: 50px;">最小时刻 <span class="specialStTime">{{stationLoadInfo.minJzfhTime}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getStreetInfo,getStationInfo,getJzydfx,getFSydfx,getJzfh } from '@/api/operationMonitor'

  export default {
    name: "loadAnalyze",
    data() {
      return {
        streetOption: [],
        stationOption: [],
        stationParam: {
          streetId: null,
          stationId: null,
          queryDate: ''
        },
        chart_stationPie: {
          //图表实例
          dom: null,
          legend: ["空调用电","设备用电","照明用电"],
        },
        chart_fenshiPie: {
          //图表实例
          dom: null,
          // legend: ["尖","峰","平","谷"],
          legend: ["尖","峰","谷"],
        },
        chart_station: {
          //图表实例
          dom: null,
          //X轴的数据
          xAxisData: [],
          //Y轴的数据
          yAxisData1: [],
          yAxisData2: [],
          yAxisData3: [],
          yAxisData4: [],
          legend: ["空调","照明","开关电源","基站负荷"],
        },
        stationLoadInfo: {
          maxJzfh: null,
          maxJzfhTime: null,
          minJzfh: null,
          minJzfhTime: null
        }
      }
    },
    created() {
      // 获取街道信息
      getStreetInfo().then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.streetOption = res.data
          this.stationParam.streetId = res.data[0].id

          // let stationParam = {streetId: this.stationParam.streetId}
          getStationInfo(this.stationParam.streetId).then(response => {
            // console.log(response);
            this.stationOption = response.data
            this.stationParam.stationId = response.data[0].id

            this.renderChart_stationPie()
            this.renderChart_fenshiPie()
            this.renderChart_station()
          })
        } else {
          this.streetOption = []
          this.stationParam.streetId = null
          this.stationParam.stationId = null
        }
      })

      // 获取今天日期
      this.getThisTime()
    },
    mounted() {
      // this.renderChart_stationPie()
      // this.renderChart_fenshiPie()

      // this.renderChart_station()
    },
    methods: {
      // 获取当前时间
      getThisTime(){
        var _this = this;
        let yy = new Date().getFullYear();
        var mm =new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        var dd = new Date().getDate() <10 ? "0" + new Date().getDate() : new Date().getDate();

        _this.stationParam.queryDate = yy+'-'+mm+'-'+dd
      },

      // 基站用电饼图
      renderChart_stationPie() {
        getJzydfx(this.stationParam).then(res => {
          let pieData = res.data
          if(pieData == null) {
            pieData = {}
          }
          this.chart_stationPie.dom = this.$echarts.init(this.$refs.stationElecChart);
          this.chart_stationPie.dom.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              right: 30,
              top:'center',
              itemGap: 25,
              data: this.chart_stationPie.legend
            },
            color:['#c1a9fe', '#ffc071', '#59dcfc'],
            series: [
              {
                type: 'pie',
                radius: '60%',
                center: ['40%', '50%'],
                label:{            //饼图图形上的文本标签
                  normal:{
                    show:true,
                    textStyle : {
                      align:"left",
                      baseline:"middle",
                      fontWeight : 300 ,
                      fontSize : 16,    //文字的字体大小
                      padding: 5
                    },
                    formatter:'{b}\n{d}%'
                  }
                },
                data: [
                  {
                    value: pieData.airEpBfb,
                    name: this.chart_stationPie.legend[0]
                  },
                  {
                    value: pieData.powerEpBfb,
                    name: this.chart_stationPie.legend[1]
                  },
                  {
                    value: pieData.lightEpBfb,
                    name: this.chart_stationPie.legend[2]
                  },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })

        })
      },

      // 分时用电饼图
      renderChart_fenshiPie() {
        getFSydfx(this.stationParam).then(res => {
          // console.log(res);
          let fsData = res.data
          if(fsData == null) {
            fsData = {}
          }

          this.chart_fenshiPie.dom = this.$echarts.init(this.$refs.fenshiElecChart);
          this.chart_fenshiPie.dom.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              right: 30,
              top:'center',
              itemGap: 25,
              data: this.chart_fenshiPie.legend
            },
            color:['#c1a9fe', '#ffc071', '#59dcfc','#23f2af'],
            series: [
              {
                type: 'pie',
                radius: '60%',
                center: ['40%', '50%'],
                data: [
                  {
                    value: fsData.sharpBfb,
                    name: this.chart_fenshiPie.legend[0]
                  },
                  {value: fsData.offPeakBfb, name: this.chart_fenshiPie.legend[1]},
                  // {value: fsData.shoulderBfb, name: this.chart_fenshiPie.legend[2]},
                  {value: fsData.peakBfb, name: this.chart_fenshiPie.legend[2]},
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        })
      },

      timeSlot (step) {   //  step = 间隔的分钟
        var date = new Date()
        date.setHours('00')    // 时分秒设置从零点开始
        date.setSeconds('00')
        date.setUTCMinutes('00')
        // console.log(date.getHours())
        // console.log(date.getSeconds())
        // console.log(new Date(date.getTime()))

        var arr = [], timeArr = [];
        var slotNum = 24*60/step   // 算出多少个间隔
        for (var f = 0; f <= slotNum; f++) {   //  stepM * f = 24H*60M
          // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
          var time = new Date(Number(date.getTime()) + Number(step*60*1000*f))  // 获取：零点的时间 + 每次递增的时间
          var hour = '', sec = '';
          time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
          time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
          timeArr.push(hour + ':' + sec)
        }
        return timeArr
      },
      // 基站负荷折线图
      renderChart_station(){
        getJzfh(this.stationParam).then(res => {
          console.log(res);
          let stationLoadData = res.data
          this.stationLoadInfo.maxJzfh = res.data.maxJzfh
          this.stationLoadInfo.maxJzfhTime = res.data.maxJzfhTime
          this.stationLoadInfo.minJzfh = res.data.minJzfh
          this.stationLoadInfo.minJzfhTime = res.data.minJzfhTime

          this.chart_station.dom = this.$echarts.init(this.$refs.stationLoadChart);
          this.chart_station.dom.setOption({
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              }
            },
            legend: {
              // icon: 'rect',
              itemWidth: 20,
              itemHeight: 10,
              itemGap: 25,
              data:[  {name:this.chart_station.legend[0],icon:'rect'},
                {name:this.chart_station.legend[1],icon:'rect'},
                {name:this.chart_station.legend[2],icon:'rect'},
                {name:this.chart_station.legend[3],}],//分别修改legend格式
              // data: this.chart_station.legend
            },
            grid: {
              left: "1%",
              right: "1%",
              top: "20%",
              bottom: "1%",
              containLabel: true
            },
            xAxis: [
              {
                axisLabel: {
                  show: true,
                  interval:3
                },
                data: this.timeSlot(15),
                boundaryGap: false,
                type: 'category',
                // data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
              }
            ],
            yAxis: [
              {
                name: "kW",
                nameTextStyle :{
                  fontSize: 14
                },
                itemStyle: {
                  normal: {
                    color: "#52a4f6",
                  }
                },
                splitNumber : 2,
              }
            ],
            series: [
              {
                symbol: "none",
                name: this.chart_station.legend[0],
                type: 'line',
                stack: '总量',
                itemStyle : {
                  normal : {
                    color : '#a5b8ff',//改变折线点的颜色
                    lineStyle:{
                      color:'#a5b8ff', //改变折线颜色
                      width:0
                    }
                  }
                },
                areaStyle: {
                  color: '#a5b8ff'
                },
                data: stationLoadData.ydataA
              },
              {
                symbol: "none",
                name: this.chart_station.legend[1],
                type: 'line',
                stack: '总量',
                itemStyle : {
                  normal : {
                    color : '#fffd7a',//改变折线点的颜色
                    lineStyle:{
                      color:'#fffd7a', //改变折线颜色
                      width:0
                    }
                  }
                },
                areaStyle: {
                  color: '#fffd7a'
                },
                data: stationLoadData.ydataB
              },
              {
                symbol: "none",
                name: this.chart_station.legend[2],
                type: 'line',
                stack: '总量',
                itemStyle : {
                  normal : {
                    color : '#7dd656',//改变折线点的颜色
                    lineStyle:{
                      color:'#7dd656' //改变折线颜色
                    }
                  }
                },
                areaStyle: {
                  color: '#7dd656'
                },
                data: stationLoadData.ydataC
              },
              {
                name: this.chart_station.legend[3],
                type: 'line',
                itemStyle : {
                  normal : {
                    color : '#f97540',//改变折线点的颜色
                    lineStyle:{
                      color:'#f97540', //改变折线颜色
                      width:2,
                    }
                  }
                },
                data: stationLoadData.ydataD
              }
            ]
          })
        })

      },

      // 改变街道
      changeStreet() {
        this.stationOption = []
        getStationInfo(this.stationParam.streetId).then(response => {
          console.log(response);
          this.stationOption = response.data
          this.stationParam.stationId = response.data[0].id

          this.getDccfdImfo()
          this.getWdktImfo()
        })
      },
      // 基站下拉框改变
      changeStation() {
        this.renderChart_stationPie()
        this.renderChart_fenshiPie()
        this.renderChart_station()
      }
    }
  }
</script>

<style scoped>
  .monStaSelect>>>.el-input__inner{
    border: none;
    box-shadow: 2px 2px 10px 2px rgba(2, 27, 50, 0.1);
  }
  .monEcharts_info{
    min-width: 290px;
  }
  .monEcharts_info>>>.monEcharts_infoEach{
    min-width: 290px;
    width: auto;
  }
</style>
