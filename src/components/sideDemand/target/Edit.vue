<template>
  <div class="yctListCon bg_fff">
    <div class="listHead"><span>
        <slot></slot>
      </span><i class="fr el-icon-close" @click="changAl"></i></div>
    <div class="form">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="helf-ruleForm self_ruleform">
        <el-form-item label="响应日期" prop="resDate">
          <el-date-picker v-model="ruleForm.resDate" placeholder="请输入内容" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd"></el-date-picker>
        </el-form-item>
        <el-form-item label="需求来源" prop="demandSources">
          <el-select v-model="ruleForm.demandSources" placeholder="请选择">
            <el-option v-for="item in xqly_options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="响应负荷（kW）" prop="resPower">
          <el-input v-model="ruleForm.resPower" placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>
        <el-form-item label="补贴单价（元/kW）" prop="subsidyPrice">
          <el-input v-model="ruleForm.subsidyPrice " placeholder="请输入内容" @input.native="htrlFilter($event)" :disabled="ruleForm.inout===0"></el-input>
        </el-form-item>

        <el-form-item label="响应开始时间" prop="resStartTime">
          <el-time-select placeholder="请选择" v-model="ruleForm.resStartTime" :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00',
                maxTime: ruleForm.resEndTime
              }">
          </el-time-select>
        </el-form-item>
        <el-form-item label="响应结束时间" prop="resEndTime">
          <el-time-select placeholder="请选择" v-model="ruleForm.resEndTime" :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00',
      minTime: ruleForm.resStartTime
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
import { targetSaveOrEdit as edit } from '@/api/sideDemand'
export default {
  props: {
    detailObj: {
      type: Object,
      default: {}
    }
  },
  data() {
    var xq = (rule, value, callback) => {
      if (this.ruleForm.inout !== 0 && value === '') {
        callback(new Error('请输入补贴单价'))
      } else {
        callback()
      }
    }
    return {
      pickerOptionsEnd: {
        disabledDate: time => {
          if (Object.keys(this.detailObj).length === 0) {
            let nowDate = new Date();
            let year = nowDate.getFullYear()
            let month = nowDate.getMonth() + 1
            let date = nowDate.getDate()
            return time.getTime() < new Date(year + "/" + month + "/" + date).getTime()
          }
        }
      },
      loading: false,
      ruleForm: {
        resDate: '',
        demandSources: '',
        resPower: '',
        subsidyPrice: '',
        resStartTime: '',
        resEndTime: ''
      },
      xqly_options: [
        {
          label: '内部响应',
          value: 1
        },
        {
          label: '外部响应',
          value: 2
        }
      ],
      sb_options: [],
      rules: {
        resDate: [
          { required: true, message: '请选择响应日期', trigger: 'change' }
        ],
        demandSources: [
          { required: true, message: '请选择需求来源', trigger: 'change' }
        ],
        resPower: [
          { required: true, message: '请输入响应负荷', trigger: 'change' }
        ],
        subsidyPrice: [
          { validator: xq, message: '请输入补贴单价', trigger: 'change' }
        ],
        resStartTime: [
          { required: true, message: '请选择响应开始时间', trigger: 'input' }
        ],
        resEndTime: [
          { required: true, message: '请选择响应结束时间', trigger: 'input' }
        ]
      },
      userName_options: []
    }
  },
  created() {
    if (Object.keys(this.detailObj).length !== 0) {
      let {
        resDate,
        demandSources,
        resPower,
        subsidyPrice,
        resStartTime,
        resEndTime,
      } = this.detailObj

      this.ruleForm = {
        resDate,
        demandSources,
        resPower,
        subsidyPrice,
        resStartTime,
        resEndTime,
      }
    }
  },
  methods: {
    changAl() {
      this.$emit('close', false)
    },
    htrlFilter(e) {
      this.$publicMethods.period(e)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          // 编辑
          let editMsg = { ...this.ruleForm }
          if (Object.keys(this.detailObj).length !== 0) {
            editMsg.id = this.detailObj.id
          }

          edit(editMsg).then(res => {
            this.loading = false
            let type = res.success ? 'success' : 'error'
            this.$message({ type, message: res.msg })
            if (res.success) this.$emit('close', false)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
