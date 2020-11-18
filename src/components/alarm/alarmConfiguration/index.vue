<template>
  <div class="MonContent">
    <p class="monConTit" >报警管理 - <span class="TitactiveColor">报警配置</span></p>

    <div class="monChosen">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="80px">
        <el-form-item label="" prop="checkPointName">
          <el-input
            v-model="queryParams.checkPointName"
            placeholder="请输入采控终端名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="" prop="grade">
          <el-select v-model="queryParams.grade" placeholder="请选择报警等级" clearable >
            <el-option
              v-for="dict in alarmGradeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="grade">
          <el-select v-model="queryParams.type" placeholder="请选择报警类型" clearable >
            <el-option
              v-for="dict in alarmTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "index",
      data() {
          return {
            alarmTypeOptions: [],
            alarmGradeOptions: [],
            total: 0,
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              checkPointName: undefined,
              grade:undefined,
              type: undefined
            }
          }
      },
      created() {
        // this.getList()

        //告警类型
        this.getDicts("alarmType").then(response => {
          this.alarmTypeOptions = response.data;
        });
        //告警等级
        this.getDicts("alarmGrade").then(response => {
          this.alarmGradeOptions = response.data;
        });
      },
      mounted() {},
      methods: {
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
        },
      }
    }
</script>

<style scoped>

</style>
