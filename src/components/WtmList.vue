<template>
  <el-card>
    <!-- 创建记录弹窗 -->
    <el-dialog :visible.sync="sdialogVisible" :before-close="shutDialog">
      <div slot="title" class="dialog-title">
        <span>风机维护/检修记录</span>
        
      </div>
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
              <span>工作班成员：</span>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="wtForm.members"
                multiple
                filterable
                allow-create
                :remote-method="searchMembers"
                placeholder="工作班成员"
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
          <el-form-item>
            <el-col :span="8">
              <span>许可时间：</span>
            </el-col>
            <el-col :span="16">
              <div class="block">
                <el-date-picker
                  v-model="wtForm.allow_time"
                  type="datetime"
                  placeholder="选择许可时间"
                  default-time="8:00:00"
                  value-format="timestamp"
                ></el-date-picker>
              </div>
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
    <el-table :data="wtmData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="风机号">
              <span>{{ props.row.wt_id }}</span>
            </el-form-item>
            <el-form-item label="工作内容">
              <span>{{ props.row.task }}</span>
            </el-form-item>
            <el-form-item label="工作负责人">
              <span>{{ props.row.manager }}</span>
            </el-form-item>
            <el-form-item label="工作班成员">
              <span>{{ props.row.members }}</span>
            </el-form-item>
            <el-form-item label="许可时间">
              <span>{{ props.row.allow_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="风机号">
        <template slot-scope="scope">
          <span>A{{ scope.row.wt_id }}风机</span>
        </template>
      </el-table-column>
      <el-table-column label="工作任务" prop="task"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handleEnd(scope.$index, scope.row)">终结</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      tasks: [],
      wtmData: [],
      gzp_address:[]
    };
  },
  props: [],
  mounted() {
    this.loadWts();
    this.loadManagers();
    this.loadWtms();
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
    loadWtms() {
      this.$http
        .get("/api/getwtms")
        .then(res => {
          this.wtmData = res["data"];
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
    },
    searchMembers(query) {
      if (query !== "") {
        this.$http
          .get("/api/getusers")
          .then(res => {
            this.members = res["data"];
          })
          .catch(err => {
            this.$message.error(err);
          });
      } else {
        this.options = [];
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "post",
            url: "/api/deletewtm",
            data: row.id
          })
            .then(res => {
              if (res["data"] == "ok") {
                this.wtmData.splice(index, 1);
              } else {
                this.$message({
                  message: res["data"],
                  type: "danger"
                });
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handlePreview(file) {
        this.$message({
          message: file,
          type: 'info'
        });
      }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
</style>