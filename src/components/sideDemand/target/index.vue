<template>
  <div class="MonContent">
    <p class="monConTit">需求侧响应管理 - <span class="TitactiveColor">指标管理</span></p>
    <div class="gfjk userCharge">
      <div class="monChosen" style="width: 100%;">
        <div class="layui-form form">
          <div>
            <el-date-picker v-model="date" align="right" type="date" placeholder="请选择响应日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>

          <div>
            <el-select v-model="status" placeholder="请选择当前状态" clearable>
              <el-option v-for="item in zt_options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button style="margin-left: 20px;" size="small" type="primary" @click="searchFun">查询</el-button>
        </div>
      </div>
      <div class="res_table">
        <div class="searchText">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addnewBtn">新增</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delFun">删除</el-button>
        </div>
        <div class="tableList" style="">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="600" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :selectable='selectInit'>
            </el-table-column>
            <el-table-column type="index" width="55" label="序号">
              <template slot-scope="scope">
                <span>{{(searchData.pageNo - 1) * 10 + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="resDate" label="响应日期" width="120">
              <template slot-scope="scope">{{ scope.row.resDate }}</template>
            </el-table-column>
            <el-table-column label="需求来源">
              <template slot-scope="scope">{{ scope.row.demandSources==1?'内部响应':'外部响应' }}</template>
            </el-table-column>
            <el-table-column prop="resPower" label="需求负荷(kW)">
            </el-table-column>
            <el-table-column prop="subsidyPrice" label="补贴单价(元/kW)">
            </el-table-column>
            <el-table-column prop="resStartTime" label="响应开始时间">
            </el-table-column>
            <el-table-column prop="resEndTime" label="响应结束时间">
            </el-table-column>
            <el-table-column prop="resHours" label="响应小时数">
            </el-table-column>
            <el-table-column prop="name" label="当前状态">
              <template slot-scope="scope">{{ scope.row.currentStatus | status }}</template>
            </el-table-column>
            <el-table-column prop="details" label="分解详情">
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <div>
                  <el-button type="primary" plain size="mini" @click="zbfj(scope.row)">指标分解</el-button>
                  <el-button type="primary" plain size="mini" :disabled="scope.row.currentStatus==1||scope.row.currentStatus==3" @click="zbxf(scope.row.id)">指标下发</el-button>
                  <el-button type="primary" plain size="mini" @click="editnewBtn(scope.row)" :disabled="scope.row.currentStatus==3">修改</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination background @current-change="getData" :current-page.sync="searchData.pageNo" :page-size="10" layout="total, prev, pager, next" :total="pageMsg.total" @pagination="getData">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="alertWindow yctList" v-if="showList">
      <div class="container">
        <AddNew @close='closeAl' :detailObj='detailObj'>{{newName}}</AddNew>
      </div>
    </div>
    <div class="alertWindow yctList" v-if="showFj">
      <div class="container">
        <Fj @close='closeAl' :detailObj='detailObj' />
      </div>
    </div>
  </div>
</template>

<script>
import { targetList as list, delTarget as del,targetSaveOrEdit as xfTarget } from '@/api/sideDemand'

import AddNew from './Edit'
import Fj from './Fj'
export default {
  name: 'response',
  data() {
    return {
      showFj: false, // 指标分解弹窗
      showList: false, // 新增/分解弹窗
      newName: '新增',
      date: '',
      xqly_options: [
        {
          label: '内部响应',
          value: 0
        },
        {
          label: '外部响应',
          value: 1
        }
      ],
      inout: '',
      zt_options: [
        {
          label: '未分解',
          value: 0
        },
        {
          label: '未下发',
          value: 1
        },
        {
          label: '已下发',
          value: 2
        }
      ],
      status: '',
      tableData: [],
      searchData: {
        pageNo: 1,
        resDate: null,
        currentStatus: null,
      },
      CheckedSelection: [],
      detailObj: {},
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
    addnewBtn() {
      // 新增
      this.detailObj = {}
      this.showList = true
      this.newName = '新增'
    },
    editnewBtn(detail) {
      // 编辑
      this.detailObj = detail
      this.showList = true
      this.newName = '修改'
    },
    searchFun() {
      this.searchData.date = this.date
      this.searchData.inout = this.inout
      this.searchData.status = this.status

      this.getData()
    },
    delFun() {
      if (this.CheckedSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择数据'
        })
        return
      }

      let objs = this.CheckedSelection.map(res => {
        return res.id
      })
      this.delMethod(objs.join(','))
    },
    delMethod(ids) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del({ ids }).then(val => {
            let type = val.success == 1 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.success == 1) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    zbxf(id) {
      // 指标下发
      this.$confirm('是否下发?', '提示', {
        confirmButtonText: '下发',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          xfTarget({ id ,currentStatus:3}).then(res => {
            let type = res.success == 1 ? 'success' : 'error'
            this.$message({ type, message: res.msg })
            if (res.success == 1) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    zbfj(e) {
      // 指标分解
      this.detailObj = e
      this.showFj = true
    },
    closeAl() {
      this.showList = false
      this.showFj = false
      this.getData()
    },
    selectInit(row) {
      if (row.currentStatus == '3') {
        return false
      } else {
        return true
      }
    },
    handleSelectionChange(e) {
      this.CheckedSelection = e
    }
  },
  components: {
    AddNew,
    Fj
  },
  filters: {
    status(e) {
      if (e == 1) {
        return '未分解'
      } else if (e == 2) {
        return '未下发'
      } else {
        return '已下发'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  padding: 0 20px;
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
