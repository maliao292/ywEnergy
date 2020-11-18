<template>
  <div class="MonContent">
    <p class="monConTit" >用户管理 - <span class="TitactiveColor">用户档案</span></p>
    <!--表单-->
    <div class="monChosen">
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
        <el-form-item label="用户类别" prop="userType">
          <el-select v-model="queryParams.userType" placeholder="请选择用户类别">
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
        <el-table-column label="户号" align="center" prop="accountno" />
        <el-table-column label="站点类型" align="center" prop="type" :formatter="stationTypeFormat"/>
        <el-table-column label="经度" align="center" prop="longitude" />
        <el-table-column label="纬度" align="center" prop="latitude" />
        <el-table-column label="合同容量(kVA)" align="center" prop="volume" />
        <el-table-column label="用电类别" align="center" prop="electype" />
        <el-table-column label="电压等级" align="center" prop="voltageClasses" :formatter="dydjFormat"/>
        <el-table-column label="供电辖区" align="center" prop="area" :formatter="gongdianFormat"/>
        <el-table-column label="温度告警值(℃)" align="center" prop="alarmTemp" />
        <el-table-column label="回路层级" align="center" prop="loopName" />
        <el-table-column label="联系人" align="center" prop="contactName" />
        <el-table-column label="邮箱" align="center" prop="contactMail" />
        <el-table-column label="备注" align="center" prop="remark" />
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
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户类别">
              <el-select v-model="form.userType" placeholder="请选择用户类别" clearable style="width: 100%;" @change="changeUserType">
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
            <el-form-item label="户号" prop="accountno">
              <el-input v-model="form.accountno" placeholder="请输入户号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站点类型">
              <el-select v-model="form.type" placeholder="请选择类型"  style="width: 100%;">
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
            <el-form-item label="所属街道" prop="pid" class="treeSelect">
              <treeselect
                v-model="form.pid"
                :options="stationOptions"
                :normalizer="normalizer"
                placeholder="请选择所属街道"
              />
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
              <el-select v-model="form.electype" placeholder="请选择用电类别" style="width: 100%;">
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
            <el-form-item label="电压等级" prop="voltageClasses">
              <el-select v-model="form.voltageClasses" placeholder="请选择电压等级" style="width: 100%;">
                <el-option
                  v-for="dict in dydjOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供电辖区" prop="area">
              <el-select v-model="form.area" placeholder="请选择供电辖区" style="width: 100%;">
                <el-option
                  v-for="dict in gongdianOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="温度告警值" prop="alarmTemp">
              <el-input v-model="form.alarmTemp" placeholder="请输入告警值" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回路层级" prop="loopId" class="treeSelect">
              <treeselect
                v-model="form.loopId"
                :options="loopList"
                :normalizer="normalizer_loop"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="form.contactName" placeholder="请输入联系人名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="contactMail">
              <el-input v-model="form.contactMail" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listStation, getStation, delStation, addStation, updateStation, exportStation,getLoopData } from "@/api/user/station";
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
      dydjOptions: [],
      gongdianOptions: [],
      // 用户档案表格数据
      stationList: [],
      loopList: [],
      // 用户档案树选项
      stationOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        userType: '2',
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
    this.getLoop()
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
    // 电压等级
    this.getDicts("yw_station_voltageClasses").then(response => {
      this.dydjOptions = response.data;
    });
    // 供电辖区
    this.getDicts("yw_station_area").then(response => {
      this.gongdianOptions = response.data;
    });
  },
  methods: {
    /** 查询用户档案列表 */
    getList() {
      // this.loading = true;
      listStation(this.queryParams).then(response => {
        this.stationList = this.handleTree(response.data, "id", "pid");
        console.log(this.stationList);
      });
    },
    getLoop() {
      getLoopData().then(response => {
        this.loopList = this.handleTree(response.data, "id", "pid");
        console.log(this.loopList);
      })
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
    normalizer_loop(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
	/** 查询部门下拉树结构 */
    getTreeselect() {
      let SearchParam = {
        userType: this.form.userType,
        type: '3', // 默认3 只查街道
      }
      listStation(SearchParam).then(response => {
        this.stationOptions = [];
        const data = { id: 0, stationName: '浙江', children: [] };
        data.children = this.handleTree(response.data, "id", "pid");
        this.stationOptions.push(data);
      });
    },
    // 切换用户类别
    changeUserType() {
      this.getTreeselect()
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
        userType: '2', // 默认2
        stationName: undefined,
        pid: undefined,
        longitude: undefined,
        latitude: undefined,
        type: undefined,
        volume: undefined,
        accountno: undefined,
        electype: undefined,
        voltageClasses:'1',
        area:'1',
        loopId: undefined
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
        this.form.type = String(response.data.type)
        this.form.userType = String(response.data.userType)
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
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportStation(queryParams);
      }).then(response => {
        this.download(response.msg);
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
    dydjFormat(row, column) {
      return this.selectDictLabel(this.dydjOptions, row.voltageClasses);
    },
    gongdianFormat(row, column) {
      return this.selectDictLabel(this.gongdianOptions, row.area);
    },
  }
};
</script>
<style scoped>
  .treeSelect>>>.el-form-item__content{
    line-height: 38px;
  }
</style>
