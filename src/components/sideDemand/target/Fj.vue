<template>
  <div class="yctListCon bg_fff">
    <div class="listHead"><span>指标分解</span><i class="fr el-icon-close" @click="changAl"></i></div>
    <div class="bgTitle">
      <span class="name">指标</span>
      <b class="title_status fr" :class="{title_status_wxf:status!=3,title_status_xf:status==3}">{{status | status}}</b>
    </div>
    <div class="titledata">
      <div>
        <span>响应日期：</span>
        <span>{{detailObj.QUOTATIME}}</span>
      </div>
      <div>
        <span>需求负荷（kW）：</span>
        <span>{{detailObj.QUOTAXYFH}}</span>
      </div>
      <div>
        <span>响应开始时间：</span>
        <span>{{detailObj.TIME1}}</span>
      </div>
      <div>
        <span>响应结束时间：</span>
        <span>{{detailObj.TIME2}}</span>
      </div>
    </div>
    <div class="bgTitle">
      <span class="name">分解</span>
      <span v-if="status!=2" style="font-size:14px">满足要求时段的用户约定响应能力总计 {{allPower}} kW，最近5日平均负荷总计 {{avgPower}} kW，已选择 {{selectPowert}} kW。</span>
    </div>
    <div class="tableCon">
      <el-table :data="tableData" border height="300" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column v-if="status!=3" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称">
        </el-table-column>
        <el-table-column prop="deviceName" label="响应设备">
        </el-table-column>
        <el-table-column prop="appointPower" label="约定响应能力（kW）">
        </el-table-column>
        <el-table-column prop="avgPower" label="最近5日平均负荷（kW）">
        </el-table-column>
        <el-table-column prop="price" label="单价（元/h/kW）">
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomBtn" v-if="status!=2">
      <el-button type="primary" :loading="saving" style="margin-right:50px" @click="save">保存</el-button>
      <el-button type="primary" pain @click="changAl">取消</el-button>
    </div>
  </div>
</template>

<script>
import { fjList, fjSave } from '@/api/sideDemand'
export default {
  props: {
    detailObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      zbzt: 0,
      status: 0,
      tableData: [],
      allPower: 0,
      avgPower: 0,
      CheckedSelection: [],
      saving: false
    }
  },
  created() {
    this.status = Number(this.detailObj.QUOTASTATUS)
    fjList({ targetId: this.detailObj.id }).then(res => {
      this.tableData = res.data.list
      this.allPower = res.data.allAppointPower
      this.avgPower = res.data.allAvgPower
    })
  },
  computed: {
    selectPowert() {
      let selects = (selects = this.CheckedSelection.reduce(
        (prev, curr, idx, arr) => {
          return prev + Number(curr.avgPower)
        },
        0
      ))
      return selects
    }
  },
  methods: {
    changAl() {
      this.$emit('close', false)
    },
    save() {
      if (this.CheckedSelection.length === 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      this.saving = true

      // let ids2 = this.CheckedSelection.reduce((prev,curr) => {
      //   console.log(prev,curr)
      //   return prev.push(curr.DT)
      // },[])
      // // console.log(ids2)
      // return

      let ids = this.CheckedSelection.map(res => {
        return res.appointId
      })
      fjSave({ dt:this.detailObj.DT,sign: ids.join(',') })
        .then(res => {
          this.saving = false
          let val = res
          let type = val.STATUS == 1 ? 'success' : 'error'
          this.$message({ type, message: val.INFO })
          if (val.STATUS == 1) this.$emit('close', false)
        })
        .catch(err => {
          this.$message({ type: 'error', message: '分解失败' })
        })
    },
    handleSelectionChange(e) {
      this.CheckedSelection = e
    }
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
.yctListCon {
  width: 880px;
}
.form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}
.form > div {
  width: 49%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.form > div > span {
  display: inline-block;
  width: 142px;
  flex-shrink: 0;
  text-align: right;
  font-size: 14px;
  margin-right: 10px;
}
th{
  background: #f2f2f2;
}
</style>
