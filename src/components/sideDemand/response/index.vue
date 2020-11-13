<template>
  <div class="MonContent">
    <p class="monConTit">需求侧响应管理 - <span class="TitactiveColor">响应评估</span></p>
    <div class="gfjk userCharge">
      <div class="monChosen" style="width: 100%;">
        <div class="layui-form form">
          <div>
            <el-date-picker v-model="resDate" align="right" type="date" value-format="yyyy-MM-dd" placeholder="请选择响应日期">
            </el-date-picker>
          </div>
          <div>
            <el-input placeholder="请输入客户名称" v-model="customerName">
            </el-input>
          </div>
          <el-button style="margin-left: 20px;" size="small" type="primary" @click="searchFun">查询</el-button>
        </div>
      </div>
      <div class="res_table">
        <div class="searchText">
          <span style="margin-right:20px"></span>
        </div>
        <div class="tableList" style="">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="600" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="55">
            </el-table-column>
            <el-table-column label="响应日期" width="120">
              <template slot-scope="scope">{{ scope.row.QUOTATIME }}</template>
            </el-table-column>
            <el-table-column prop="COMPANY" label="用户" width="120">
            </el-table-column>
            <el-table-column prop="DEVICE" label="响应设备" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="TIME1" label="响应开始时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="TIME2" label="响应结束时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="HOUR" label="响应小时数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="QUOTAXYFH" label="响应负荷（kW）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="QUOTAPRICE" label="单价（元/H/kW）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="MONEY" label="结算金额（元）" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background @current-change="getData" :current-page.sync="searchData.pageNo" :page-size="10" layout="total, prev, pager, next" :total="pageMsg.total" @pagination="getData">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { responsetList as list } from '@/api/sideDemand'
export default {
  data() {
    return {
      tableData: [],
      resDate: '',
      customerName: '',
      searchData: {
        pageNo: 1,
        resDate: null,
        customerName: null//角色
      },
      pageMsg: {
        total: 0
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await list(this.searchData)
      this.tableData = res.data.records
      this.pageMsg.total = Number(res.data.total)
    },
    searchFun() {
      this.searchData.name = this.name
      this.searchData.time = this.time
      this.getData()
    },
    handleSelectionChange(e) {}
  }
}
</script>

<style scoped>
.layui-form {
  display: flex;
  justify-content: flex-start;
}
.layui-form > div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.formlabel {
  display: inline-block;
  width: 80px;
  flex-shrink: 0;
}
.res_table {
  height: 100%;
  width: 100%;
  padding: 0;
}
.searchText {
  border: none;
  justify-content: flex-start;
}
.tableList {
  height: 100%;
  /* flex-direction: column; */
}
</style>
