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
      <div>
        <div class="enerynum">
          <h4 class="modelTitle">能效服务</h4>
          <div>
            <span>用户总数</span>
            <p><span>4545</span><span>户</span></p>
          </div>
          <div>
            <span>装机容量</span>
            <p><span>4545</span><span>MVA</span></p>
          </div>
        </div>

        <div id="screenPie" class="screenPie" style="width:100%;height:500px"></div>
        <div class="enerynum">
          <h4 class="modelTitle">能效服务</h4>
          <div>
            <span>3.5%</span>
            <p>本年节支</p>
          </div>
          <div>
            <p><img :src="co2" alt=""><span>4545</span><span>吨</span></p>
            <span>装机容量</span>
          </div>
        </div>
        <div id="screenBar" class="screenBar" style="width:100%;height:500px"></div>
      </div>
      <div></div>
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

