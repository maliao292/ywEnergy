<template>
  <div class="MonContent">
    <p class="monConTit" >设备管理 - <span class="TitactiveColor">用户设备管理</span></p>

    <div class="monChosen">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="资产编号" prop="assetTag">
          <el-input
            v-model="queryParams.assetTag"
            placeholder="请输入资产编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
          <el-input
            v-model="queryParams.deviceName"
            placeholder="请输入设备名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="queryParams.deviceType" placeholder="请选择设备类型" clearable size="small">
            <el-option
              v-for="dict in shebeiOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属用户" prop="usedby">
          <treeselect
            style="width: 200px;"
            v-model="queryParams.usedby"
            :options="stationOptions"
            :normalizer="normalizer"
            placeholder="请选择用户"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
        <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"

          >导出</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="reportCon_table">
      <el-table

        :data="iotDeviceList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!--<el-table-column label="主键" width="55" align="center" prop="id" />-->
        <el-table-column label="资产编号" align="center" prop="assetTag" />
        <el-table-column label="设备名称" align="center" prop="deviceName" />
        <el-table-column label="设备类型" align="center" prop="deviceType" :formatter="shebeiFormat"/>
        <el-table-column label="生产厂商" align="center" prop="producer" />
        <el-table-column label="规格型号" align="center" prop="specification" />
        <el-table-column label="投运日期" align="center" prop="runDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.runDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="额定功率(KW)" align="center" prop="power" />
        <el-table-column label="电池容量(AH)" align="center" prop="batteryCapacity" />
        <el-table-column label="使用状况" align="center" prop="status" :formatter="statusFormat"/>
        <el-table-column label="安装地点" align="center" prop="location" />
        <el-table-column label="资产原值(元)" align="center" prop="cost" />
        <el-table-column label="购买时间" align="center" prop="buyTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.buyTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属用户" align="center" prop="usedbyName" />
        <el-table-column label="联系人名称" align="center" prop="contactName" />
        <el-table-column label="联系人电话" align="center" prop="contactPhone" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="采控终端" align="center" prop="jianCeDianName" />
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

    <!-- 添加或修改用户设备管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="资产编号" prop="assetTag">
              <el-input v-model="form.assetTag" placeholder="请输入资产编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="form.deviceName" placeholder="请输入设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型">
              <el-select v-model="form.deviceType" placeholder="请选择设备类型" style="width: 100%;">
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
            <el-form-item label="生产厂商" prop="producer">
              <el-input v-model="form.producer" placeholder="请输入生产厂商" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="specification">
              <el-input v-model="form.specification" placeholder="请输入规格型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投运日期" prop="runDate">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.runDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择投运日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额定功率(KW)" prop="power">
              <el-input v-model="form.power" placeholder="请输入额定功率(KW)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电池容量(AH)" prop="batteryCapacity">
              <el-input v-model="form.batteryCapacity" placeholder="请输入电池容量(AH)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用状况">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装地点" prop="location">
              <el-input v-model="form.location" placeholder="请输入安装地点" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产原值(元)" prop="cost">
              <el-input v-model="form.cost" placeholder="请输入资产原值(元)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购买时间" prop="buyTime">
              <el-date-picker clearable size="small" style="width: 200px"
                              v-model="form.buyTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择购买时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采控终端" prop="jianCeDianId" >
              <el-select v-model="form.jianCeDianId" placeholder="请选择采控终端" style="width: 100%;">
                <el-option
                  v-for="dict in caikongOptions"
                  :key="dict.id"
                  :label="dict.jianCeDianName"
                  :value="dict.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属用户" prop="usedby">
              <treeselect
                v-model="form.usedby"
                :options="stationOptions"
                :normalizer="normalizer"
                placeholder="请选择用户"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人名称" prop="contactName">
              <el-input v-model="form.contactName" placeholder="请输入联系人名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="请输入联系人电话" />
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
  import { listStation } from "@/api/user/station";
  // import { listIotDevice, getIotDevice, delIotDevice, addIotDevice, updateIotDevice, exportIotDevice,getCaikong } from "@/api/device/iotDevice";
  import { listCommDevice, getCommDevice, delCommDevice, addCommDevice, updateCommDevice, exportCommDevice,getCaikong } from "@/api/device/CommDevice";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: "IotDevice",
    components: { Treeselect },
    data() {
      return {
        shebeiOptions: [], // 设备下拉
        statusOptions: [],
        caikongOptions: [],
        // 用户档案树选项
        stationOptions: [],
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 采集设备管理表格数据
        iotDeviceList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          assetTag: undefined,
          deviceName: undefined,
          deviceType: undefined,
          usedby: undefined,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
      this.getTreeselect()

      this.getDicts("yw_comm_device_type").then(response => {
        this.shebeiOptions = response.data;
      });

      //使用状况
      this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
      });
      // 获取采控终端
      getCaikong().then(res => {
        this.caikongOptions = res.data
      })
    },
    methods: {
      // 字典状态字典翻译
      shebeiFormat(row, column) {
        return this.selectDictLabel(this.shebeiOptions, row.deviceType);
      },
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },

      /** 查询部门下拉树结构 */
      getTreeselect() {
        listStation().then(response => {
          this.stationOptions = [];
          const data = { id: 0, stationName: '顶级节点', children: [] };
          data.children = this.handleTree(response.data, "id", "pid");
          this.stationOptions.push(data);
        });
      },
      /** 转换用户档案数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.stationName,
          children: node.children
        };
      },

      /** 查询采集设备管理列表 */
      getList() {
        listCommDevice(this.queryParams).then(response => {
          this.iotDeviceList = response.rows;
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
          assetTag: undefined,
          deviceName: undefined,
          deviceType: undefined,
          producer: undefined,
          specification: undefined,
          runDate: undefined,
          power: undefined,
          batteryCapacity: undefined,
          status: "0",
          location: undefined,
          cost: undefined,
          buyTime: undefined,
          usedby: undefined,
          contactName: undefined,
          contactPhone: undefined,
          remark: undefined,
          createBy: undefined,
          createTime: undefined,
          updateBy: undefined,
          updateTime: undefined,
          jianCeDianId: undefined
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
        this.title = "添加用户设备管理";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getCommDevice(id).then(response => {
          this.form = response.data;
          this.form.status = String(response.data.status);
          this.open = true;
          this.title = "修改用户设备管理";
        });
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateCommDevice(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }
              });
            } else {
              addCommDevice(this.form).then(response => {
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
          return delCommDevice(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有采集设备管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCommDevice(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      }
    }
  };
</script>

<style scoped>

</style>
