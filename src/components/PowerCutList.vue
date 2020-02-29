<template>
  <el-card shadow="always" v-loading="loading" style="margin-bottom:20px">
    <!-- 弹窗 -->
    <el-dialog
      title="限电记录"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :width="dialogWidth"
      @close="dialogClosed"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="formVisible"
        :model="form"
        label-width="auto"
        ref="form"
        :rules="rules"
        status-icon
        :hide-required-asterisk="true"
      >
        <el-form-item label="开始时刻" prop="start_time">
          <el-date-picker
            style="width:auto"
            value-format="yyyy-MM-dd HH:mm"
            v-model="form.start_time"
            type="datetime"
            placeholder="选择限电开始时间"
            clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时刻" prop="stop_time">
          <el-date-picker
            style="width:auto"
            value-format="yyyy-MM-dd HH:mm"
            v-model="form.stop_time"
            type="datetime"
            placeholder="选择限电结束时间"
            clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一期损失电量" prop="lost_power1">
          <el-input v-model="form.lost_power1" style="width:auto">
            <template slot="append">万KWh</template>
          </el-input>
        </el-form-item>
        <el-form-item label="二期损失电量" prop="lost_power2">
          <el-input v-model="form.lost_power2" style="width:auto">
            <template slot="append">万KWh</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            title="请确保日报表在关闭状态"
            icon="el-icon-warning"
            iconColor="#e8620d"
            @onConfirm="onSubmit('form')"
          >
            <el-button type="primary" slot="reference">保存</el-button>
          </el-popconfirm>
          <el-button @click="dialogVisible = false" style="margin-left:20px">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 步骤条 -->
      <el-steps v-else :active="currentActive" simple finish-status="success">
        <el-step :title="action+'数据库记录'" :icon="icon[0]"></el-step>
        <el-step :title="action+'日报表记录'" :icon="icon[1]"></el-step>
      </el-steps>
    </el-dialog>
    <!-- 标题 -->
    <div slot="header" class="clearfix">
      <span>限电记录</span>
      <el-button
        style="float: right;"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="handleCreate()"
      ></el-button>
    </div>
    <!-- 主题 -->
    <el-table :data="tableData" show-summary>
      <el-table-column label="开始时间" prop="start_time" width="auto"></el-table-column>
      <el-table-column label="结束时间" prop="stop_time" width="auto"></el-table-column>
      <el-table-column label="限电时间" prop="time" width="auto"></el-table-column>
      <el-table-column label="一期损失电量" prop="lost_power1" width="auto"></el-table-column>
      <el-table-column label="二期损失电量" prop="lost_power2" width="auto"></el-table-column>
      <el-table-column label="总损失电量" prop="lost_power" width="auto"></el-table-column>
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button size="mini" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "pclist",
  components: {},
  data() {
    var checkStartTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("开始时间不能为空"));
      } else {
        if (new Date(value).getTime() >= new Date().getTime()) {
          return callback(new Error("开始时间不允许大于现在！"));
        } else {
          return callback();
        }
      }
    };
    var checkStopTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("结束时间不能为空"));
      } else {
        if (new Date(value).getTime() >= new Date().getTime()) {
          return callback(new Error("时间不允许大于现在！"));
        } else if (
          new Date(value).getDay() != new Date(this.form.start_time).getDay()
        ) {
          return callback(new Error("开始结束时间应为同一天"));
        } else if (
          new Date(value).getTime() <= new Date(this.form.start_time).getTime()
        ) {
          return callback(new Error("结束时间应在开始时间之后"));
        } else {
          return callback();
        }
      }
    };
    return {
      dialogVisible: false,
      tableData: [],
      form: {},
      form_pre: {},
      loading: false,
      dialogWidth: "500px",
      currentActive: -1,
      rules: {
        //表单规则校验
        start_time: [
          { validator: checkStartTime, trigger: ["blur", "change"] }
        ],
        stop_time: [{ validator: checkStopTime, trigger: ["blur", "change"] }],
        lost_power1: [
          { required: true, message: "一期损失电量不能为空", trigger: "blur" },
          { pattern: /^([0-9]{1,}[.]*[0-9]*)$/, message: "损失电量必须是数字" }
        ],
        lost_power2: [
          { required: true, message: "年龄不能为空", trigger: "blur" }
        ]
      },
      action: "创建"
    };
  },
  computed: {
    formVisible: function() {
      if (this.currentActive >= 1) {
        return false;
      } else {
        return true;
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    icon: function() {
      switch (this.currentActive) {
        case -1:
          return ["el-icon-help", "el-icon-help", "el-icon-help"];
        case 0:
          return ["el-icon-loding", "el-icon-help", "el-icon-help"];
        case 1:
          return ["el-icon-finished", "el-icon-loading", "el-icon-help"];
        case 2:
          return ["el-icon-finished", "el-icon-finished", "el-icon-loading"];
      }
    }
  },
  mounted() {
    this.getPowerCutRecord();
  },
  methods: {
    //获取今日限电记录
    getPowerCutRecord() {
      this.loading = true;
      this.$http.get("/api/getpcs").then(res => {
        this.tableData = res["data"];
        this.loading = false;
      });
    },
    onSubmit(form, index = 0) {
      this.currentActive = index;
      if (this.currentActive == 0) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$http({
              method: "post",
              url: "/api/createpc",
              data: this.form
            }).then(() => {
              this.onSubmit(form, 1);
            });
          }
        });
      }
      if (this.currentActive == 1) {
        if (this.action == "创建") {
          this.$http({
            method: "post",
            url: "/api/pctocdf",
            data: this.form
          }).then(() => {
            this.$message("限电记录写入成功！");
            this.init()
          });
        } else {
          this.$http({
            method: "post",
            url: "/api/changecdfpc",
            data: {
              new: this.form,
              old: this.form_pre
            }
          }).then(res => {
            if (res.status == 200) {
              this.$message("限电记录修改成功！");
            } else {
              this.$message.error("日报表中未找到该记录，请手动修改！");
            }
            this.init();
          });
        }
      }
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
      this.action = "编辑";
      this.form_pre = JSON.parse(JSON.stringify(row));
    },
    handleCreate() {
      this.dialogVisible = true;
      this.action = "创建";
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = true;
          this.action = '删除'
          this.currentActive = 0;
          this.$http({
            method: "post",
            url: "/api/delpcdb",
            data: row
          }).then(()=>{
            this.currentActive =1
            this.$http({
              method:'post',
              url:'/api/delpccdf',
              data:row
            }).then(res=>{
              if (res.status == 200){
                this.$message("删除成功")
              }else{
                 this.$message.error("数据库中未找到此记录，请手动删除")
              }
              this.init()
            })
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    dialogClosed() {
      this.form = {};
    },
    init() {
      this.currentActive = -1;
      this.dialogVisible = false;
      this.getPowerCutRecord()
      this.form = {}
    }
  }
};
</script>

<style>
</style>