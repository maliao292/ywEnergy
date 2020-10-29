<template>
  <div class="MonContent">
    <p class="monConTit" >用户管理 - <span class="TitactiveColor">用户档案</span></p>
    <!--表单-->
    <div class="monChosen">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="用户类别" prop="userType">
          <el-select v-model="queryParams.userType" placeholder="请选择用户类别" clearable size="small">
            <el-option
              v-for="dict in userTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="stationName">
          <el-input
            v-model="queryParams.stationName"
            placeholder="请输入用户名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--操作按钮-->
    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
          >新增</el-button>
        </el-col>
      </el-row>
    </div>
    <!--表格-->
    <div class="reportCon_table">
      <el-table

        :data="stationList"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="用户类别" align="center" prop="userType" :formatter="userTypeFormat"/>
        <el-table-column label="用户名称" align="center" prop="stationName" />
        <el-table-column label="基站类型" align="center" prop="type" :formatter="stationTypeFormat"/>
        <el-table-column label="室温告警值(℃)" align="center" prop="alarmTemp" />
        <el-table-column label="经度" align="center" prop="longitude" />
        <el-table-column label="纬度" align="center" prop="latitude" />
        <el-table-column label="合同容量" align="center" prop="volume" />
        <el-table-column label="用电类别" align="center" prop="electype" />
        <el-table-column label="户号" align="center" prop="accountno" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="联系人名称" align="center" prop="contactName" />
        <el-table-column label="联系人电话" align="center" prop="contactPhone" />

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
    </div>

    <!-- 添加或修改用户档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级用户" prop="pid">
              <treeselect
                v-model="form.pid"
                :options="stationOptions"
                :normalizer="normalizer"
                placeholder="请选择上级用户"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类别">
              <el-select v-model="form.userType" placeholder="请选择用户类别" clearable size="small">
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
            <el-form-item label="用户名称" prop="stationName">
              <el-input v-model="form.stationName" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基站类型">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option
                  v-for="dict in stationTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="室温告警值" prop="accountno">
              <el-input v-model="form.alarmTemp" placeholder="请输入户号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入纬度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同容量" prop="volume">
              <el-input v-model="form.volume" placeholder="请输入合同容量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用电类别">
              <el-select v-model="form.electype" placeholder="请选择用电类别">
                <el-option
                  v-for="dict in elecTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户号" prop="accountno">
              <el-input v-model="form.accountno" placeholder="请输入户号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人名称" prop="accountno">
              <el-input v-model="form.contactName" placeholder="请输入户号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="accountno">
              <el-input v-model="form.contactPhone" placeholder="请输入户号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="accountno">
              <el-input v-model="form.remark" placeholder="请输入户号" />
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
import { listStation, getStation, delStation, addStation, updateStation, exportStation } from "@/api/user/station";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Station",
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 字典
      userTypeOptions: [],
      stationTypeOptions: [],
      elecTypeOptions: [],
      // 用户档案表格数据
      stationList: [],
      // 用户档案树选项
      stationOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        userType: undefined,
        stationName: undefined,
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
    // 用户类别
    this.getDicts("yw_user_type").then(response => {
      this.userTypeOptions = response.data;
    });
    // 基站类型
    this.getDicts("yw_station_type").then(response => {
      this.stationTypeOptions = response.data;
    });
    // 用电类型
    this.getDicts("yw_elec_type").then(response => {
      this.elecTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询用户档案列表 */
    getList() {
      // this.loading = true;
      listStation(this.queryParams).then(response => {
        this.stationList = this.handleTree(response.data, "id", "pid");
        this.loading = false;
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
	/** 查询部门下拉树结构 */
    getTreeselect() {
      listStation().then(response => {
        this.stationOptions = [];
        const data = { id: 0, stationName: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "pid");
        this.stationOptions.push(data);
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
        userType: undefined,
        stationName: undefined,
        pid: undefined,
        longitude: undefined,
        latitude: undefined,
        type: undefined,
        powerEmptyLoopId: undefined,
        airEmptyLoopId: undefined,
        lightEmptyLoopId: undefined,
        powerLoopId: undefined,
        airLoopId: undefined,
        lightLoopId: undefined,
        chargeLoopId: undefined,
        dischargeLoopId: undefined,
        temperatureLoopId: undefined,
        outerTemperatureLoopId: undefined,
        gatewayid: undefined,
        airFixPower: undefined,
        lightFixPower: undefined,
        sourceFixPower: undefined,
        volume: undefined,
        accountno: undefined,
        electype: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
	  this.getTreeselect();
      this.open = true;
      this.title = "添加用户档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
	  this.getTreeselect();
      if (row != undefined) {
        this.form.pid = row.id;
      }
      getStation(row.id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户档案";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateStation(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addStation(this.form).then(response => {
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
      this.$confirm('是否确认删除用户档案编号为"' + row.id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStation(row.id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },

    // 用户类别字典翻译
    userTypeFormat(row, column) {
      return this.selectDictLabel(this.userTypeOptions, row.userType);
    },
    // 基站类型字典翻译
    stationTypeFormat(row, column) {
      return this.selectDictLabel(this.stationTypeOptions, row.type);
    },
  }
};
</script>
