<template>
  <div class="yctListCon bg_fff">
    <div class="listHead"><span>
        <slot></slot>
      </span><i class="fr el-icon-close" @click="changAl"></i></div>
    <div class="form">
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="helf-ruleForm self_ruleform">
        <el-form-item label="客户名称" prop="customerId">
          <el-select v-model="ruleForm.customerId" placeholder="请选择" filterable clearable @change="getSbFun" :disabled="!!detailObj.id">
            <el-option v-for="item in userName_options" :key="item.id" :label="item.station_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同容量" prop="capacity">
          <el-input v-model="ruleForm.capacity" placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>
        <el-form-item label="响应设备" prop="deviceId">
          <el-select v-model="ruleForm.deviceId" placeholder="请选择" filterable>
            <el-option v-for="item in sb_options" :key="item.id" :label="item.device_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="约定响应能力（kW）" prop="appointPower">
          <el-input v-model="ruleForm.appointPower" placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>
        <el-form-item label="单价（元/h/kW）" prop="price">
          <el-input v-model="ruleForm.price " placeholder="请输入内容" @input.native="htrlFilter($event)"></el-input>
        </el-form-item>
        <el-form-item label="参与年份" prop="joinYear">
          <el-date-picker v-model="ruleForm.joinYear" placeholder="请输入内容" type="year" value-format="yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="响应开始时间" prop="startTime">
          <el-time-select placeholder="请选择" v-model="ruleForm.startTime" :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '23:00',
                maxTime: ruleForm.endTime
              }">
          </el-time-select>
        </el-form-item>
        <el-form-item label="响应结束时间" prop="endTime">
          <el-time-select placeholder="请选择" v-model="ruleForm.endTime" :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00',
      minTime: ruleForm.startTime
    }"></el-time-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" style="width:99%">
          <el-input style="width:99%" v-model="ruleForm.remark " placeholder="请输入内容" type='textarea'></el-input>
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
import { staList as user, deviceList as signSbList, signSaveOrEdit as edit } from '@/api/sideDemand'
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
        customerId: '',
        capacity: '',
        deviceId: '',
        appointPower: '',
        price: '',
        joinYear: '',
        startTime: '',
        endTime: '',
        remark: ''
      },
      sb_options: [],
      rules: {
        customerId: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        capacity: [
          { required: true, message: '请输入合同容量', trigger: 'change' }
        ],
        deviceId: [
          { required: true, message: '请选择响应设备', trigger: 'change' }
        ],
        appointPower: [
          { required: true, message: '请输入约定响应能力', trigger: 'change' }
        ],
        price: [{ required: true, message: '请输入单价', trigger: 'input' }],
        joinYear: [{ required: true, message: '请选择参与年份', trigger: 'input' }],
        startTime: [
          { required: true, message: '请选择响应开始时间', trigger: 'input' }
        ],
        endTime: [
          { required: true, message: '请选择响应结束时间', trigger: 'input' }
        ]
      },
      userName_options: []
    }
  },
  created() {
    // 用户列表
    user().then(res => {
      this.userName_options = res.data
    })

    if (Object.keys(this.detailObj).length !== 0) {
      let {
        customerId,
        capacity,
        deviceId,
        appointPower,
        price,
        joinYear,
        startTime,
        endTime,
        remark,
      } = this.detailObj
      signSbList({ stationId: customerId }).then(res => {
        this.sb_options = res
        this.ruleForm = {
          customerId,
          capacity,
          deviceId,
          appointPower,
          price,
          joinYear:joinYear.toString(),
          startTime,
          endTime,
          remark,
        }
      })
    }
  },
  methods: {
    changAl() {
      this.$emit('close', false)
    },
    async getSbFun() {
      let res = await signSbList({ stationId: this.ruleForm.customerId })
      this.sb_options = res.data
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
          if (Object.keys(this.detailObj).length!== 0) {
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
