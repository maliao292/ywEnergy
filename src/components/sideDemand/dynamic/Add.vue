<template>
  <div class="yctListCon">
    <div class="listHead"><span>新增指标</span><i class="fr el-icon-close" @click="changAl"></i></div>
    <div class="form">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="helf-ruleForm self_ruleform">
        <el-form-item label="响应日期" prop="time">
          <el-date-picker v-model="ruleForm.time" placeholder="请输入内容" type="date" value-format="yyyy-MM-dd" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="需求来源" prop="inout">
          <el-select v-model="ruleForm.inout" placeholder="请选择" disabled>
            <el-option v-for="item in xqly_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="响应负荷（kW）" prop="xyfh">
          <el-input v-model="ruleForm.xyfh" placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>
        <el-form-item label="补贴单价（元/kW）" prop="price">
          <el-input v-model="ruleForm.price " disabled placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>

        <el-form-item label="响应开始时间" prop="time1">
          <el-time-select placeholder="请选择" v-model="ruleForm.time1" :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00',
                maxTime: ruleForm.time2
              }">
          </el-time-select>
        </el-form-item>
        <el-form-item label="响应结束时间" prop="time2">
          <el-time-select placeholder="请选择" v-model="ruleForm.time2" :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00',
      minTime: ruleForm.time1
    }"></el-time-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottomBtn">
      <el-button type="primary" style="margin-right:50px" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="changAl">取消</el-button>
    </div>
  </div>
</template>

<script>
import { forecastCraete } from '@/api'
export default {
  props: {
    detailObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        time: '',
        inout: 0,
        xyfh: '',
        price: '',
        time1: '',
        time2: ''
      },
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

      sb_options: [],
      rules: {
        time: [
          { required: true, message: '请选择响应日期', trigger: 'change' }
        ],
        inout: [
          { required: true, message: '请选择需求来源', trigger: 'change' }
        ],
        xyfh: [
          { required: true, message: '请输入响应负荷', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入补贴单价', trigger: 'change' }
        ],
        time1: [
          { required: true, message: '请选择响应开始时间', trigger: 'input' }
        ],
        time2: [
          { required: true, message: '请选择响应结束时间', trigger: 'input' }
        ]
      }
    }
  },
  created() {
    this.ruleForm.time = this.detailObj.TIME
    this.ruleForm.xyfh = this.detailObj.XYFH
    this.ruleForm.price = this.detailObj.PIRCE
    this.ruleForm.time1 = this.detailObj.TIME1
    this.ruleForm.time2 = this.detailObj.TIME2
  },
  methods: {
    htrlFilter(e) {
      this.$publicMethods.period(e)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let {time, xyfh, price, time1, time2} = this.ruleForm
          forecastCraete({time, xyfh, price, time1, time2}).then(res => {
            this.loading = false
            let val = res
            let type = val.STATUS == 1 ? 'success' : 'error'
            this.$message({ type, message: val.INFO })
            if (val.STATUS == 1) this.$emit('close', false)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changAl() {
      this.$emit('close', false)
    }
  }
}
</script>
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
.helf-ruleForm {
  width: 100%;
}
.helf-ruleForm > .el-form-item {
  width: 49%;
  margin-right: 0;
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.helf-ruleForm .el-form--inline .el-form-item__label {
  flex-shrink: 0;
}
</style>
