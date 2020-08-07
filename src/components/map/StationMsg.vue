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
            <div class="outTop residuele"><span>剩余电量：</span><span>30%</span></div>
            <img :src="dc" alt="">
            <div class="outBottom">电池</div>
          </div>
          <div class="eledirection">
            <div class="outTop cft"><span>4.00</span>kW</div>
            <img class="cenarrow" :src="arrowl" alt="">
            <div class="outBottom cfd">充电</div>
          </div>
          <div class="gradientCon">
            <div class="outTop cft"><span>4.00</span>kW</div>
            <div class="fh_s ">
              <b><img :src="kg" alt=""></b><span>3.00 <b>kW</b> </span>
            </div>
            <div class="fh_s ">
              <b><img :src="kt" alt=""></b><span>3.00 <b>kW</b> </span>
            </div>
            <div class="fh_s ">
              <b><img :src="zm" alt=""></b><span>3.00 <b>kW</b> </span>
            </div>
            <div class="outBottom">负荷</div>
          </div>
          <div class="eledirection">
            <div class="outTop cft"><span>4.00</span>kW</div>
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
              <img :src="dcimg" alt="">
              <div class="stationBtn">
                <div>
                  <span @click="changedc('dcc')" :class="['dcbtn',{active:dcBtn==='dcc'}]">充电</span>
                  <span @click="changedc('dcd')" :class="['dcbtn',{active:dcBtn==='dcd'}]">待机</span>
                  <span @click="changedc('dcf')" :class="['dcbtn',{active:dcBtn==='dcf'}]">放电</span>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <span>本月总削峰电量：</span><b>156</b><span>kWh</span>
              </li>
              <li>
                <span>本月总填谷电量：</span><b>156</b><span>kWh</span>
              </li>
              <li>
                <span>本月总节省电量：</span><b>156</b><span>元</span>
              </li>
            </ul>
            <div class="strategy_s">
              <div><span>电池充放电策略：</span><b><i class="el-icon-edit"></i>修改策略</b></div>
              <div>
                <span>
                  22:00-06:00
                  <br>
                  充电
                </span>
                <span>
                  06:00-22:00
                  <br>
                  放电
                </span>
              </div>
            </div>
          </div>
          <div class="ktmsg stationTopL">
            <div class="stationConstrol">
              <span>空调状态：</span>
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
                <span>室内温度：</span><b>156℃</b><span></span>
              </li>
              <li>
                <span>室外温度：</span><b>156℃</b><span></span>
              </li>
              <li>
                <span>可响应负荷：</span><b style="color:#4c8aeb">156</b><span>kW</span>
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
                  26℃
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
// import { cxAddData} from '@/api'
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
    }
  },
  created() {
    console.log(this.stationDetail)
  },
  methods: {
    changedc(sta) {
      this.dcBtn = sta;
      this.dcimg = this.stationBtnStatus[this.dcBtn]
    },
    changekt(sta) {
      this.ktBtn = sta;
      this.ktimg = this.stationBtnStatus[this.ktBtn]
    },
    changAl(formName) {
      this.$emit('close', false)
    },
  },
  mounted() {
    this.$chart.screenBacLine('stationLine')
  }
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
