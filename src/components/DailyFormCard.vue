<template>
  <el-card v-loading="loading">
    <div slot="header" class="clearfix">
      <span>日报表</span>
      <el-dropdown
        split-button
        type="primary"
        style="float: right;"
        size="mini"
        trigger="click"
        @click="handleClick"
        @command="handleCommand"
      >
        录入表码值
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="datasyn">数据同步</el-dropdown-item>
          <el-dropdown-item command="tocdf">写入日报表</el-dropdown-item>
          <el-dropdown-item command="showoms">显示OMS报表</el-dropdown-item>
          <el-dropdown-item command="toty">写入桃园报表</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table :data="tableData" align="center" row-key="date">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="dgp" label="发电量"></el-table-column>
      <el-table-column prop="dlp" label="限电量"></el-table-column>
      <el-table-column prop="dlpl" label="限电率"></el-table-column>
      <el-table-column prop="donp" label="上网电量"></el-table-column>
      <el-table-column prop="doffp" label="下网电量"></el-table-column>
      <el-table-column prop="dcp" label="场用电量"></el-table-column>
      <el-table-column prop="dcl" label="场用电率"></el-table-column>
      <el-table-column prop="davgs" label="平均风速"></el-table-column>
    </el-table>
    <!--  表码值填写 -->
    <el-dialog
      title="录入表码值"
      :visible.sync="dialogVisible"
      width="1500px"
      :before-close="shutDialog"
      fullscreen
    >
      <!-- 用于日报表步骤跟踪的对话框 -->
      <div v-if="dialogCdfHidden">
        <el-row>
          <el-steps :active="currentActive" simple finish-status="success">
            <el-step title="数据生成中" :icon="icon[0]"></el-step>
            <el-step title="写入日报表" :icon="icon[1]"></el-step>
            <el-step title="校验中" :icon="icon[2]"></el-step>
            <el-step title="写入oms报表" :icon="icon[3]"></el-step>
            <el-step title="写入发送桃园报表" :icon="icon[4]"></el-step>
          </el-steps>
        </el-row>
        <!-- <el-row type="flex" justify="end" style="margin:10px">
        <el-button @click="next">执行</el-button>
        </el-row>-->
        <!-- 发电量展示 -->
        <el-row style="margin:20px 0">
          <el-table :data="table_1" align="center" row-key="id" :hidden="table_1_hidden">
            <el-table-column prop="type"></el-table-column>
            <el-table-column prop="gp" label="发电量"></el-table-column>
            <el-table-column prop="lp" label="限电量"></el-table-column>
            <el-table-column prop="lpl" label="限电率"></el-table-column>
            <el-table-column prop="onp" label="上网电量"></el-table-column>
            <el-table-column prop="offp" label="下网电量"></el-table-column>
            <el-table-column prop="cp" label="场用电量"></el-table-column>
            <el-table-column prop="cl" label="场用电率"></el-table-column>
            <el-table-column prop="maxs" label="最大风速"></el-table-column>
            <el-table-column prop="mins" label="最小风速"></el-table-column>
            <el-table-column prop="avgs" label="平均风速"></el-table-column>
          </el-table>
        </el-row>
        <!-- OMS报表展示 -->
        <el-row>
          <el-table :data="table_2" align="center" row-key="id" :hidden="table_2_hidden">
            <el-table-column prop="stop_time" label="停机时间"></el-table-column>
            <el-table-column prop="installed_cap" label="装机容量"></el-table-column>
            <el-table-column prop="boot_cap" label="开机容量"></el-table-column>
            <el-table-column prop="g_p" label="发电量"></el-table-column>
            <el-table-column prop="on_p" label="上网电量"></el-table-column>
            <el-table-column prop="used_p" label="厂用电量"></el-table-column>
            <el-table-column prop="fix_cap" label="检修容量"></el-table-column>
            <el-table-column prop="blocked_p" label="站内受阻电量"></el-table-column>
            <el-table-column prop="limited_p" label="调峰受阻电量"></el-table-column>
          </el-table>
        </el-row>
      </div>
      <div v-else>
        <el-form label-width="80px" :model="form">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>110kV电度表</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka111" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form.bka111" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>主变高压侧</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>301开关</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>302开关</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#1集电线电度表</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka312" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form.bka312" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#2集电线</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka313" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form.bka313" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#1SVG</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.bka311" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form.bkr311" placeholder="KVarH"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#1接地变开关</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka31b" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#3集电线</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka322" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form.bka322" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#4集电线</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.fka323" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form.bka323" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#2SVG</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input v-model="form.bka321" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form.bkr321" placeholder="KVarH"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>#2接地变</span>
                </div>
                <el-form-item label="正向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <!-- 本行用于填写负荷、风速 -->
          <el-row :gutter="20">
            <!-- 一期风速 -->
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>一期风速</span>
                </div>
                <el-form-item label="最大风速">
                  <el-input v-model="form.dmaxs1" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="平均风速">
                  <el-input v-model="form.davgs1" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="最小风速">
                  <el-input v-model="form.dmins1" placeholder="m/s"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <!-- 二期风速 -->
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>二期风速</span>
                </div>
                <el-form-item label="最大风速">
                  <el-input v-model="form.dmaxs2" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="平均风速">
                  <el-input v-model="form.davgs2" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="最小风速">
                  <el-input v-model="form.dmins2" placeholder="m/s"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <!-- 负荷 -->
            <el-col :span="6">
              <el-card class="box-card" shadow="never">
                <div slot="header">
                  <span>负荷</span>
                </div>
                <el-form-item label="最大负荷">
                  <el-input v-model="form.dmaxl" placeholder="MW"></el-input>
                </el-form-item>
                <el-form-item label="最小负荷">
                  <el-input v-model="form.dminl" placeholder="MW"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <!-- <el-row>
        <el-col :span="12"></el-col>
          </el-row>-->
          <el-row type="flex" justify="end">
            <el-popconfirm
              title="请确保日报表在关闭状态!"
              icon="el-icon-warning"
              iconColor="#e8620d"
              @onConfirm="sendForm()"
            >
              <el-button slot="reference">上报</el-button>
            </el-popconfirm>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- oms展示dialog -->
    <el-dialog
      :visible="omsDialogVisible"
      width="1000px"
      title="OMS日报"
      :before-close="shutOmsDialog"
    >
      <el-table :data="omsTable" align="center" row-key="id">
        <el-table-column prop="installed_cap" label="装机容量"></el-table-column>
        <el-table-column prop="boot_cap" label="开机容量"></el-table-column>
        <el-table-column prop="g_p" label="发电量"></el-table-column>
        <el-table-column prop="on_p" label="上网电量"></el-table-column>
        <el-table-column prop="used_p" label="厂用电量"></el-table-column>
        <el-table-column prop="fix_cap" label="检修容量"></el-table-column>
        <el-table-column prop="blocked_p" label="站内受阻电量"></el-table-column>
        <el-table-column prop="limited_p" label="调峰受阻电量"></el-table-column>
        <el-table-column prop="max_l" label="最大负荷"></el-table-column>
        <el-table-column prop="min_l" label="最小负荷"></el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "dfcard",
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableData: [],
      form: {},
      gform: {},
      dialogCdfHidden: false,
      currentActive: 0,
      icon: ["", "", "", "", "", ""],
      table_1_hidden: true,
      table_2_hidden: true,
      table_1: [], //日报表数据
      table_2: [],
      omsTable: [],
      omsDialogVisible: false
    };
  },
  mounted() {
    this.getData();
    this.getBmz();
  },
  methods: {
    //获取昨日及今日日报表数据
    getData() {
      this.loading = true;
      this.$http({
        method: "get",
        url: "/api/getdfs"
      })
        .then(res => {
          this.loading = false;
          if (res.status == 200) {
            this.tableData = JSON.parse(res["data"]);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //获取表码值
    getBmz() {
      this.$http({
        method: "get",
        url: "/api/getbmz"
      }).then(res => {
        this.form = res["data"];
      });
    },
    //点击录入表码值按钮
    handleClick() {
      this.dialogVisible = true;
    },
    // 报表上报
    sendForm() {
      // 赋值
      this.form.fka21b = 838.64;
      // this.gform = {
      //   fka312: 2774.53,
      //   bka312: 5.44,
      //   fka313: 2699.80,
      //   bka313: 5.66,
      //   fka322: 2896.67,
      //   bka322: 5.22,
      //   fka323: 2679.88,
      //   bka323: 5.26,
      //   fka31b: 129.86,
      //   fka21b: 838.64,
      //   bka311: 34.44,
      //   bkr311: 2261.78,
      //   bka321: 30.03,
      //   bkr321: 1835.62,
      //   fka111: 7.59,
      //   bka111: 2516.01,
      //   dmaxs1: 10,
      //   dmins1: 0,
      //   davgs1: 5,
      //   dmaxs2: 12,
      //   dmins2: 2,
      //   davgs2: 6,
      //   dmaxl: 99,
      //   dminl: 0
      // };
      this.dialogCdfHidden = true;
      this.todb();
    },
    // 写入数据库
    todb() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      this.$http({
        method: "post",
        url: "/api/filldb",
        data: this.form
      })
        .then(res => {
          this.currentActive = 1;
          this.table_1_hidden = false;
          this.table_1 = JSON.parse(res["data"]);
          this.$message({
            message: "数据已写入数据库",
            type: "success"
          });
          this.tocdf();
        })
        .catch(err => {
          this.$message.error("数据写入数据库失败" + err);
          this.loading = false;
        });
    },
    //写入日报表
    tocdf() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      var startmsg = this.$message({
        message: "开始写入日报表",
        duration: 0
      });
      this.$http({
        method: "post",
        url: "/api/toexcel",
        data: this.form
      })
        .then(() => {
          if (this.currentActive == 1) {
            this.currentActive = 2;
            this.checkout();
          }
          startmsg.close();
          this.$message({
            message: "写入日报表成功！",
            type: "success"
          });
        })
        .catch(err => {
          this.$message.error("写入日报表失败！" + err);
          this.icon[this.currentActive] = "el-icon-error";
        });
    },
    //校验
    checkout() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      this.$http({
        methods: "get",
        url: "/api/checkout"
      })
        .then(res => {
          if (res["data"] == true) {
            this.currentActive = 3;
            this.tooms();
          } else {
            this.$message({
              showClose: true,
              typr: "error",
              message: "校验失败，请检查核对日报表和生成数据是否相同",
              duration: 0
            });
          }
        })
        .catch(err => {
          this.$message.error(err);
          this.icon[this.currentActive] = "el-icon-error";
        });
    },
    //写入OMS报表
    tooms() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      this.$http({
        methods: "get",
        url: "/api/tooms"
      })
        .then(res => {
          this.table_2 = res["data"];
          this.table_2_hidden = false;
          this.currentActive = 4;
          this.$message({
            message: "写入oms日报成功",
            type: "success"
          });
          this.toty();
        })
        .catch(err => {
          this.$message.error(err);
          this.icon[this.currentActive] = "el-icon-error";
        });
    },
    toty() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      this.$http({
        methods: "get",
        url: "/api/toty"
      }).then(res => {
        if (res.status == 200) {
          this.currentActive = 5;
          this.$message({
            message: "写入桃园日报成功",
            type: "success"
          });
        }
      });
    },
    shutDialog() {
      this.init();
    },
    handleCommand(command) {
      if (command == "datasyn") {
        var msg = this.$message({
          message: "开始数据同步",
          duration: 0
        });
        this.$http({
          methods: "get",
          url: "/api/cdfsyn"
        }).then(res => {
          if (res.status == 200) {
            msg.close();
            this.$message({
              type: "success",
              message: "数据同步成功",
            });
            this.getData();
          }else{
            this.$message.error('未知错误')
          }
        });
      } else {
        if (JSON.stringify(this.form) === "{}") {
          this.$message({
            type: "warning",
            message: "请先录入表码值！"
          });
        } else {
          if (command == "tocdf") {
            this.tocdf();
          }
          if (command == "showoms") {
            this.$http({
              methods: "get",
              url: "/api/getoms"
            }).then(res => {
              this.omsDialogVisible = true;
              this.omsTable = res["data"];
            });
          }
        }
      }
    },
    init() {
      this.dialogVisible = false;
      this.currentActive = 0;
      this.table_1_hidden = true;
      this.table_2_hidden = false;
      this.icon = ["", "", "", "", "", ""];
      this.dialogCdfHidden = false;
    },
    shutOmsDialog() {
      this.omsDialogVisible = false;
    }
  }
};
</script>