<template>
  <div class='screenConrainer'>
    <div class="screenTitle">
      <div>
        <i><img :src="clock" alt=""></i>
        <Time style="display:inline-block;width:285px" :fontName='fontName' />
        <span class="timeFont">TIME</span>
      </div>
      <div class="stitle">义乌源荷储集成平台</div>
      <div class="userBtn">
        <span class="timeFont">
          Welcome,admin!
        </span>
        <img :src="back" alt="">
        <img :src="out" alt="">
      </div>
    </div>
    <div class="screenCon">
      <div class="sreenLeft">
        <div class="enerynum fw">
          <h4 class="modelTitle">能效服务</h4>
          <div>
            <span>用户总数</span>
            <p><i>4545</i><span>户</span></p>
          </div>
          <div>
            <span>装机容量</span>
            <p><i>4545</i><span>MVA</span></p>
          </div>
        </div>

        <div id="screenPie" class="screenPie eccon" style="width:100%;height:300px"></div>
        <div class="enerynum jztj">
          <h4 class="modelTitle">节支统计</h4>
          <div class="thisYearJZ">
            <span>3.5%</span>
            <p>本年节支</p>
          </div>
          <div class="zjrl">
            <p><img :src="co2" alt=""><span>4545</span><span>吨</span></p>
            <span>装机容量</span>
          </div>
        </div>
        <div id="screenBar" class="screenBar eccon" style="width:100%;height:200px"></div>
      </div>
      <div class="screenMap">
        <div class="msgnum">
          <p>户数</p>
          <p><span>1873</span> <i>户</i> </p>
          <p>容量</p>
          <p><span>1873</span> <i>MW</i> </p>
          <p>总发电功率</p>
          <p><span>1873</span><i>MW</i></p>
        </div>
        <div class="mapshow">
          <img :src="map" alt="">
          <!-- 光伏 -->
          <!-- <span class="mapicon gf">
            <img :src="gficon" alt="">
          </span> -->

          <!-- 负荷 -->
          <span class="mapicon fh">
            <img :src="fhicon" alt="">
          </span>

          <!-- 储能 -->
          <span class="mapicon cn">
            <img :src="cnicon" alt="">
          </span>
        </div>
        <div class="mapBtn">
          <div><img :src="gficon" alt=""><span class="yhc">{{yhc}}</span></div>
          <ul>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
            <li>
              <span class="sm">商贸</span>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Time from '../Time'
export default {
  components: { Time },
  data() {
    return {
      fontName: 'circle',
      clock: require('@/assets/img/screen/screenTime.png'),
      back: require('@/assets/img/screen/screenBack.png'),
      out: require('@/assets/img/screen/screenOut.png'),
      co2: require('@/assets/img/screen/co2.png'),
      map: require('@/assets/img/screen/ditu.png'),
      gficon: require('@/assets/img/screen/screenY.png'),
      fhicon: require('@/assets/img/screen/screenFh.png'),
      cnicon: require('@/assets/img/screen/screenCn.png'),
      yhc: '负荷',
      eneryDist: [
        { value: 'sm', text: '商贸' },
        { value: 'wl', text: '物流' },
        { value: '5g', text: '5G' },
        { value: 'ld', text: '路灯' },
        { value: 'cdz', text: '充电桩' },
        { value: 'gy', text: '工业' },
        { value: 'zht', text: '综合体 ' },
        { value: 'zht', text: '小微园 ' },
      ],
      gfPos: [
        [100, 100]
      ],
      fhPos: [
        [100, 100]
      ],
      cnPos: [
        [100, 100]
      ]
    };
  },
  methods: {

  },
  created() {

  },
  mounted() {
    this.$chart.hzPie('screenPie')
    this.$chart.screenBar('screenBar')
  },
}
</script>
<style scoped>
.timeFont {
  font-family: time;
  font-size: 14px;
  color: #a8daee;
  vertical-align: sub;
}
.stitle {
  font-family: stitle;
  font-size: 44px;
  color: #f1fbf8;
  vertical-align: sub;
}
.userBtn {
  align-self: flex-end;
  padding: 5px 0;
}
.userBtn span,
.userBtn img {
  margin-left: 10px;
}
</style>

