<template>
    <div>
      <div class="listHead">
      <span>
        <img :src="gyImg" alt="">
        <slot></slot>
      </span>
        <i class="fr el-icon-close" @click="changAl()"></i>
      </div>
      <div class="alcon">
        <div class="stationData" style="height: 310px;">
          <div class="stationProgress" v-show="lookXxCon">
            <!--<div id="xiangxianPic">-->
              <!--<p class="sryg">输入有功(+A)</p>-->
              <!--<p class="srwg">输入无功(+R)</p>-->
              <!--<p class="scyg">输出有功(-A)</p>-->
              <!--<p class="scwg">输出无功(-R)</p>-->
            <!--</div>-->
            <img :src="wugong_jxt" alt="">
            <div style="width: 40%;position: relative">
              <div class="wugongDialog">
                <div class="gradientCon gradientCon_wgLeft">
                  <p style="text-align: center;color: #ffffff;margin-bottom: 5px">-%</p>
                  <img src="@/assets/img/aldc.png" alt="">
                </div>
                <div class="gradientCon gradientCon_wgRight" >
                  <img src="@/assets/img/wugong/wugong_icon1.png" alt="" >
                  <img src="@/assets/img/wugong/wugong_icon2.png" alt="" style="margin-top: 10px">
                </div>
              </div>
              <div class="wugongDialog wugongDialog_eding">
                <span style="font-weight: bold">额定：</span>
                <span class="fontCon"><span style="color: #0c88be;font-weight: bold">{{stationDetail.fixActivePower?stationDetail.fixActivePower:'-'}}</span> kW</span>
                <span class="fontCon"><span style="color: #0c88be;font-weight: bold">{{stationDetail.fixReactivePower?stationDetail.fixReactivePower:'-'}}</span> kVar</span>
              </div>
            </div>
          </div>
          <div class="stationProgress" v-show="!lookXxCon" style="position: relative">
            <p class="xiangxianCon">象限<span @click="lookXxCon = !lookXxCon" class="xiangxianBack">←返回</span></p>

            <!--<div ref="xiangxianPic" style="width: 480px;height: 290px;margin: auto"></div>-->
            <div id="xiangxianPic">
              <p class="sryg">输入有功(+A)</p>
              <p class="srwg">输入无功(+R)</p>
              <p class="scyg">输出有功(-A)</p>
              <p class="scwg">输出无功(-R)</p>

              <p class="firstXx firstXx1">I(+RL)</p>
              <p class="firstXx firstXx2">II(+RL)</p>
              <p class="firstXx firstXx3">III(+RL)</p>
              <p class="firstXx firstXx4">IV(+RL)</p>
            </div>
          </div>
          <div class="stationNum">
            <div class="dcmsg stationTopL">
              <div class="stationConstrol">
                <span>有功状态：</span>
                <!-- batteryStatus -->
                <img :src="yougongimg" alt="">
                <span style="margin-left: 5px;" :style="{'color':yougongColor}">{{yougongText}}</span>
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
                  22:00-06:00
                  <br>
                  放电
                </span>
                  <span>
                  06:00-22:00
                  <br>
                  充电
                </span>
                </div>
              </div>
            </div>
            <div class="ktmsg stationTopL">
              <div class="stationConstrol">
                <span>无功输出：</span>
                <img :src="wugongimg" alt="">
                <span style="margin-left: 5px;" :style="{'color':wugongColor}">{{wugongText}}</span>

                <p class="wugongshuchuBtn" @click="controlWugong">无功输出控制</p>
              </div>
              <ul>
                <li style="display: flex;justify-content: space-between;line-height: 16px">
                  <span>功率因数：</span><b style="color: #13BC40;">{{gonglvInfo.cos?gonglvInfo.cos:'-'}}</b><span></span>
                  <span style="color: #4c8aeb;cursor: pointer;text-decoration:underline" @click="lookXx">查看象限</span>
                </li>
                <li>
                  <span>有功功率：</span><b>{{gonglvInfo.activePower?gonglvInfo.activePower:'-'}}</b><span>kW</span>
                </li>
                <li>
                  <span>无功功率：</span><b style="color:#4c8aeb">{{gonglvInfo.reactivePower?gonglvInfo.reactivePower:'-'}}</b><span>kVar</span>
                </li>
              </ul>
              <div class="strategy_s">
                <div><span>无功运行策略：</span><b><i class="el-icon-edit"></i>修改策略</b></div>
                <div style="text-align: center">
                <span>
                  0.95
                  <br>
                  目标功率因数
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stationLine">
          <div id="stationLine_wugong" ref="stationLine_wugong"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui'
  import {noPowerInfo,gonglvInfo,noPower_dayChart,controlEq } from '@/api/home/wugong'
  import echarts from 'echarts'
  export default {
    props: {
      stationDetail: {},
    },
    data() {
      return {
        gyImg: require('@/assets/img/gy.png'),
        dc: require('@/assets/img/aldc.png'),
        kg: require('@/assets/img/alkg.png'),
        wugong_jxt: require('@/assets/img/wugong/wugong_jxt.png'),
        dcBtn: 'dcc',
        ktBtn: 'ktt',
        yougongimg: require('@/assets/img/alcd.png'),
        yougongText: '充电',
        yougongColor: '#0fd564',
        wugongimg: require('@/assets/img/alcd.png'),
        wugongText: '待机',
        wugongColor: '#0fd564',
        stationNum: {},
        kgNum:0,
        lookXxCon: true,
        //无功折线图
        chart_line_wugong: {
          dom:null
        },
        chart_line_xx: {
          dom : null
        },
        open_clConfirm: false,
        controlOut : {
          wugongControl: '',
          confirmPassword: ''
        },
        gonglvInfo: {}, // 功率信息
        timerInfo: undefined
      }
    },
    created() {
      this.getNopowerInfo()
      this.getGonglv()
      this.setInter()

      if(this.stationDetail.batteryStatus == 0){ //充电
        this.yougongimg = require('@/assets/img/alcd.png')
        this.yougongText = '充电'
        this.yougongColor = '#0fd564'
      } else if(this.stationDetail.batteryStatus == 1){ //放电
        this.yougongimg = require('@/assets/img/alfd.png')
        this.yougongText = '放电'
        this.yougongColor = '#5b7dfe'
      } else if(this.stationDetail.batteryStatus == 2){ //待机
        this.yougongimg = require('@/assets/img/aldj.png')
        this.yougongText = '待机'
        this.yougongColor = '#d433e3'
      }

      if(this.stationDetail.noPowerStatus == 1){
        this.wugongimg = require('@/assets/img/wugong/wugong_rong.png')
        this.wugongText = '容性'
        this.wugongColor = '#0fd564'
      } else if(this.stationDetail.noPowerStatus == 2){
        this.wugongimg = require('@/assets/img/wugong/wugong_gan.png')
        this.wugongText = '感性'
        this.wugongColor = '#5b7dfe'
      } else if(this.stationDetail.noPowerStatus == 3){
        this.wugongimg = require('@/assets/img/wugong/wugong_dai.png')
        this.wugongText = '待机'
        this.wugongColor = '#d433e3'
      }
    },
    computed:{

    },
    beforeDestroy() {
      if (this.timerInfo) {
        clearInterval(this.timerInfo); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    methods: {
      //定时获取功率数据
      setInter() {
        this.timerInfo = setInterval(this.getGonglv, 10000);
      },
      getGonglv() {
        gonglvInfo(this.stationDetail).then(res => {
          // console.log(res);
          this.gonglvInfo = res.data
        })
      },
      // 获取站点信息
      getNopowerInfo() {
        noPowerInfo(this.stationDetail).then(res => {
          // console.log(res);
          this.stationNum = res.data
        })
      },
      // 关闭
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
      },

      // 无功输出控制
      controlWugong() {
        let fragment = `
          <ul>
            <li><span>设备名称：</span><b>无功设备</b></li>
            <li><span>无功控制：</span><input class='wugongKz' id='wugongKz'/>kVar</li>
            <li><span>输入密码：</span><br/>
            <div class='passCon'>
            <input class='controlPass' id='controlPassword' type='password'/>
            </div>
            </li>
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
          // console.log('下发')
          let eqParams = {
            stationId: this.stationDetail.id,
            eq: document.getElementById('wugongKz').value,
            switchPass: document.getElementById('controlPassword').value,
          }
          console.log(eqParams);
          controlEq(eqParams).then(res => {
            console.log(res);
            if(res.code == 200) {
              this.$message({
                message: '指令下发成功',
                type: 'success'
              });
            } else {
              this.$message(res.msg);
            }
          })
        }).catch(() => {

        })
      },

      // 查看象限
      lookXx() {
        this.lookXxCon = false
      },
      // 象限图
      renderXx() {
        this.chart_line_xx.dom = this.$echarts.init(this.$refs.xiangxianPic);
        this.chart_line_xx.dom.setOption({
          title : {
            text: '',
          },
          grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          tooltip : {
            trigger: 'axis',
            showDelay : 0,
            formatter : function (params) {
              if (params.value.length > 1) {
                return params.seriesName + ' :<br/>'
                  + params.value[0] + 'cm '
                  + params.value[1] + 'kg ';
              }
              else {
                return params.seriesName + ' :<br/>'
                  + params.name + ' : '
                  + params.value + 'kg ';
              }
            },
            axisPointer:{
              show: true,
              type : 'cross',
              lineStyle: {
                type : 'dashed',
                width : 1
              }
            }
          },
          toolbox: {
            feature: {
              dataZoom: {},
              brush: {
                type: ['rect', 'polygon', 'clear']
              }
            }
          },
          legend: {
            data: ['男性'],
            left: 'center'
          },
          xAxis : [
            {
              type : 'value',
              scale:true,
              axisLabel : {
                formatter: '{value} cm'
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              scale:true,
              axisLabel : {
                formatter: '{value} kg'
              },
              splitLine: {
                show: false
              }
            }
          ],
          series : [


            {
              name:'男性',
              type:'scatter',
              data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                [183.5, 74.8], [175.5, 70.0]
              ],
              markArea: {
                silent: true,
                itemStyle: {
                  normal: {
                    color: 'transparent',
                    borderWidth: 0.5,
                    borderType: 'dashed',
                    borderColor: 'grey'
                  }
                },
                data: [[{
                  name: '男性分布区间',
                  xAxis: 'min',
                  yAxis: 'min'
                }, {
                  xAxis: 'max',
                  yAxis: 'max'
                }]]
              },
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'},
                  {type : 'max', name: '最大值', valueDim:'x'},
                  {type : 'min', name: '最小值', valueDim:'x'},
                  {type : 'max', name: '最大值', valueDim:'y'},
                  {type : 'min', name: '最小值', valueDim:'y'}
                ]
              },
              markLine : {
                lineStyle: {
                  normal: {
                    color: 'blue',
                    type: 'solid'
                  }
                },
                data : [
                  {type : 'average', name: '平均值'},
                  {type : 'average', valueDim:'x' }
                ]
              }
            }
          ]
        })
      },
    },
    mounted() {
      // 初始化功率折线图
      noPower_dayChart({ stationId: this.stationDetail.id }).then((res) => {
        console.log(res);
        let legendArr = ['有功功率P','无功功率Q']

        this.chart_line_wugong.dom = this.$echarts.init(this.$refs.stationLine_wugong);
        this.chart_line_wugong.dom.setOption({
          title: {},
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: "1%",
            right: "2%",
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
            data: legendArr
          },
          xAxis: {
            name: "t",
            axisLabel: {
              show: true,
              interval:11
            },
            data: res.data.xaxis,
            boundaryGap: false,
          },
          yAxis: [
            {
              name: "P ({blue|kW})\n Q ({blue|kVar})",
              nameTextStyle :{
                fontSize: 14,
                rich: {
                  blue: {
                    color: '#52a4f6'
                  },
                }
              },
              itemStyle: {
                normal: {
                  color: "#52a4f6",
                }
              },
              splitNumber : 3,
            },
          ],
          series: [
            {
              symbol: "none",
              name: '有功功率P',
              type: "line",
              smooth: true,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              itemStyle: {
                normal: {
                  color: "#C947FA",
                  lineStyle: {
                    color: "#C947FA" // 改变折线颜色
                  }
                }
              },
              data: res.data.yaxis
            },
            {
              symbol: "none",
              name: '无功功率Q',
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
              data:  res.data.yaxis1
            }
          ]
        });
        })

      // 初始化象限图
      // this.renderXx()
      let W =500,H = 300,WA = W/2,HA = H/2
      var canvabod = document.getElementById( 'xiangxianPic' );
      var canvas  = document.createElement("canvas")
      canvas.width = W;
      canvas.height = H;
      // canvas.style.border = '1px dashed red';
      canvabod.appendChild( canvas );
      // 获得 CanvasRenderingContext2D 对象
      var context = canvas.getContext( '2d' );
      context.translate(WA, HA) //设置零点

      context.beginPath();
      context.rotate(Math.PI / 180 * -90) // 旋转-90度
      // 设置 横坐标
      context.moveTo( 0,0 );
      context.lineTo( 150,0 );
      context.lineTo( -150,0 );
      context.moveTo( 150,0 );// 箭头
      context.lineTo( 140,5 );
      context.moveTo( 150,0 );
      context.lineTo( 140,-5 );

      // 设置 纵坐标
      context.moveTo( 0,0 );
      context.lineTo( 0,250 );
      context.lineTo( 0,-250 );
      context.moveTo( 0,250 );// 箭头
      context.lineTo( 5,240 );
      context.moveTo( 0,250 );
      context.lineTo( -5,240 );
      context.strokeStyle = 'gray';
      // 描边显示效果
      context.stroke();

      // 划线
      context.beginPath();
      context.moveTo( 0,0 );
      // context.lineTo( Number(this.stationDetail.activePower), Number(this.stationDetail.reactivePower) );
      let ygNum = Number(this.stationDetail.activePower)
      let wgNum = Number(this.stationDetail.reactivePower)
      context.lineTo(ygNum,wgNum)
      context.strokeStyle = 'black';
      context.stroke();

      // 垂直于坐标系的虚线
      context.beginPath();
      context.moveTo(ygNum,wgNum)
      context.lineTo(ygNum,0)
      context.setLineDash([5, 10]);
      context.moveTo(ygNum,wgNum)
      context.lineTo(0,wgNum)
      context.strokeStyle = 'black';
      context.stroke();

      // 文字
      context.beginPath();
      var str1 = ygNum
      context.font = '16px SimHei';
      context.fillStyle = 'blue';
      context.textBaseline = 'left'
      context.textAlign = 'center';
      context.fillText(str1,ygNum,20) ;
      var str2 = wgNum
      context.font = '16px SimHei';
      context.fillStyle = 'purple';
      context.textBaseline = 'left'
      context.textAlign = 'center';
      context.fillText(str2,-10,wgNum) ;
      context.stroke();

      drawAxisX(context);
      function drawAxisX() {

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
  .stationLine #stationLine_wugong {
    width: 100%;
    height: 350px;
  }
  .wugongDialog {
    display: flex;
    justify-content: left;
  }
  .wugongDialog .gradientCon_wgLeft{
    border-radius: 10px 0 0 10px;
    width: 110px;
    padding: 20px;
  }
  .wugongDialog .gradientCon_wgRight{
    border-radius: 0 10px 10px 0;
    margin-left: 1px;
    width: 110px;
    padding:30px 20px;
    text-align: center;
  }

  .wugongDialog_eding{
    position: absolute;
    left: -50px;
    margin-top: 15px;
  }
  .wugongDialog_eding .fontCon{
    width: 110px;
    text-align: center;
  }

  #xiangxianPic{
    margin: auto;
    position: relative;

  }
  .sryg{
    position: absolute;
    left: 140px;
    top: -15px;
  }
  .srwg{
    position: absolute;
    right: -100px;
    top: 140px;
  }
  .scyg{
    position: absolute;
    left: 140px;
    bottom: 0;
  }
  .scwg{
    position: absolute;
    left: -100px;
    top: 140px;
  }
  /*象限文字*/
  .firstXx{
    color: rgba(0,0,0,0.4);
    font-size: 18px;
  }
  .firstXx1{
    position: absolute;
    top: 50px;
    right: 50px;
  }
  .firstXx2{
    position: absolute;
    top: 230px;
    right: 50px;
  }
  .firstXx3{
    position: absolute;
    top: 230px;
    left: 50px;
  }
  .firstXx4{
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .xiangxianCon{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 18px;
    font-weight: bold;
  }
  .xiangxianBack {
    font-size: 16px;
    color: blue;
    cursor:pointer;
  }

  .wugongshuchuBtn{
    padding: 3px 6px;
    width: 110px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid gray;
    font-size: 14px;
   text-align: center;
    margin-left: 15px;
    cursor: pointer;
    color: #4eb4ee;

  }

  /*控制下发弹窗*/

</style>

