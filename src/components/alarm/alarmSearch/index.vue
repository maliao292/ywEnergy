<template>
  <div class="MonContent">
    <p class="monConTit" >报警管理 - <span class="TitactiveColor">报警查询</span></p>

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
        <el-form-item label="" prop="action">
          <el-select v-model="queryParams.action" placeholder="请选择报警动作" clearable >
            <el-option
              v-for="dict in alarmActionOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
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
        <el-form-item label="">
          <el-date-picker
            v-model="queryParams.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            :picker-options="startDatePicker"
            placeholder="报警开始时间"
          ></el-date-picker>
          ~
          <el-date-picker
            v-model="queryParams.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            :picker-options="endDatePicker"
            placeholder="报警结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryParams.grade" placeholder="请选择确认状态" clearable >
            <el-option
              v-for="dict in alarmConfirmOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="display: flex;justify-content: flex-end">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            @click="allConfirm"
          >
            全部确认
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!--列表-->
    <div class="reportCon_table">
      <el-table
        :data="tableList"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号" align="center" width="55"/>
        <el-table-column label="采控终端名称" align="center" prop="jianCeDianName" />
        <el-table-column label="值" align="center" prop="value" />
        <el-table-column label="报警动作" align="center" prop="action" :formatter="actionFormat"/>
        <el-table-column label="报警等级" align="center" prop="grade" :formatter="gradeFormat"/>
        <el-table-column label="确认状态" align="center" prop="confirm" >
          <template slot-scope="scope">
            <span v-if="scope.row.confirm==1">已确认</span>
            <span v-if="scope.row.confirm==0">未确认</span>
          </template>
        </el-table-column>
        <el-table-column label="报警时间" align="center" prop="updateTime" />
        <el-table-column label="恢复时间" align="center" prop="resumeTime" >
          <template slot-scope="scope">
            {{scope.row.resumeTime?scope.row.resumeTime:'-'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleComfirm(scope.row)"
            >确认</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
  import {listAlarmSearch,confirmAlarm,confirmAlarm_all} from '@/api/alarm/alarmSearch'

    export default {
      data() {
          return {
            // 下拉数据
            alarmActionOptions: [],
            alarmGradeOptions: [],
            alarmConfirmOptions: [ // 确认状态下拉
              {
                value: '1',
                label: '已确认'
              },{
                value: '0',
                label: '未确认'
              },
              {
                value: '',
                label: '全部'
              }
            ],
            startDatePicker: this.beginDate(), // 时间选择器
            endDatePicker: this.processDate(),

            tableList: [],
            total: 0,
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              checkPointName: undefined,
              action:undefined,
              grade:undefined,
              startTime:undefined,
              endTime: undefined,
              confirm:undefined,
            }
          }
      },
      created() {
        this.getList()

        //告警动作
        this.getDicts("alarmAction").then(response => {
          this.alarmActionOptions = response.data;
        });
        //告警等级
        this.getDicts("alarmGrade").then(response => {
          this.alarmGradeOptions = response.data;
        });
      },
      mounted() {},
      methods: {
        // 字典状态字典翻译
        actionFormat(row, column) {
          return this.selectDictLabel(this.alarmActionOptions, row.action);
        },
        gradeFormat(row, column) {
          return this.selectDictLabel(this.alarmGradeOptions, row.grade);
        },

        // 时间选择器
        beginDate() {
          const self = this;
          return {
            disabledDate(time) {
              if (self.queryParams.endTime) {
                // 如果结束时间不为空，则小于结束时间
                return new Date(self.queryParams.endTime).getTime() < time.getTime();
              } else {
                // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
              }
            }
          };
        },
        processDate() {
          const self = this;
          return {
            disabledDate(time) {
              if (self.queryParams.startTime) {
                // 如果开始时间不为空，则结束时间大于开始时间
                return new Date(self.queryParams.startTime).getTime() > time.getTime();
              } else {
                // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
              }
            }
          };
        },
        /** 查询采集设备管理列表 */
        getList() {
          listAlarmSearch(this.queryParams).then(response => {
            this.tableList = response.rows;
            this.total = response.total;
          });
        },
        // 表格状态
        tableRowClassName({row, rowIndex}) {
          if(row.action == 0){
            if (row.grade == 0) {
              return 'MaxWarning';
            } else if (row.grade == 1) {
              return 'importantWarning';
            } else if (row.grade == 2) {
              return 'commonWarning';
            } else if (row.grade == 3) {
              return 'Warning';
            }
          } else if(row.action == 1){
            return 'recover';
          }
          return '';
        },
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
        },
        // 单个确认
        handleComfirm(row) {
          let ids = {
            ids: row.id
          }
          this.$confirm('是否确认数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return confirmAlarm(ids);
          }).then(() => {
            this.getList();
            this.msgSuccess("确认成功");
          }).catch(function() {});
        },
        // 全部确认
        allConfirm() {
          this.$confirm('是否全部确认数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return confirmAlarm_all();
          }).then(() => {
            this.getList();
            this.msgSuccess("全部确认成功");
          }).catch(function() {});
        },

      },
    }
</script>

<style >
  .el-table .MaxWarning td{
    color: #f35423!important;
  }
  .el-table .importantWarning td{
    color: #ffa128!important;
  }
  .el-table .commonWarning td{
    color: #ffee2b!important;
  }
  .el-table .Warning td{
    color: #ffffff!important;
  }
  .el-table .recover td{
    color: #00d98b!important;
  }
</style>
