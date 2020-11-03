<template>
  <div class="MonContent">
    <p class="monConTit" >运行策略管理 - <span class="TitactiveColor">策略定义</span></p>

    <div class="monChosen">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="" >
          <el-select v-model="queryParams.type" placeholder="请选择策略类型" class="monStaSelect" @change="changeStrFuc">
            <el-option
              v-for="dict in strategyOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入策略名称"
            class="monStaSelect"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <battery-page ref="batteryPage" :paramInfo='paramInfo' v-if="queryParams.type == 1"/>

    <conditioner-page ref="conditionerPage" :paramInfo='paramInfo' v-if="queryParams.type == 2"/>

    <schedule-page ref="schedulePage" :paramInfo='paramInfo' v-if="queryParams.type == 3"/>

  </div>
</template>

<script>
  import batteryPage from './battery'
  import conditionerPage from './conditioner'
  import schedulePage from './schedule'

    export default {
      components: {
        batteryPage,
        conditionerPage,
        schedulePage
      },
      name: "index",
      data() {
          return {

            queryParams: {
              pageNum: 1,
              pageSize: 10,
              type: 1,
              name: undefined,
            },
            // 策略下拉
            strategyOptions: [{
              value: 1,
              label: '电池'
            },{
              value: 2,
              label: '空调'
            },{
              value: 3,
              label: '时间表'
            },],
            // 列表
            tableList: [],
            //传给子页面的数据
            paramInfo: {}
          }
      },
      mounted() {

      },
      methods: {
        // 策略切换
        changeStrFuc() {
          this.paramInfo = this.queryParams
        },

        /** 搜索按钮操作 */
        handleQuery() {
          this.paramInfo = this.queryParams
          // console.log(this.paramInfo);
          if(this.queryParams.type == 1){
            this.$refs.batteryPage.getList()
          } else if (this.queryParams.type == 2) {
            this.$refs.conditionerPage.getList()
          }else if (this.queryParams.type == 3) {
            this.$refs.schedulePage.getList()
          }

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
