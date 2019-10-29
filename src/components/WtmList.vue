<template>
  <el-card>
    <!-- 创建记录弹窗 -->
    <el-dialog title="风机维护/检修记录" :visible.sync="sdialogVisible" :before-close="shutDialog">
      <el-form :model="wtForm">
        <el-row>
          <el-form-item>
            <el-col :span="8">
              <span>风机：</span>
            </el-col>
            <el-col :span="16">
              <el-cascader v-model="wtForm.wt" :options="wts" @change="handleChange"></el-cascader>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作负责人：</span>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="wtForm.manager"
                filterable
                allow-create
                default-first-option
                placeholder="请选择工作负责人"
              >
                <el-option
                  v-for="item in managers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-col :span="8">
              <span>工作类型</span>
            </el-col>
            <el-col :span="16">
              <el-radio v-model="wtForm.mode" label="维护">维护</el-radio>
              <el-radio v-model="wtForm.mode" label="检修">检修</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作大类</span>
            </el-col>
            <el-col :span="16">
              <el-radio v-model="wtForm.type" label="巡检">巡检</el-radio>
              <el-radio v-model="wtForm.type" label="技改">技改</el-radio>
              <el-radio v-model="wtForm.type" label="消缺">消缺</el-radio>
              <el-radio v-model="wtForm.type" label="半年维护">半年维护</el-radio>
              <el-radio v-model="wtForm.type" label="全年维护">全年维护</el-radio>
              <el-radio v-model="wtForm.type" label="其他">其他</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <span>工作内容：</span>
            </el-col>
            <el-col :span="16">
              <el-autocomplete
                v-model="wtForm.task"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                @focus="handleFocus"
              ></el-autocomplete>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendWTM">确 定</el-button>
      </div>
    </el-dialog>
    <div slot="header" class="wtm-headedr">
      <span>风机维护</span>
      <el-button
        style="float: right; padding: 3px 3px"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="sdialogVisible = true"
      ></el-button>
    </div>
    <!-- 主体 -->
    <!-- <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="设备"
      width="180">
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>-->
  </el-card>
</template>

<script>
export default {
  name: "wtmList",
  components: {},
  data() {
    return {
      sdialogVisible: false,
      wtForm: {
        mode: "维护",
        type: "其他"
      },
      managers: [],
      value: [],
      wts: [],
      tasks: []
    };
  },
  props: [],
  mounted() {
    this.loadWts();
    this.loadManagers();
  },
  methods: {
    querySearch(queryString, cb) {
      var tasks = this.tasks;
      var results = queryString
        ? tasks.filter(this.createFilter(queryString))
        : tasks;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return tasks => {
        return (
          tasks.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadTasks() {
      this.$http
        .get("/api/getwttasks")
        .then(res => {
          this.tasks = res["data"];
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleSelect() {},
    handleFocus() {
      this.loadTasks();
    },
    loadWts() {
      this.$http
        .get("/api/getwts")
        .then(res => {
          this.wts = res["data"];
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    loadManagers() {
      this.$http
        .get("/api/getusers")
        .then(res => {
          this.managers = res["data"];
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    sendWTM() {
      this.$http({
        method: "post",
        url: "/api/createwtm",
        data: this.wtForm
      })
        .then(res => {
          this.sdialogVisible = false;
          this.$message({
            message: res,
            type: "info"
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style scoped>
</style>