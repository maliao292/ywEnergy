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
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"

          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"

          >删除</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="reportCon_table">
      <el-table

        :data="tableList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column label="策略名称" align="center" prop="name" />
        <el-table-column label="策略类型" align="center" prop="" >
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">电池</span>
            <span v-if="scope.row.type==2">空调</span>
            <span v-if="scope.row.type==3">时间表</span>
          </template>
        </el-table-column>
        <el-table-column label="空调开启温度(℃)" align="center" prop="opentemp"/>
        <el-table-column label="空调关闭温度(℃)" align="center" prop="closetemp" />
        <el-table-column label="操作" width="150" align="center" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"

            >修改</el-button>
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
          <!--<el-input v-model="form.type" placeholder="请输入设备名称" />-->
        </el-form-item>
        <el-form-item label="空调开启温度(℃)" prop="opentemp">
          <el-input v-model="form.opentemp" placeholder="请输入放电电压下限" />
        </el-form-item>
        <el-form-item label="空调关闭温度(℃)" prop="closetemp">
          <el-input v-model="form.closetemp" placeholder="请输入放电电量下限" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listConfig,getStrategy,addStrategy,updateStrategy,delStrategy} from '@/api/runStrategy/definition'
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
          pageSize: 10,
          name: undefined,
          type: 2,
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
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 列表
        tableList: [],
        // 表单参数
        form: {},
        // 表单校验
        rules: {},
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
      }
    },
    created() {
      this.getList();

      // console.log(this.paramInfo);
    },
    watch: {
      paramInfo: {
        handler: function () {
          console.log(this.paramInfo);
          this.queryParams = this.paramInfo
        },
        deep: true
      }
    },
    methods: {

      /** 查询采集设备管理列表 */
      getList() {
        listConfig(this.queryParams).then(response => {
          this.tableList = response.rows;
          this.total = response.total;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          name: undefined,
          type: 2,
          opentemp: undefined,
          closetemp: undefined,
        };
        this.resetForm("form");
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
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "新增";
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
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除采集设备管理编号为"' + ids + '"的数据项?', "警告", {
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

    }
  }
</script>

<style scoped>

</style>
