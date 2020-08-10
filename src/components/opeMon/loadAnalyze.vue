<template>
  <div class="MonContent">
    <p class="monConTit" >运行监控分析 - <span class="TitactiveColor">负荷用电分析</span></p>
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
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        class="monStaSelect"
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
          <div class="monEcharts_info">
            <div class="monEcharts_infoEach" style="height: 150px;margin-top: 15px">
              <div>
                <p style="height: 40px;">基站最大负荷 <span class="specialSt1 specialSt3">5.6</span> <span class="specialUnit1">kW</span></p>
                <p style="height: 50px;">最大时刻 <span class="specialStTime">11:00</span></p>
              </div>
            </div>
            <div class="monEcharts_infoEach" style="height: 150px;">
              <div>
                <p style="height: 40px;">基站最小负荷 <span class="specialSt1">5.6</span> <span class="specialUnit1">kW</span></p>
                <p style="height: 50px;">最小时刻 <span class="specialStTime">12:00</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "loadAnalyze",
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
        chart_stationPie: {
          //图表实例
          dom: null,
          legend: ["空调用电","设备用电","照明用电"],
        },
        chart_fenshiPie: {
          //图表实例
          dom: null,
          legend: ["尖","峰","平","谷"],
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
      }
    },
    mounted() {
      this.renderChart_stationPie()
      this.renderChart_fenshiPie()

      this.renderChart_station()
    },
    methods: {

      // 基站用电饼图
      renderChart_stationPie() {
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
                  value: 335,
                  name: this.chart_stationPie.legend[0]
                },
                {value: 310, name: this.chart_stationPie.legend[1]},
                {value: 234, name: this.chart_stationPie.legend[2]},
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
      },

      // 分时用电饼图
      renderChart_fenshiPie() {
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
                  value: 335,
                  name: this.chart_fenshiPie.legend[0]
                },
                {value: 310, name: this.chart_fenshiPie.legend[1]},
                {value: 234, name: this.chart_fenshiPie.legend[2]},
                {value: 434, name: this.chart_fenshiPie.legend[3]},
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
      },

      // 基站负荷折线图
      renderChart_station(){
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
              type: 'category',
              boundaryGap: false,
              data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
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
              name: this.chart_station.legend[0],
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color : '#c5b0ff',//改变折线点的颜色
                  lineStyle:{
                    color:'#9d7bf3' //改变折线颜色
                  }
                }
              },
              areaStyle: {
                color: '#c5b0ff'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: this.chart_station.legend[1],
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color : '#ffc77a',//改变折线点的颜色
                  lineStyle:{
                    color:'#ed9c2d' //改变折线颜色
                  }
                }
              },
              areaStyle: {
                color: '#ffc77a'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: this.chart_station.legend[2],
              type: 'line',
              stack: '总量',
              itemStyle : {
                normal : {
                  color : '#b7e685',//改变折线点的颜色
                  lineStyle:{
                    color:'#6dba18' //改变折线颜色
                  }
                }
              },
              areaStyle: {
                color: '#b7e685'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: this.chart_station.legend[3],
              type: 'line',
              itemStyle : {
                normal : {
                  color : '#f97540',//改变折线点的颜色
                  lineStyle:{
                    color:'#f97540' //改变折线颜色
                  }
                }
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        })
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
