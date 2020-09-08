<template>
    <div class="MonContent">
      <p class="monConTit" >运行监控分析 - <span class="TitactiveColor">电池与空调监控</span></p>
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
        <!--1-->
        <div class="monEcharts_one">
          <p class="echartsTit">电池电压与功率</p>
          <div class="monEchartsMainDiv">
            <div class="monEcharts_chart" id="chargeDischarge" ref="chargeDischargeChart"></div>
            <div class="monEcharts_info">
              <div class="monEcharts_infoEach">
                <div>当日削峰电量 <span class="specialSt1">{{dccfd.xfdl}}</span> <span class="specialUnit1">kWh</span></div>
              </div>
              <div class="monEcharts_infoEach">
                <div>当日填谷电量 <span class="specialSt1">{{dccfd.tgdl}}</span> <span class="specialUnit1">kWh</span></div>
              </div>
              <div class="monEcharts_infoEach">
                <div>充放电比 <span class="specialSt1 specialSt2">{{dccfd.cfdb}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <!--2-->
        <div class="monEcharts_one">
          <p class="echartsTit">温度与空调功率</p>
          <div class="monEchartsMainDiv">
            <div class="monEcharts_chart" id="tepAndAir" ref="airChart"></div>
            <div class="monEcharts_info">
              <div class="monEcharts_infoEach monEcharts_infoEachDou">
                <div>
                  <p class="doubleLineHei">当日室内最高温度 <span class="specialSt1 specialSt4">{{wdykt.snMaxTemp}} ℃</span></p>
                  <p class="doubleLineHei">最高时刻 <span class="specialStTime">{{wdykt.snMaxTempTime}}</span></p>
                </div>
              </div>
              <div class="monEcharts_infoEach">
                <div>
                  <p class="doubleLineHei">当日室外最高温度 <span class="specialSt1 specialSt3">{{wdykt.swMaxTemp}} ℃</span></p>
                  <p class="doubleLineHei">最高时刻 <span class="specialStTime">{{wdykt.swMaxTempTime}}</span></p>
                </div>
              </div>
              <div class="monEcharts_infoEach">
                <div>空调用电 <span class="specialSt1">{{wdykt.kkyd}}</span> <span class="specialUnit1">kWh</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import { getStreetInfo,getStationInfo, getDccfd ,getWdkt } from '@/api/operationMonitor'

    export default {
      name: "cellAndAir",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '选项1'
          }],
          streetOption: [],
          stationOption: [],
          stationParam: {
            streetId: null,
            stationId: null,
            queryDate: ''
          },
          dccfd: { // 充放电
            xfdl: null,
            tgdl: null,
            cfdb: null
          },
          wdykt: { // 温度与空调
            snMaxTemp: null,
            snMaxTempTime: null,
            swMaxTemp: null,
            swMaxTempTime: null,
            kkyd: null
          },
          chart_line1: {
            //图表实例
            dom: null,
            //X轴的数据
            xAxisData: [],
            //Y轴的数据
            yAxisData_charge: [],
            yAxisData_discharge: [],
            legend: ["充电功率","放电功率",'蓄电池电压'],
          },
          chart_line2: {
            //图表实例
            dom: null,
            //X轴的数据
            xAxisData: [],
            //Y轴的数据
            yAxisData_outTem: [],
            yAxisData_inTem: [],
            yAxisData_air: [],
            legend: ["室外温度","室内温度","空调功率"],
          },
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
              this.stationOption = response.data
              this.stationParam.stationId = response.data[0].id

              this.getDccfdImfo()
              this.getWdktImfo()
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
        // this.renderChart_line1()
        // this.renderChart_line2()
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
        /**
         * 初始化图表
         */
        renderChart_line1() {
          this.chart_line1.xAxisData = [];
          this.chart_line1.yAxisData1 = [];
          this.chart_line1.yAxisData2 = [];
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

        // 获取电流充放电功率
        getDccfdImfo(){
          // console.log(this.stationParam);

          getDccfd(this.stationParam).then(res => {
            // console.log(this.timeSlot(15));
            // console.log(res);
            this.dccfd.xfdl = res.data.xfdl
            this.dccfd.tgdl = res.data.tgdl
            this.dccfd.cfdb = res.data.cfdb

            this.chart_line1.xAxisData = res.data.xdata
            this.chart_line1.yAxisData1 = res.data.ydataA;
            this.chart_line1.yAxisData2 = res.data.ydataB;
            this.chart_line1.yAxisData3 = res.data.ydataC;

            this.chart_line1.dom = this.$echarts.init(this.$refs.chargeDischargeChart);
            this.chart_line1.dom.setOption({
              title: {},
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: "1%",
                right: "1%",
                top: "20%",
                bottom: "1%",
                containLabel: true
              },
              legend: {
                show: true,
                icon: "rect",
                itemWidth:20,
                itemHeight:3,
                x: 'center',
                top: '10',
                textStyle: { //图例文字的样式
                  color: '#666666',
                  fontSize: 14
                },
                data: this.chart_line1.legend
              },
              xAxis: {
                axisLabel: {
                  show: true,
                  interval:11
                },
                data: this.timeSlot(5),
                boundaryGap: false,
              },
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
                  splitNumber : 3,
                },
                {
                  name: "V",
                  min:47,
                  max:57,
                  splitLine:{show:false},
                  nameTextStyle :{
                    fontSize: 14
                  },
                  interval: 2
                  // splitNumber : 5,
                }
              ],
              series: [
                {
                  symbol: "none",
                  name: this.chart_line1.legend[0],
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#11d69c",
                      lineStyle: {
                        color: "#11d69c" // 改变折线颜色
                      }
                    }
                  },
                  data:  this.chart_line1.yAxisData1
                },
                {
                  symbol: "none",
                  name: this.chart_line1.legend[1],
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#569bf0",
                      lineStyle: {
                        color: "#569bf0" // 改变折线颜色
                      }
                    }
                  },
                  data:  this.chart_line1.yAxisData2
                },
                {
                  symbol: "none",
                  name: this.chart_line1.legend[2],
                  type: "line",
                  smooth: true,
                  yAxisIndex: 1,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#fc9c1b",
                      lineStyle: {
                        color: "#fc9c1b" // 改变折线颜色
                      }
                    }
                  },
                  data:  this.chart_line1.yAxisData3
                }
              ]
            });
          })

        },

        // 获取温度与空调
        getWdktImfo() {
          getWdkt(this.stationParam).then(res => {
            this.wdykt = res.data
            this.chart_line2.xAxisData = res.data.xdata
            this.chart_line2.yAxisData1 = res.data.ydataB;
            this.chart_line2.yAxisData2 = res.data.ydataA;
            this.chart_line2.yAxisData3 = res.data.ydataC;

            this.chart_line2.dom = this.$echarts.init(this.$refs.airChart);
            this.chart_line2.dom.setOption({
              title: {},
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: "1%",
                right: "1%",
                top: "20%",
                bottom: "1%",
                containLabel: true
              },
              legend: {
                show: true,
                icon: "rect",
                itemWidth:20,
                itemHeight:3,
                x: 'center',
                top: '10',
                textStyle: { //图例文字的样式
                  color: '#666666',
                  fontSize: 14
                },
                data: this.chart_line2.legend
              },
              xAxis: {
                axisLabel: {
                  show: true,
                  interval:11
                },
                data: this.timeSlot(5),
                boundaryGap: false,
              },
              yAxis: [
                {
                  name: "kW",
                  nameTextStyle :{
                    fontSize: 14
                  },
                  min:0,
                  max:5,
                  itemStyle: {
                    normal: {
                      color: "#52a4f6",
                    }
                  },
                  // splitNumber : 3,
                },
                {
                  name: "℃",
                  min:0,
                  max:50,
                  splitLine:{show:false},
                  nameTextStyle :{
                    fontSize: 14
                  },
                  // splitNumber : 3,
                }
              ],
              series: [
                {
                  symbol: "none",
                  name: this.chart_line2.legend[0],
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#fc9c1b",
                      lineStyle: {
                        color: "#fc9c1b" // 改变折线颜色
                      }
                    }
                  },
                  yAxisIndex: 1,
                  data: this.chart_line2.yAxisData1
                },
                {
                  symbol: "none",
                  name: this.chart_line2.legend[1],
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#916bfa",
                      lineStyle: {
                        color: "#916bfa" // 改变折线颜色
                      }
                    }
                  },
                  yAxisIndex: 1,
                  data: this.chart_line2.yAxisData2
                },
                {
                  symbol: "none",
                  name: this.chart_line2.legend[2],
                  type: "line",
                  smooth: true,
                  lineStyle: {
                    normal: {
                      width: 2
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#569bf0",
                      lineStyle: {
                        color: "#569bf0" // 改变折线颜色
                      }
                    }
                  },
                  data: this.chart_line2.yAxisData3
                }
              ]
            });
          })
        },


        // renderChart_line2() {
        //   // this.chart_line.xAxisData = [];
        //   this.chart_line2.yAxisData = [];
        //
        // },

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
          this.getDccfdImfo()
          this.getWdktImfo()
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
    min-width: 310px;
  }
  .monEcharts_info>>>.monEcharts_infoEach{
    min-width: 310px;
    width: auto;
  }
</style>
