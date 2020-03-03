<template>
  <el-card v-loading="loading" style="margin-bottom:20px">
    <!-- 上传工作票弹窗 -->
    <el-dialog
      title="上传工作票"
      :visible="uploadDialogVisible"
      width="400px"
      :before-close="handleuploadDialogClose"
    >
      <el-upload
        v-loading="uploadLoading"
        action="/api/postgzp"
        drag
        width="100%"
        :on-success="uploadSuccess"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-error="uploadLoading = false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将工作票文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">建议每次上传一张工作票</div>
      </el-upload>
    </el-dialog>
    <!-- 终结弹窗 -->
    <el-dialog
      title="终结"
      :visible.sync="endDialogVisible"
      :width="endDialogWidth"
      :close-on-click-modal="false"
    >
      <!-- form -->
      <el-form :model="endDialogData" ref="endDialogData" label-width="auto" v-if="formVisible">
        <el-row>
          <el-col :span="endDialogItemSpan" v-for="(wtm, index) in endDialogData.wtms" :key="index">
            <el-card shadow="never" body-style="padding:20px;" style="margin:10px">
              <div slot="header" class="clearfix">
                <span>A{{wtm.wt_id}} 风机</span>
              </div>
              <el-form-item
                label="停机时刻"
                :prop="'wtms['+index+'].stop_time'"
                :rules="rules.stop_time"
              >
                <el-date-picker
                  style="width:auto"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="wtm.stop_time"
                  type="datetime"
                  placeholder="选择停机时间"
                  @focus="formitemfocus(index)"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                label="启机时刻"
                :prop="'wtms['+index+'].start_time'"
                :rules="rules.start_time"
              >
                <el-date-picker
                  style="width:auto"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="wtm.start_time"
                  type="datetime"
                  placeholder="选择启机时间"
                  @focus="formitemfocus(index)"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                label="损失电量"
                :prop="'wtms['+index+'].lost_power'"
                :rules="rules.lost_power"
              >
                <el-input v-model="wtm.lost_power" style="width:auto" @focus="formitemfocus(index)">
                  <template slot="append">万KWh</template>
                </el-input>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end" align="bottom">
          <el-col :span="6 ">
            <el-form-item style="margin:0">
              <el-popconfirm
                title="相关报表是否全部关闭？"
                icon="el-icon-warning"
                iconColor="#e8620d"
                @onConfirm="onEndDialogSubmit('endDialogData')"
              >
                <el-button
                  slot="reference"
                  type="primary"
                  style="float:right;margin:10px 10px 0 0 "
                >保存</el-button>
              </el-popconfirm>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 写入过程显示 -->
      <el-steps v-else :active="currentActive" simple finish-status="success">
        <el-step :title="action+'数据库记录'" :icon="icon[0]"></el-step>
        <el-step :title="action+'日报表记录'" :icon="icon[1]"></el-step>
      </el-steps>
    </el-dialog>
    <!-- 展示窗口 -->
    <div slot="header" class="wtm-headedr">
      <span>风机维护</span>
      <el-dropdown
        split-button
        type="primary"
        style="float: right;"
        size="mini"
        trigger="click"
        @command="handleCommand"
        @click="uploadDialogVisible = true"
      >
        读取工作票
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="datasyn">数据同步</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 主体 -->
    <el-table :data="wtmData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="工作票号">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="工作负责人">
                  <span>{{ props.row.manager }}</span>
                </el-form-item>
                <el-form-item label="工作班成员">
                  <span>{{ props.row.members }}</span>
                </el-form-item>
                <el-form-item label="计划开始时间">
                  <span>{{ props.row.pstart_time }}</span>
                </el-form-item>
                <el-form-item label="计划结束时间">
                  <span>{{ props.row.pstop_time }}</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row v-if="props.row.wtms">
            <el-col v-for="wtm in props.row.wtms" :key="wtm.wt_id">
              <el-form label-position="left" inline class="demo-table-expand" label-width="auto">
                <el-form-item :label="'A'+wtm.wt_id+'停机时刻'">
                  <span>{{wtm.stop_time }}</span>
                </el-form-item>
                <el-form-item :label="'A'+wtm.wt_id+'启机时刻'">
                  <span>{{wtm.start_time }}</span>
                </el-form-item>
                <el-form-item :label="'A'+wtm.wt_id+'停机时间'">
                  <span>{{wtm.time }}</span>
                </el-form-item>
                <el-form-item :label="'A'+wtm.wt_id+'损失电量'">
                  <span>{{wtm.lost_power }}</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="风机号" prop="wt_id" width="auto"></el-table-column>
      <el-table-column label="工作任务" prop="task" width="auto"></el-table-column>
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <!-- <el-button size="mini" type="primary" @click="handleAllow(scope.$index, scope.row)">许可</el-button> -->
          <el-button
            v-if="scope.row.is_end"
            size="mini"
            @click="handleEnd(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="handleEnd(scope.$index, scope.row)"
          >终结</el-button>
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
    var checkStartTime = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!this.endDialogData.wtms[this.formIndex].stop_time) {
          return callback(new Error("请先输入停机时间"));
        } else if (
          new Date(value).getTime() <=
          new Date(this.endDialogData.wtms[this.formIndex].stop_time).getTime()
        ) {
          return callback(new Error("启机时间应在停机时间之后"));
        } else {
          return callback();
        }
      }
    };
    var checkLostPower = (rule, value, callback) => {
      if (!value) {
        if (this.endDialogData.wtms[this.formIndex].start_time) {
          return callback(new Error("请输入损失电量"));
        } else {
          return callback();
        }
      } else {
        if (!this.endDialogData.wtms[this.formIndex].stop_time) {
          return callback(new Error("请先输入停机时间"));
        } else if (!this.endDialogData.wtms[this.formIndex].start_time) {
          return callback(new Error("请先输入启机时间"));
        } else {
          return callback();
        }
      }
    };
    return {
      sdialogVisible: false,
      endDialogVisible: false,
      // wtForm: {
      //   mode: "维护",
      //   type: "其他"
      // },
      managers: [],
      value: [],
      wts: [],
      tasks: [],
      wtmData: [],
      gzp_address: [],
      endDialogData: {},
      endDialogData_pre: {},
      endDialogWidth: "1050px",
      endDialogItemSpan: "8",
      uploadDialogVisible: false,
      currentActive: -1,
      formIndex: -1,
      uploadLoading: false,
      icon: ["el-icon-help", "el-icon-help", "el-icon-help"],
      rules: {
        //表单规则校验
        start_time: [
          { validator: checkStartTime, trigger: ["blur", "change"] }
        ],
        stop_time: [
          {
            required: true,
            message: "请输入停机时间",
            trigger: ["blur", "change"]
          }
        ],
        lost_power: [{ validator: checkLostPower, trigger: ["blur", "change"] }]
      },
      loading: false,
      action: ""
    };
  },
  computed: {
    formVisible: function() {
      if (this.currentActive >= 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  props: [],
  mounted() {
    this.loadGzps();
  },

  methods: {
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
    loadGzps() {
      this.loading = true;
      this.$http
        .get("/api/getgzps")
        .then(res => {
          this.wtmData = res["data"];
          this.loading = false;
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
          this.deleteAction(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteFromDb(row) {
      this.$http({
        method: "post",
        url: "/api/delgzpdb",
        data: row
      })
        .then(res => {
          if (res.status == 200) {
            this.currentActive++;
            if (row.is_end) {
              this.deleteFromCdf(row)
            } else {
              this.$message("日报表中无纪录！");
              this.init();
            }
          } else {
            this.$message.error("发生未知错误！");
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    deleteFromCdf(row) {
      this.$http({
        method: "post",
        url: "/api/delgzpcdf",
        data: row
      })
        .then(res => {
          if (res.status == 200) {
            this.$message("删除成功！");
          } else {
            this.$message.error("日报表中未找到该记录，请手动删除！");
          }
          this.init();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    deleteAction(row) {
      this.currentActive = 0;
      this.endDialogWidth = "700px";
      this.action = "删除";
      this.endDialogVisible = true;
      this.deleteFromDb(row);
    },
    handleEnd(index, row) {
      // this.$message(index + row);
      this.endDialogData_pre = JSON.parse(JSON.stringify(row));
      var num_wtms = row.wtms.length;
      if (num_wtms <= 3) {
        this.endDialogWidth = String(350 * num_wtms) + "px";
        this.endDialogItemSpan = String(24 / num_wtms);
      } else {
        this.endDialogWidth = "1200px";
        this.endDialogItemSpan = "6";
      }
      if (row.is_end) {
        this.action = "修改";
      } else {
        this.action = "写入";
      }
      this.endDialogVisible = true;
      this.endDialogData = JSON.parse(JSON.stringify(row));
    },
    endData2Db() {
      this.$http({
        method: "post",
        url: "/api/wtmstodb",
        data: this.endDialogData
      }).then(res => {
        if (res.status == 200) {
          this.currentActive++;
          this.endData2Cdf(this.endDialogData);
        } else {
          this.init();
          this.$message({
            type: "success",
            message: "写入数据库成功，未录入日报表"
          });
        }
      });
    },
    endData2Cdf() {
      if (this.endDialogData.is_end) {
        //终结修改
        this.$http({
          method: "post",
          url: "/api/changecdf",
          data: { new: this.endDialogData, old: this.endDialogData_pre }
        })
          .then(res => {
            this.currentActive++;
            this.init();
            if (res["data"]) {
              this.$message({
                type: "success",
                message: "日报表修改完成！"
              });
            } else {
              this.$message({
                type: "warning",
                message: "由于未知原因日报表中未找到之前数据，请自行修改"
              });
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      } else {
        //未终结保存
        this.$http({
          method: "post",
          url: "/api/wtmstocdf",
          data: { gzp_id: this.endDialogData.id }
        })
          .then(() => {
            this.currentActive++;
            this.init();
            this.$message({
              type: "success",
              message: "风机数据录入完成！"
            });
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    },
    // 终结弹窗提交事件
    onEndDialogSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.currentActive++;
          this.endData2Db();
        } else {
          return false;
        }
      });
    },
    //文件上传成功的钩子
    uploadSuccess() {
      this.uploadLoading = false;
      this.$message({
        type: "success",
        message: "上传成功！"
      });
      this.loadGzps();
    },
    init() {
      this.loadGzps();
      this.currentActive = -1;
      this.endDialogVisible = false;
      this.endDialogData = {};
      this.endDialogData_pre = {};
      this.uploadDialogVisible = false;
    },
    handleuploadDialogClose() {
      this.uploadDialogVisible = false;
    },
    handleCommand(command) {
      if (command == "datasyn") {
        var msg = this.$message({
          message: "开始数据同步",
          duration: 0
        });
        this.$http({
          methods: "get",
          url: "/api/wtmsyn"
        }).then(res => {
          if (res.status == 200) {
            msg.close();
            this.$message({
              type: "success",
              message: "数据同步成功"
            });
            this.getData();
          } else {
            this.$message.error("未知错误");
          }
        });
      }
    },
    //表单项点击事件
    formitemfocus(index) {
      this.formIndex = index;
    },
    beforeUpload() {
      this.uploadLoading = true;
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