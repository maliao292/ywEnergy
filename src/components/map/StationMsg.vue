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
          <div>
            <div class="outTop"></div>
            <img :src="dc" alt="">
            <div class="outBottom"></div>
          </div>
          <div></div>
          <div class="fh_s">
            <div class="outTop"></div>
            <div>
              <img :src="kg" alt=""><span>3.00kW</span>
            </div>
            <div>
              <img :src="kt" alt=""><span>3.00kW</span>
            </div>
            <div>
              <img :src="zm" alt=""><span>3.00kW</span>
            </div>
            <div class="outBottom"></div>
          </div>
          <div></div>
          <div>
            <div class="outTop"></div>
            <img :src="dw" alt="">
            <div class="outBottom"></div>
          </div>
        </div>
        <div class="stationNum"></div>
      </div>
      <div class="stationLine">

      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
// import { cxAddData} from '@/api'
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
    }
  },
  created() {
    console.log(this.stationDetail)
  },
  methods: {
    changAl(formName) {
      this.$emit('close', false)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stationshow {
  width: 1350px;
}
</style>
