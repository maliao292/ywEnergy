<template>
  <div class="MonContent">
    <p class="monConTit">需求侧响应管理 - <span class="TitactiveColor">响应签约管理</span></p>
    <div class="gfjk userCharge">
      <div class="monChosen" style="width: 100%;">
        <div class="layui-form form">
          <div>
            <el-date-picker v-model="joinYear" align="right" type="year" placeholder="参与年份" value-format="yyyy">
            </el-date-picker>
          </div>

          <div>
            <el-input placeholder="请输入客户名称" v-model="customerName" />
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
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号">
              <template slot-scope="scope">
                <span>{{(searchData.pageNo - 1) * 10 + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" width="120">
            </el-table-column>
            <el-table-column prop="appointPower" label="合同容量（kVA）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="joinYear" label="参与年份" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deviceName" label="响应设备" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="capacity" label="约定响应能力（kW）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="price" label="单价（元/h/kW）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="响应时间段" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  {{scope.row.startTime}}-{{scope.row.endTime}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="editnewBtn(scope.row)">修改</el-button>
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
  </div>
</template>

<script>
import {
  signList as list,
  delSign as del
} from '@/api/sideDemand'
import AddNew from './Edit'
export default {
  components: {
    AddNew
  },
  data() {
    return {
      showFj: false, // 指标分解弹窗
      showList: false, // 新增/分解弹窗
      customerName: '',
      joinYear: '',
      fj_status: 0, // 分解状态
      selectMsg: [],
      newName: '新增',
      xqly_value: '',
      zt_value: '',
      tableData: [],
      searchData: {
        pageNo: 1,
        customerName: '',
        joinYear: '' //角色
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
      this.searchData.customerName = this.customerName
      this.searchData.joinYear = this.joinYear
      this.getData()
    },
    delFun() {
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
            let type = val.success ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.success) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    closeAl() {
      this.showList = false
      this.showFj = false
      this.getData()
    },
    handleSelectionChange(e) {
      this.CheckedSelection = e
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
