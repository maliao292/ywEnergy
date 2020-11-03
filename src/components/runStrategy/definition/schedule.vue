<template>
  <div>
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"

          >新增</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="reportCon_table">
      <el-table
        ref="tableList"
        :data="tableList"
        height="270"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <!--<el-table-column type="selection" width="55" align="center" />-->
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="策略名称" align="center" prop="name" />
        <el-table-column label="策略类型" align="center" prop="" >
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">电池</span>
            <span v-if="scope.row.type==2">空调</span>
            <span v-if="scope.row.type==3">时间表</span>
          </template>
        </el-table-column>
        <el-table-column label="终端设备类型" align="center" prop="deviceType" :formatter="zdFormat"/>

        <el-table-column label="操作" width="150" align="center" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"

            >删除</el-button>
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

    <div style="margin-top: 15px">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd_sjb"

          >新增</el-button>
        </el-col>
      </el-row>
    </div>
    <!--时间表明细-->
    <div class="reportCon_table">
      <el-table
        ref="tableList_sjb"
        :data="tableList_sjb"
        height="270"

      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="时刻" align="center" prop="stime" />
        <el-table-column label="动作" align="center" prop="action">
          <template slot-scope="scope">
            <span v-if="scope.row.action == 1">充电</span>
            <span v-if="scope.row.action == 2">放电</span>
            <span v-if="scope.row.action == 3">待机</span>
            <span v-if="scope.row.action == 4">开启</span>
            <span v-if="scope.row.action == 5">关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate_sjb(scope.row)"

            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete_sjb(scope.row)"

            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total_sjb>0"
        :total="total_sjb"
        :page.sync="queryParams_sjb.pageNum"
        :limit.sync="queryParams_sjb.pageSize"
        @pagination="getList"
      />

    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="策略名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入策略名称" />
        </el-form-item>
        <el-form-item label="策略类型" prop="type">
          <el-select  v-model="form.type" placeholder="请选择策略类型" style="width: 100%;" disabled>
            <el-option
              v-for="dict in strategyOptions"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终端设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" placeholder="请选择终端设备类型" style="width: 100%;">
            <el-option
              v-for="dict in zdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title_sjb" :visible.sync="open_sjb" width="500px" append-to-body>
      <el-form ref="form_sjb" :model="form_sjb" label-width="100px">
        <el-form-item label="时刻" prop="stime">
          <!--<el-input v-model="form_sjb.stime" placeholder="请输入" />-->
          <el-time-picker
            v-model="form_sjb.stime"
            placeholder="请选择时刻"
            value-format="HH:mm:ss"
            style="width: 100%;"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="终端设备类型" prop="deviceType">
          <el-select v-model="recentDeviceType" placeholder="请选择终端设备类型" style="width: 100%;" disabled>
            <el-option
              v-for="dict in zdOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作" prop="action">
          <el-select v-model="form_sjb.action" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="dict in actionOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm_sjb">确 定</el-button>
        <el-button @click="cancel_sjb">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listConfig,getStrategy,addStrategy,updateStrategy,delStrategy } from '@/api/runStrategy/definition'
  import {listConfig_det,getStrategy_det,addStrategy_det,updateStrategy_det,delStrategy_det  ,getDetailAction} from '@/api/runStrategy/definition_detail'
  export default {
    props: {
      paramInfo:{
        type:Object,
        required: true
      }
    },
    name: "battery",
    data() {
      return {
        queryParams: {
          pageNum: 1,
          pageSize: 5,
          name: undefined,
          type: 3,
        },
        queryParams_sjb: {
          pageNum: 1,
          pageSize: 5,
          pid: ''
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
        // 终端下拉
        zdOptions: [],
        // 动作下拉
        actionOptions: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        total_sjb: 0,
        // 列表
        tableList: [],
        tableList_sjb: [],
        // 表单参数
        form: {},
        form_sjb: {},
        recentDeviceType: '', // 当前选中的终端设备
        recentpid: '', // 当前选中的pid
        // 表单校验
        rules: {},
        // 弹出层标题
        title: "",
        title_sjb: "",
        // 是否显示弹出层
        open: false,
        open_sjb: false,
      }
    },
    created() {
      this.getList();

      // console.log(this.paramInfo);

      this.getDicts("yw_ter_device_type").then(response => {
        this.zdOptions = response.data;
      });
    },
    mounted() {

    },
    watch: {
      paramInfo: {
        handler: function () {
          // console.log(this.paramInfo);
          this.queryParams = this.paramInfo
        },
        deep: true
      },
      tableList: function () {
        this.$nextTick(function() {
          this.$refs.tableList.setCurrentRow(this.tableList[0])
          this.queryParams_sjb.pid = this.tableList[0].id
          this.recentpid = this.tableList[0].id // 新增传的id
          this.recentDeviceType = String(this.tableList[0].deviceType) // 新增明细默认选中的终端
          this.getList_sjb()
          // 获取动作下拉
          this.geyActionSelect()
        })
      }
    },
    methods: {
      // 字典状态字典翻译
      zdFormat(row, column) {
        return this.selectDictLabel(this.zdOptions, row.deviceType);
      },

      /** 查询列表 */
      getList() {
        listConfig(this.queryParams).then(response => {
          this.tableList = response.rows;
          this.total = response.total;
        });
      },
      getList_sjb(){
        listConfig_det(this.queryParams_sjb).then(response => {
          this.tableList_sjb = response.rows;
          this.total_sjb = response.total;
        });
      },

      // 获取动作下拉
      geyActionSelect() {
        getDetailAction({deviceType: this.recentDeviceType}).then(res => {
          // console.log(res);
          this.actionOptions = res.data
        })
      },

      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      cancel_sjb() {
        this.open_sjb = false;
        this.reset_sjb();
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          name: undefined,
          type: 3,
          deviceType: undefined,
        };
        this.resetForm("form");
      },
      reset_sjb() {
        this.form_sjb = {
          id: undefined,
          pid: undefined,
          action: undefined,
          stime: undefined,
          deviceType: ''
        };
        this.resetForm("form_sjb");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!=1
        this.multiple = !selection.length
      },

      handleCurrentChange(val) {
        // console.log(val);
        this.queryParams_sjb.pid = val.id
        this.recentDeviceType = String(val.deviceType)
        this.recentpid = val.id
        this.getList_sjb()
        // 获取动作下拉
        this.geyActionSelect()
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "新增";
      },
      handleAdd_sjb() {
        this.reset_sjb();
        this.open_sjb = true;
        this.title_sjb = "新增时间明细";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getStrategy(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改";
        });
      },
      handleUpdate_sjb(row) {
        this.reset_sjb();
        const id = row.id
        getStrategy_det(id).then(response => {
          this.form_sjb = response.data;
          this.form_sjb.action = String(response.data.action);
          this.open_sjb = true;
          this.title_sjb = "修改时间表明细";
        });
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateStrategy(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addStrategy(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                }
              });
            }
          }
        });
      },
      submitForm_sjb: function() {
        this.form_sjb.pid = this.recentpid

        // console.log(this.form_sjb.pid);
        if (this.form_sjb.id != undefined) {
          updateStrategy_det(this.form_sjb).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功");
              this.open_sjb = false;
              this.getList_sjb();
            }
          });
        } else {
          addStrategy_det(this.form_sjb).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open_sjb = false;
              this.getList_sjb();
            }
          });
        }
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStrategy(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      handleDelete_sjb(row){
        const ids = row.id
        this.$confirm('是否确认删除数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStrategy_det(ids);
        }).then(() => {
          this.getList_sjb();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      }
    }
  }
</script>

<style scoped>
  .reportCon_table{
    height: auto;
  }
</style>
