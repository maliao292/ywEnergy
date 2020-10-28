<template>
    <div class="MonContent">
      <p class="monConTit" >系统管理 - <span class="TitactiveColor">用户管理</span></p>

      <div class="monChosen">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>

          </el-form-item>
        </el-form>

      </div>

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

          :data="userList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="用户昵称" align="center" prop="username" :show-overflow-tooltip="true" />
          <el-table-column label="用户姓名" align="center" prop="lastName" :show-overflow-tooltip="true" />
          <el-table-column label="手机号码" align="center" prop="phonenumber" width="120" />
          <el-table-column label="邮箱" align="center" prop="email" />
          <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="控制下发" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.ifSwitch"
                :active-value="1"
                :inactive-value="0"
                @change="handleSwitchChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" >修改</el-button>
              <el-button v-if="scope.row.id !== 1" size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" >删除</el-button>
              <el-button size="mini" type="text" icon="el-icon-key" @click="handleResetPwd(scope.row)" >重置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination class="systemPageNation" v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </div>

      <!-- 添加或修改参数配置对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户昵称" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户昵称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.id == undefined" label="用户名称" prop="lastName">
                <el-input v-model="form.lastName" placeholder="请输入用户名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="form.id == undefined" label="用户密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色">
                <el-select v-model="form.roleIds" multiple placeholder="请选择">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                    :disabled="item.status == 1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="控制下发">
                <el-radio-group v-model="form.ifSwitch">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="控制密码">
                <el-radio-group v-model="form.switchPass">
                  <el-radio :label="1">允许</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate } from "@/api/system/user";
  import { getToken } from "@/utils/auth";
  import { treeselect } from "@/api/system/dept";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

    export default {
        name: "index",
      components: { Treeselect },
      data() {
          return {
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 是否显示弹出层
            open: false,
            // 弹出层标题
            title: "",
            // 表单参数
            form: {},
            // 角色选项
            roleOptions: [],
            // 状态数据字典
            statusOptions: [],
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              username: undefined,
              phonenumber: undefined,
              status: undefined,
              deptId: undefined
            },
            // 总条数
            total: 0,
            // 用户表格数据
            userList: null,
            // 表单校验
            rules: {
              username: [
                { required: true, message: "用户名称不能为空", trigger: "blur" }
              ],
              lastName: [
                { required: true, message: "用户昵称不能为空", trigger: "blur" }
              ],
              password: [
                { required: true, message: "用户密码不能为空", trigger: "blur" }
              ],
              email: [
                { required: true, message: "邮箱地址不能为空", trigger: "blur" },
                {
                  type: "email",
                  message: "'请输入正确的邮箱地址",
                  trigger: ["blur", "change"]
                }
              ],
              phonenumber: [
                { required: true, message: "手机号码不能为空", trigger: "blur" },
                {
                  pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                  message: "请输入正确的手机号码",
                  trigger: "blur"
                }
              ]
            }
          }
      },
      created() {
        this.getList();
        // this.getTreeselect();
      },
      methods: {
        /** 查询用户列表 */
        getList() {
          this.loading = true;
          listUser(this.queryParams).then(response => {
              this.userList = response.rows;
              this.total = response.total;
              this.loading = false;
            }
          );
        },
        /** 查询部门下拉树结构 */
        getTreeselect() {
          treeselect().then(response => {
            this.deptOptions = response.data;
          });
        },
        // 筛选节点
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        // 节点单击事件
        handleNodeClick(data) {
          this.queryParams.deptId = data.id;
          this.getList();
        },
        // 用户状态修改
        handleStatusChange(row) {
          let text = row.status === 1 ? "启用" : "停用";
          this.$confirm('确认要"' + text + '""' + row.lastName + '"用户吗?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            const params = {
                id:row.id,
                status:row.status
            }
            return changeUserStatus(params);
          }).then(() => {
            this.msgSuccess(text + "成功");
          }).catch(function() {
            row.status = row.status === 1 ? 0 : 1;
          });
        },
        // 控制下发修改
        handleSwitchChange(row){
          let text = row.ifSwitch === 1 ? "允许" : "禁止";
          this.$confirm('确认要"' + text + '""' + row.lastName + '"控制下发吗?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            const params = {
              id:row.id,
              ifSwitch:row.ifSwitch
            }
            return changeUserStatus(params);
          }).then(() => {
            this.msgSuccess(text + "成功");
          }).catch(function() {
            row.ifSwitch = row.ifSwitch === 1 ? 0 : 1;
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
            username: undefined,
            lastName: undefined,
            password: undefined,
            phonenumber: undefined,
            email: undefined,
            status: 0,
            ifSwitch: 0,
            remark: undefined,
            roleIds: []
          };
          this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
          this.queryParams.page = 1;
          this.getList();
        },

        // 多选框选中数据
        handleSelectionChange(selection) {
          this.ids = selection.map(item => item.id);
          this.single = selection.length != 1;
          this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
          this.reset();
          // this.getTreeselect();
          getUser().then(response => {
            this.postOptions = response.posts;
            this.roleOptions = response.roles;
            this.open = true;
            this.title = "添加用户";
            this.form.password = this.initPassword;
          });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
          console.log(row);
          this.reset();
          // this.getTreeselect();
          const userId = row.id || this.ids;
          console.log(userId);
          getUser(userId).then(response => {
            this.form = response.data;
            // this.postOptions = response.posts;
            this.roleOptions = response.roles;
            this.form.postIds = response.postIds;
            this.form.roleIds = response.roleIds;
            this.open = true;
            this.title = "修改用户";
            this.form.password = "";
          });
        },
        /** 重置密码按钮操作 */
        handleResetPwd(row) {
          this.$prompt('请输入"' + row.username + '"的新密码', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(({ value }) => {
            resetUserPwd(row.userId, value).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功，新密码是：" + value);
              }
            });
          }).catch(() => {});
        },
        /** 提交按钮 */
        submitForm: function() {
          this.$refs["form"].validate(valid => {
            if (valid) {
              if (this.form.id != undefined) {
                updateUser(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess("修改成功");
                    this.open = false;
                    this.getList();
                  }
                });
              } else {
                addUser(this.form).then(response => {
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
          const userIds = row.id || this.ids;
          this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return delUser(userIds);
          }).then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          }).catch(function() {});
        },

      }
    }
</script>

<style  scoped>
  .systemPageNation>>>.el-pagination{
    text-align: right;
  }
</style>
