<template>
  <div class="MonContent">
    <p class="monConTit" >报表 - <span class="TitactiveColor">报表</span></p>
    <!--下拉选框-->
    <div class="monChosen" style="justify-content: space-between">
      <div class="reportTopLeft" >
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
      <div class="reportTopRight" >
        <div class="dateyearmouth">
          <div class="date sw" :class="sw=='1'? 'sw_clic':''" @click="date(1)">日</div>
          <div class="mouth sw" :class="sw=='2'? 'sw_clic':''" @click="date(2)">月</div>
          <div class="year sw" :class="sw=='3'? 'sw_clic':''" @click="date(3)">年</div>
        </div>
        <el-button class="importBtn" style="margin-left: 20px;background: #17b86e;color: #ffffff;">导出报表</el-button>
      </div>
    </div>
    <!--内容部分-->
    <div class="reportCon_table">
      <el-table
        :data="tableData"
        max-height="800"
        :row-class-name="tabRowClassName"
        style="width: 100%">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="时间" align="center">

        </el-table-column>
        <el-table-column prop="address" label="空调回路Ep" align="center">

        </el-table-column>
        <el-table-column prop="address" label="照明回路Ep" align="center">

        </el-table-column>
        <el-table-column prop="address" label="开关电源回路Ep" align="center">

        </el-table-column>
        <el-table-column prop="address" label="蓄电池放电Ep" align="center">

        </el-table-column>
        <el-table-column prop="address" label="蓄电池充电Ep" align="center">

        </el-table-column>
        <el-table-column prop="address" label="合计" align="center">

        </el-table-column>
      </el-table>
    </div>
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
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        date(v) {
          let choose = v == 1 ? "1" : v == 2 ? "2" : v == 3 ? "3" : "1";
          this.sw = choose;
        },

        tabRowClassName({row,rowIndex}){
          console.log(row,rowIndex);
          let index = rowIndex + 1;
          if(index %2 == 1){
            return 'special-row'
          }
        }
      }
    }
</script>

<style scoped>
  .monStaSelect>>>.el-input__inner{
    border: none;
    box-shadow: 2px 2px 10px 2px rgba(2, 27, 50, 0.1);
  }

  .reportCon_table>>>.el-table .special-row{
    background:#f7f7f7;
  }

  .reportCon_table>>>.el-table th{
    height: 65px;
  }
  .reportCon_table>>>.el-table tr{
    height: 65px;
  }
</style>
