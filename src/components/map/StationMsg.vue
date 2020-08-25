<template>
  <div class="yctListCon">
    <div class="listHead">
      <span>
        <img :src="jzImg" alt="">
        <slot></slot>
      </span>
      <i class="fr el-icon-close" @click="changAl('ruleForm')"></i>
    </div>
    <div class="alcon">
      <div class="stationData">
        <div class="stationProgress">
          <div class="gradientCon" style="padding: 10px 20px">
            <div class="outTop residuele"><span>剩余电量：</span><span>-%</span></div>
            <img :src="dc" alt="">
            <div class="outBottom">电池</div>
          </div>
          <div class="eledirection">
            <div class="outTop cft"><span>{{(stationNum.chargePower + stationNum.disChargePower).toFixed(2)}}</span>kW</div>
            <img v-if="stationDetail.batteryStatus != 2" class="cenarrow" :src="stationNum.batteryStatus==0?arrowl:arrowr" alt="">
            <!-- batteryStatus：0 -->
            <div class="outBottom cfd">{{stationDetail.batteryStatus | statusFilter}}</div>
          </div>
          <div class="gradientCon">
            <div class="outTop cft"><span>{{(stationNum.allPower).toFixed(2)}}</span>kW</div>
            <div class="fh_s ">
              <b><img :src="kg" alt=""></b><span>{{stationNum.sourcePower}} <b>kW</b> </span>
            </div>
            <div class="fh_s ">
              <b><img :src="kt" alt=""></b><span>{{stationNum.airPower}} <b>kW</b> </span>
            </div>
            <div class="fh_s ">
              <b><img :src="zm" alt=""></b><span>{{stationNum.lightPower}} <b>kW</b> </span>
            </div>
            <div class="outBottom">负荷</div>
          </div>
          <div class="eledirection">
            <div class="outTop cft"><span>{{(stationNum.allPower+stationNum.chargePower).toFixed(2)}}</span>kW</div>
            <img class="cenarrow" :src="arrowl" alt="">
          </div>
          <div class="gradientCon">
            <div class="outTop"></div>
            <img :src="dw" alt="">
            <div class="outBottom">电网</div>
          </div>
        </div>
        <div class="stationNum">
          <div class="dcmsg stationTopL">
            <div class="stationConstrol">
              <span>电池状态：</span>
              <!-- batteryStatus -->
              <img :src="dcimg" alt="">
              <div class="stationBtn">
                <div>
                  <span @click="changedc('dcc')" :class="['dcbtn',{active:dcBtn==='dcc'}]">充电</span>
                  <span @click="changedc('dcf')" :class="['dcbtn',{active:dcBtn==='dcf'}]">放电</span>
                  <span @click="changedc('dcd')" :class="['dcbtn',{active:dcBtn==='dcd'}]">待机</span>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <span>本月总削峰电量：</span><b>{{stationNum.disChargeNum}}</b><span>kWh</span>
              </li>
              <li>
                <span>本月总填谷电量：</span><b>{{stationNum.chargeNum}}</b><span>kWh</span>
              </li>
              <li>
                <span>本月总节省电费：</span><b>{{stationNum.saveNum}}</b><span>元</span>
              </li>
            </ul>
            <div class="strategy_s">
              <div><span>电池充放电策略：</span><b><i class="el-icon-edit"></i>修改策略</b></div>
              <div>
                <span>
                  19:00-22:00
                  <br>
                  充电
                </span>
                <span>
                  22:00-01:00
                  <br>
                  放电
                </span>
              </div>
            </div>
          </div>
          <div class="ktmsg stationTopL">
            <div class="stationConstrol">
              <span>空调状态：</span>
              <!-- airStatus 0停止 1开启-->
              <img :src="ktimg" alt="">
              <div class="stationBtn">
                <div>
                  <span @click="changekt('ktt')" :class="['ktbtn',{active:ktBtn==='ktt'}]">停止</span>
                  <span @click="changekt('ktk')" :class="['ktbtn',{active:ktBtn==='ktk'}]">开启</span>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <span>室内温度：</span><b>{{stationNum.temperature}}℃</b><span></span>
              </li>
              <li>
                <span>室外温度：</span><b>{{stationNum.outerTemperature}}℃</b><span></span>
              </li>
              <li>
                <span>可响应负荷：</span><b style="color:#4c8aeb">{{stationNum.responsiveLoad}}</b><span>kW</span>
              </li>
            </ul>
            <div class="strategy_s">
              <div><span>空调运行策略：</span><b><i class="el-icon-edit"></i>修改策略</b></div>
              <div>
                <span>
                  35℃
                  <br>
                  开启温度
                </span>
                <span>
                  28℃
                  <br>
                  停止温度
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="stationLine">
        <div id="stationLine"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { stationDetailApi, mapLineData, controlerPort } from '@/api'
import echarts from 'echarts'
export default {
  props: {
    stationDetail: {},
  },
  data() {
    return {
      jzImg: require('@/assets/img/jz.png'),
      dc: require('@/assets/img/aldc.png'),
      kg: require('@/assets/img/alkg.png'),
      kt: require('@/assets/img/alkt.png'),
      zm: require('@/assets/img/alzm.png'),
      dw: require('@/assets/img/aldw.png'),
      arrowl: require('@/assets/img/arrowl.png'),
      arrowr: require('@/assets/img/arrowr.png'),
      stationBtnStatus: {
        dcc: require('@/assets/img/alcd.png'),
        dcd: require('@/assets/img/aldj.png'),
        dcf: require('@/assets/img/alfd.png'),
        ktt: require('@/assets/img/altz.png'),
        ktk: require('@/assets/img/alkq.png'),
      },
      dcBtn: 'dcc',
      ktBtn: 'ktt',
      dcimg: require('@/assets/img/alcd.png'),
      ktimg: require('@/assets/img/altz.png'),
      stationNum: {},
    }
  },
  created() {
    // 筛选站点数据，倒霉后台把所有基站数据全部拿给前端，真TM懒



    if (this.stationDetail.batteryStatus == 0) {
      this.dcBtn = 'dcc';
      this.dcimg = require('@/assets/img/alcd.png');
    } else if (this.stationDetail.batteryStatus == 1) {
      this.dcBtn = 'dcf';
      this.dcimg = require('@/assets/img/alfd.png');
    } if (this.stationDetail.batteryStatus == 2) {
      this.dcBtn = 'dcd';
      this.dcimg = require('@/assets/img/aldj.png');
    }

    if (this.stationDetail.airStatus == 0) {
      this.ktBtn = 'ktt';
      this.ktimg = require('@/assets/img/altz.png');
    } else {
      {
        this.ktBtn = 'ktk';
        this.ktimg = require('@/assets/img/alkq.png');
      }
    }
    let obj = {}
    let { batteryStatus, chargePower, disChargePower, allPower, sourcePower, airPower, lightPower, temperature, outerTemperature, responsiveLoad } = this.stationDetail
    this.stationNum = { batteryStatus, chargePower, disChargePower, allPower, sourcePower, airPower, lightPower, temperature, outerTemperature, responsiveLoad }
    stationDetailApi({ stationId: this.stationDetail.id }).then((res) => {
      let { responsiveLoad, disChargeNum, chargeNum, saveNum } = res.data
      obj = { responsiveLoad, disChargeNum, chargeNum, saveNum }
      this.stationNum = { ...this.stationNum, ...obj }
    })
    //temperature outerTemperature responsiveLoad

  },
  methods: {
    changedc(sta) { // 电池控制器
      if (sta === this.dcBtn||sta === 'dcd') return
      let st = '充电'
      let isOpen = 1;
      switch (sta) {
        case 'dcc':
          st = '充电'
          isOpen = 1
          break
        case 'dcf':
          st = '放电'
          isOpen = 0
          break
        case 'dcd':
          st = '待机'
          break
      }
      let fragment = `
          <ul>
            <li><span>设备名称：</span><b>电池</b></li>
            <li><span>控制指令：</span><b>${st}</b></li>
          </ul>
          <h3>即将下发控制指令，是否确认继续</h3>
      `
      this.$alert(fragment, '控制下发警告', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认',
        showCancelButton: true,
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'yeallowAlert',
      }).then(() => {

        this.dcBtn = sta;
        this.dcimg = this.stationBtnStatus[this.dcBtn]
            controlerPort({ stationId: this.stationDetail.id, type: 3, isOpen}).then(res => {

          let type = res.data == 0 ? 'success' : 'error';

          let message = res.msg
          this.$message({
            type, message
          });
          if (res.data == 0) {
            this.dcBtn = sta;
            this.dcimg = this.stationBtnStatus[this.dcBtn]
          }
        })
      });

    },
    changekt(sta) {
      if (sta === this.ktBtn) return
      let st = '停止'
      switch (sta) {
        case 'ktt':
          st = '停止'
          break
        case 'ktk':
          st = '开启'
          break

      }
      let fragment = `
          <ul>
            <li><span>设备名称：</span><b>空调</b></li>
            <li><span>控制指令：</span><b>${st}</b></li>
          </ul>
          <h3>即将下发控制指令，是否确认继续</h3>
      `
      this.$alert(fragment, '控制下发警告', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认',
        showCancelButton: true,
        cancelButtonText: '取消',
        showClose: false,
        customClass: 'yeallowAlert',
      }).then(() => {
        controlerPort({ stationId: this.stationDetail.id, type: 1, isOpen: this.ktBtn == 'ktt' ? 1 : 0 }).then(res => {

          let type = res.data == 0 ? 'success' : 'error';

          let message = res.msg
          this.$message({
            type, message
          });
          if (res.data == 0) {
            this.ktBtn = sta;
            this.ktimg = this.stationBtnStatus[this.ktBtn]
          }
        })

      });

    },
    changAl(formName) {
      this.$emit('close', false)
      this.$emit('setChangeMapStatus')

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
    mapLineData({ stationId: this.stationDetail.id, queryDate: this.getNowTime() }).then((res) => {
      let legendArr = [
        { name: res.data.ydataNameA, icon: 'rect' },
        { name: res.data.ydataNameB, icon: 'rect' },
        { name: res.data.ydataNameC, icon: 'rect' },
        { name: res.data.ydataNameD },
      ]



      let seriesArr = [{
        name: res.data.ydataNameA,
        type: 'line',
        stack: '总量',
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#a5b8ff',//改变折线点的颜色
            lineStyle: {
              width: 0,
              color: '#a5b8ff' //改变折线颜色
            }
          }
        },
        areaStyle: {
          color: '#a5b8ff',
          opacity: 1

        },
        data: res.data.ydataA
      }, {
        name: res.data.ydataNameB,
        type: 'line',
        stack: '总量',
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#fffd7a',//改变折线点的颜色
            lineStyle: {
              width: 0,
              color: '#fffd7a' //改变折线颜色
            }
          }
        },
        areaStyle: {
          color: '#fffd7a',
          opacity: 1

        },
        data: res.data.ydataB
      }, {
        name: res.data.ydataNameC,
        type: 'line',
        stack: '总量',
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#b7e685',//改变折线点的颜色
            lineStyle: {
              width: 0,
              color: '#b7e685' //改变折线颜色
            }
          }
        },
        areaStyle: {
          color: '#b7e685',
          opacity: 1
        },
        data: res.data.ydataC
      }, {
        name: res.data.ydataNameD,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#f97540',//改变折线点的颜色
            lineStyle: {
              color: '#f97540' //改变折线颜色
            }
          }
        },
        data: res.data.ydataD
      }]

      let xInterVal = this.$publicMethods.getInterVal({ begin: res.data.xdata[0], end: res.data.xdata[1] ? res.data.xdata[1] : '00:15' })
      let xArr = this.$publicMethods.getMinuteForX(xInterVal)
      this.$chart.screenBacLine('stationLine', this.stationDetail.stationName, legendArr, xArr, seriesArr)

    })
  },
  filters: {
    statusFilter(e) {
      let st = '充电'
      switch (e) {
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
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
