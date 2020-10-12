<template>
  <div class="MonContent">
    <p class="monConTit" >报表 - <span class="TitactiveColor">用电量报表</span></p>
    <!--下拉选框-->
    <div class="monChosen" style="justify-content: space-between">
      <div class="reportTopLeft" >
        <el-select v-model="stationParam.streetId" placeholder="请选择" class="monStaSelect" @change="changeStreet">
          <el-option
            v-for="item in streetOption"
            :key="item.id"
            :label="item.stationName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="stationParam.stationId" placeholder="请选择" class="monStaSelect" @change="changeStation">
          <el-option
            v-for="item in stationOption"
            :key="item.id"
            :label="item.stationName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-if="sw == 1"
          v-model="stationParam.queryDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :clearable="false"
          class="monStaSelect"
          @change="changeStation"
        >
        </el-date-picker>
        <el-date-picker
          v-if="sw == 2"
          v-model="stationParam.queryDate"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM"
          :clearable="false"
          class="monStaSelect"
          @change="changeStation"
        >
        </el-date-picker>
        <el-date-picker
          v-if="sw == 3"
          v-model="stationParam.queryDate"
          type="year"
          placeholder="选择年"
          value-format="yyyy"
          :clearable="false"
          class="monStaSelect"
          @change="changeStation"
        >
        </el-date-picker>
      </div>
      <div class="reportTopRight" >
        <div class="dateyearmouth">
          <div class="date sw" :class="sw=='1'? 'sw_clic':''" @click="date(1)">日</div>
          <div class="mouth sw" :class="sw=='2'? 'sw_clic':''" @click="date(2)">月</div>
          <div class="year sw" :class="sw=='3'? 'sw_clic':''" @click="date(3)">年</div>
        </div>
        <el-button class="importBtn" style="margin-left: 20px;background: #17b86e;color: #ffffff;" @click="exportFuc">导出报表</el-button>
      </div>
    </div>
    <!--内容部分-->
    <div class="reportCon_table">
      <el-table
        :data="tableData"
        max-height="750"
        show-summary
        :row-class-name="tabRowClassName"
        style="width: 99%"
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column prop="airEp" label="空调回路电量" align="center">
          <template slot-scope="scope">
            {{ scope.row.airEp }}
          </template>
        </el-table-column>
        <el-table-column prop="lightEp" label="照明回路电量" align="center">
          <template slot-scope="scope">
            {{ scope.row.lightEp }}
          </template>
        </el-table-column>
        <el-table-column prop="powerEp" label="开关电源回路电量" align="center">
          <template slot-scope="scope">
            {{ scope.row.powerEp }}
          </template>
        </el-table-column>
        <el-table-column prop="dischargeEp" label="蓄电池放电电量" align="center">
          <template slot-scope="scope">
            {{ scope.row.dischargeEp }}
          </template>
        </el-table-column>
        <el-table-column prop="chargeEp" label="蓄电池充电电量" align="center">
          <template slot-scope="scope">
            {{ scope.row.chargeEp }}
          </template>
        </el-table-column>
        <el-table-column prop="totalEp" label="合计" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalEp }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getStreetInfo,getStationInfo } from '@/api/operationMonitor'
  import {getReportTable,exportReport} from '@/api/report'

    export default {
        name: "report",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '选项1'
          }],
          streetOption: [],
          stationOption: [],
          stationParam: {
            streetId: null,
            stationId: null,
            queryDate: ''
          },
          sw: "1",
          tableData: []
        }
      },
      created() {
        // 获取街道信息
        getStreetInfo().then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.streetOption = res.data
            this.stationParam.streetId = res.data[0].id
            // let stationParam = {streetId: this.stationParam.streetId}
            getStationInfo(this.stationParam.streetId).then(response => {
              // console.log(response);
              this.stationOption = response.data
              this.stationParam.stationId = response.data[0].id

              this.getTable()
            })

          } else {
            this.streetOption = []
            this.stationParam.streetId = null
            this.stationParam.stationId = null
          }
        })

        // 获取今天日期
        this.getThisTime()
      },
      methods: {
        // 获取当前时间
        getThisTime(v){
          var _this = this;
          var yy = new Date().getFullYear();
          var mm =new Date().getMonth()+1 < 10 ? "0"+(new Date().getMonth() + 1) : new Date().getMonth() + 1;
          var dd = new Date().getDate() <10 ? "0" + new Date().getDate() : new Date().getDate();

          _this.stationParam.queryDate = yy+'-'+mm+'-'+dd

          if (v) {
            if (v == 1) return yy + "-" + mm + "-" + dd;
            if (v == 2) return yy + "-" + mm;
            if (v == 3) return String(yy)
          } else {
            return yy + "-" + mm + "-" + dd;
          }
        },
        date(v) {
          let choose = v == 1 ? "1" : v == 2 ? "2" : v == 3 ? "3" : "1";
          this.sw = choose;
          this.stationParam.queryDate = this.getThisTime(v)

          this.getTable()
        },

        //获取表格数据
        getTable() {
          getReportTable(this.stationParam).then(res => {
            // console.log(res);
            if(res.code == 200) {
              this.tableData = res.data
            }
          })
        },

        // 导出
        exportFuc() {
          exportReport(this.stationParam).then(response => {
            var res=response;//接口响应的数据
            var elink = document.createElement('a');
            elink.download = "用电量报表-"+this.stationParam.queryDate+".xls";
            elink.style.display = 'none';
            var blob = new Blob([res],{type: 'application/vnd.ms-excel'});
            elink.href =  window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
          })
        },

        // 表格条纹样式
        tabRowClassName({row,rowIndex}){
          // console.log(row,rowIndex);
          let index = rowIndex + 1;
          if(index %2 == 1){
            return 'special-row'
          }
        },

        // 改变街道
        changeStreet() {
          this.stationOption = []
          getStationInfo(this.stationParam.streetId).then(response => {
            // console.log(response);
            this.stationOption = response.data
            this.stationParam.stationId = response.data[0].id

            this.getDccfdImfo()
            this.getWdktImfo()
          })
        },
        // 基站切换
        changeStation() {
          this.getTable()
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
  .reportCon_table>>>.el-table__footer{
    font-weight: bold;
  }
</style>
