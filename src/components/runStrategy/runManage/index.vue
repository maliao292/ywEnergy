<template>
    <div class="MonContent">
      <p class="monConTit" >运行策略管理 - <span class="TitactiveColor">策略管理</span></p>

      <div class="monChosen">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="" >
            <el-select v-model="queryParams.usertype" placeholder="请选择用户类型" clearable >
              <el-option
                v-for="dict in userTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="queryParams.username"
              placeholder="请输入用户名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="queryParams.devicetype" placeholder="请选择设备类型" clearable >
              <el-option
                v-for="dict in shebeiOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="queryParams.devicename"
              placeholder="请输入设备名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="queryParams.funcconfigid" placeholder="请选择策略名称" clearable filterable>
              <el-option
                v-for="dict in celueOptions"
                :key="dict.id"
                :label="dict.name"
                :value="dict.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="queryParams.status" placeholder="请选择启用状态" clearable >
              <el-option
                v-for="dict in statusOptions"
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
      <!--操作按钮-->
      <div style="display: flex;justify-content: space-between">
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
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
              @click="defBinding"
            >
              批量策略绑定
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >
              全部启用
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              size="mini"
            >
              全部停用
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <div class="reportCon_table">
        <el-table
          :data="tableList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column label="用户类型" align="center" prop="usertypes" />
          <el-table-column label="用户名称" align="center" prop="username" />
          <el-table-column label="设备名称" align="center" prop="devicename" />
          <el-table-column label="设备类型" align="center" prop="devicetype" />
          <el-table-column label="策略名称" align="center" prop="name" />
          <el-table-column label="启用" align="center" prop="status" >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                active-color="#19D26C"
                inactive-color="#DCDFE6">
              </el-switch>
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
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户类型" >
            <el-select v-model="form.usertype" placeholder="请选择用户类型" clearable style="width: 100%;">
              <el-option
                v-for="dict in userTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-select v-model="form.userid" placeholder="请选择用户名称" clearable style="width: 100%;" >
              <el-option
                v-for="dict in yonghuOptions"
                :key="dict.id"
                :label="dict.stationName"
                :value="dict.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-select v-model="form.deviceid" placeholder="请选择设备名称" clearable  style="width: 100%;">
              <el-option
                v-for="dict in shebeiNameOptions"
                :key="dict.id"
                :label="dict.deviceName"
                :value="dict.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="策略名称">
            <el-select v-model="form.funcconfigid" placeholder="请选择策略名称" clearable filterable  style="width: 100%;">
              <el-option
                v-for="dict in celueOptions"
                :key="dict.id"
                :label="dict.name"
                :value="dict.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="form.status" placeholder="请选择启用状态" clearable  style="width: 100%;">
              <el-option
                v-for="dict in statusOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
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

      <!--批量策略绑定-->
      <el-dialog title="批量策略绑定" :visible.sync="open_cl" width="800px" append-to-body>
        <el-form ref="form_cl" :model="form_cl" :rules="rules_cl" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="策略类型" prop="type">
                <el-select v-model="form_cl.type" placeholder="请选择策略类型" clearable style="width: 100%;">
                  <el-option
                    v-for="dict in strategyOptions"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="策略名称" prop="funcconfigid">
                <el-select v-model="form_cl.funcconfigid" placeholder="请选择策略名称" clearable filterable  style="width: 100%;">
                  <el-option
                    v-for="dict in celueOptions"
                    :key="dict.id"
                    :label="dict.name"
                    :value="dict.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备类型">
                <el-select v-model="form_cl.devicetype" placeholder="请选择设备类型" clearable style="width: 100%;">
                  <el-option
                    v-for="dict in shebeiOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户类型" >
                <el-select v-model="form_cl.usertype" placeholder="请选择用户类型" clearable style="width: 100%;">
                  <el-option
                    v-for="dict in userTypeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称">
                <el-select v-model="form_cl.userid" placeholder="请选择用户名称" clearable style="width: 100%;" >
                  <el-option
                    v-for="dict in yonghuOptions"
                    :key="dict.id"
                    :label="dict.stationName"
                    :value="dict.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

        <el-table
          :data="tableList"
          height="300"
          @selection-change="handleSelectionChange_cl"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="设备名称" align="center" prop="devicename" />
          <el-table-column label="设备类型" align="center" prop="devicetype" />
          <el-table-column label="用户类型" align="center" prop="usertypes" />
          <el-table-column label="用户名称" align="center" prop="username" />
        </el-table>

        <div slot="footer" class="dialog-footer" style="position: relative">
          <div class="cl_chosenInfo">
            <p>设备总数:{{tableList.length}}</p>
          </div>

          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel_cl">取 消</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import {listConfig} from '@/api/runStrategy/definition'
  import { listStation} from "@/api/user/station";
  import { listIotDevice } from "@/api/device/iotDevice";
  import {listFucMan,addFucMan,getFucMan,updateFucMan,delFucMan} from '@/api/runStrategy/definitionManagement'
    export default {
      name: "index",
      data() {
        return {
          // 字典
          userTypeOptions: [],
          shebeiOptions: [],
          celueOptions: [],
          yonghuOptions: [],
          shebeiNameOptions: [],
          statusOptions: [{
            value: 1,
            label: '启用'
          },{
            value: 0,
            label: '关闭'
          }],
          // 策略类型下拉
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
          queryParams: {
            pageNum: 1,
            pageSize: 10,
            usertype: undefined,
            userid: undefined,
            devicetype: undefined,
            devicename: undefined,
            funcconfigid: undefined,
            status: undefined
          },
          // 非单个禁用
          single: true,
          // 非多个禁用
          multiple: true,
          total: 0,
          // 列表
          tableList: [],
          // 表单参数
          form: {},
          form_cl: {},
          // 表单校验
          rules: {},
          rules_cl: {
            type:[{ required: true, message: '请选择策略类型', trigger: 'change' }],
            funcconfigid: [{ required: true, message: '请选择策略名称', trigger: 'change' }]
          },
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,
          open_cl: false,
          // 选中数组
          ids: [],
          ids_cl: []
        }
      },
      created() {
        this.getList();
        // 用户类别
        this.getDicts("yw_user_type").then(response => {
          this.userTypeOptions = response.data;
        });
        // 用户设备类型
        this.getDicts("yw_comm_device_type").then(response => {
          this.shebeiOptions = response.data;
        });
        // 查询策略下拉
        listConfig().then(res => {
          // console.log(res);
          this.celueOptions = res.rows
        })
        // 用户下拉
        listStation({type: 2}).then(res => {
          // console.log(res);
          this.yonghuOptions = res.data
        })
        // 设备下拉
        listIotDevice().then(res => {
          this.shebeiNameOptions = res.rows
        })
      },
      methods: {
        // 字典状态字典翻译
        shebeiFormat(row, column) {
          return this.selectDictLabel(this.shebeiOptions, row.deviceType);
        },
        /** 查询列表 */
        getList() {
          listFucMan(this.queryParams).then(response => {
            this.tableList = response.rows;
            this.total = response.total;
          });
        },

        // 取消按钮
        cancel() {
          this.open = false;
          this.reset();
        },
        cancel_cl() {
          this.open_cl = false
          this.reset_cl()
        },
        // 表单重置
        reset() {
          this.form = {
            usertype: undefined,
            username: undefined,
            userid: undefined,
            deviceid: undefined,
            funcconfigid: undefined,
            status: undefined
          };
          this.resetForm("form");
        },
        reset_cl() {
          this.form_cl = {
            type: undefined,
            usertype: undefined,
            userid: undefined,
            devicetype: undefined,
            funcconfigid: undefined,
          };
          this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.pageNum = 1;
          this.getList();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
          this.ids = selection.map(item => item.id)
          this.single = selection.length!=1
          this.multiple = !selection.length
        },
        handleSelectionChange_cl(selection) {
          this.ids_cl = selection.map(item => item.id)
          console.log(this.ids_cl);
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
          getFucMan(id).then(response => {
            this.form = response.data;
            this.form.usertype = String(response.data.usertype)
            this.open = true;
            this.title = "修改";
          });
        },
        /** 提交按钮 */
        submitForm: function() {
          this.$refs["form"].validate(valid => {
            if (valid) {
              if (this.form.id != undefined) {
                updateFucMan(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess("修改成功");
                    this.open = false;
                    this.getList();
                  }
                });
              } else {
                addFucMan(this.form).then(response => {
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
            return delFucMan(ids);
          }).then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          }).catch(function() {});
        },

        // 策略绑定
        defBinding() {
          this.open_cl = true
        },
      },
    }
</script>

<style scoped>

  .cl_chosenInfo{
    position: absolute;
    left: 10px;
    top: 10px;
  }
</style>
