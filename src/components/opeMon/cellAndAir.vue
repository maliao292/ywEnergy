<template>
    <div class="MonContent">
      <p class="monConTit" >运行监控分析 - <span class="TitactiveColor">电池与空调监控</span></p>
      <!--下拉选框-->
      <div class="monChosen">
        <el-select v-model="stationParam.value1" placeholder="请选择" class="monStaSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="stationParam.value2" placeholder="请选择" class="monStaSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="stationParam.value3"
          type="date"
          placeholder="选择日期"
          class="monStaSelect"
        >
        </el-date-picker>
      </div>
      <!--内容部分-->
      <div class="monEcharts">
        <!--1-->
        <div class="monEcharts_one">
          <p class="echartsTit">电流充放电功率</p>
          <div class="monEchartsMainDiv">
            <div class="monEcharts_chart" id="chargeDischarge" ref="chargeDischargeChart"></div>
            <div class="monEcharts_info">
              <div class="monEcharts_infoEach">
                <div>当日削峰电量 <span class="specialSt1">5.6</span> <span class="specialUnit1">kWh</span></div>
              </div>
              <div class="monEcharts_infoEach">
                <div>当日填谷电量 <span class="specialSt1">6.2</span> <span class="specialUnit1">kWh</span></div>
              </div>
              <div class="monEcharts_infoEach">
                <div>充放电比 <span class="specialSt1 specialSt2">88.5%</span></div>
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
                  <p style="height: 40px;">当日室内最高温度 <span class="specialSt1 specialSt3">32 ℃</span></p>
                  <p style="height: 50px;">最高时刻 <span class="specialStTime">11:00</span></p>
                </div>
              </div>
              <div class="monEcharts_infoEach">
                <div>
                  <p style="height: 40px;">当日室外最高温度 <span class="specialSt1 specialSt4">36 ℃</span></p>
                  <p style="height: 50px;">最高时刻 <span class="specialStTime">12:00</span></p>
                </div>
              </div>
              <div class="monEcharts_infoEach">
                <div>空调用电 <span class="specialSt1">1.9</span> <span class="specialUnit1">kWh</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
      name: "cellAndAir",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '选项1'
          }],
          stationParam: {
            value1: '',
            value2: '',
            value3: ''
          },
          chart_line1: {
            //图表实例
            dom: null,
            //X轴的数据
            xAxisData: [],
            //Y轴的数据
            yAxisData_charge: [],
            yAxisData_discharge: [],
            legend: ["充电功率","放电功率"],
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
      mounted() {
        this.renderChart_line1()
        this.renderChart_line2()
      },
      methods: {
        /**
         * 初始化图表
         */
        renderChart_line1() {
          // this.chart_line.xAxisData = [];
          this.chart_line1.yAxisData = [];

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
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
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
                splitNumber : 2,
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
                data: [10,20,6,30,5]
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
                data: [5,50,63,13,54]
              }
            ]
          });
        },

        renderChart_line2() {
          // this.chart_line.xAxisData = [];
          this.chart_line2.yAxisData = [];

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
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
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
                splitNumber : 2,
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
                data: [10,20,6,30,5]
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
                data: [5,50,63,13,54]
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
                data: [5,50,63,13,54,12,32,23]
              }
            ]
          });
        },
      }
    }
</script>

<style scoped>
  .monStaSelect>>>.el-input__inner{
    border: none;
    box-shadow: 2px 2px 10px 2px rgba(2, 27, 50, 0.1);
  }
</style>
