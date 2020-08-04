<template>
  <div class="MonContent">
    <p class="monConTit" >报表 - <span class="TitactiveColor">报表</span></p>
    <!--下拉选框-->
    <div class="monChosen">
      <div style="width: 70%;text-align: center">
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
      <div style="width: 20%;display: flex">
        <div class="dateyearmouth">
          <div class="date sw" :class="sw=='1'? 'sw_clic':''" @click="date(1)">日</div>
          <div class="mouth sw" :class="sw=='2'? 'sw_clic':''" @click="date(2)">月</div>
          <div class="year sw" :class="sw=='3'? 'sw_clic':''" @click="date(3)">年</div>
        </div>
        <el-button type="success" style="margin-left: 20px">导出报表</el-button>
      </div>
    </div>
    <!--内容部分-->


  </div>
</template>

<script>
    export default {
        name: "report",
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
          sw: "1",
        }
      },
      methods: {
        date(v) {
          let choose = v == 1 ? "1" : v == 2 ? "2" : v == 3 ? "3" : "1";
          this.sw = choose;
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
