<template>
  <div>
    <!--  表码值填写 -->
    <el-dialog
      title="表码值填写"
      :visible.sync="cdialogVisible"
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
  </div>
</template>

<script>
export default {
  name: "calformDialog",
  components: {},
  data() {
    return {
      form: {},
      gform: {},
      dialogCdfHidden: false,
      currentActive: 0,
      icon: ["", "", "", "", "", ""],
      table_1_hidden: true,
      table_2_hidden: true,
      table_1: [], //日报表数据
      table_2: []
    };
  },
  props: ["cdialogVisible"],
  mounted() {
    this.getBmz();
  },
  methods: {
    //获取标码值及昨日发电量
    getBmz() {
      this.$http({
        method: "get",
        url: "/api/getbmz"
      }).then(res => {
        this.form = res["data"];
      });
    },
    // 报表上报
    sendForm() {
      // 赋值
      this.gform = {
        fka312: this.fka312,
        bka312: this.bka312,
        fka313: this.fka313,
        bka313: this.bka313,
        fka322: this.fka322,
        bka322: this.bka322,
        fka323: this.fka323,
        bka323: this.bka323,
        fka31b: this.fka31b,
        fka21b: 838.64,
        bka311: this.bka311,
        bkr311: this.bkr311,
        bka321: this.bka321,
        bkr321: this.bkr321,
        fka111: this.fka111,
        bka111: this.bka111,
        dmaxs1: this.dmaxs1,
        dmins1: this.dmins1,
        davgs1: this.davgs1,
        dmaxs2: this.dmaxs2,
        dmins2: this.dmins2,
        davgs2: this.davgs2,
        dmaxl: this.dmaxl,
        dminl: this.dminl
      };
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
      this.next();
    },
    // 关闭dialog
    shutDialog() {
      this.$emit("changeCdv", false);
    },
    // 日报步骤跟踪对话框中点击下一步事件
    next() {
      this.icon[this.currentActive] = "el-icon-loading"; //显示加载中
      // 执行步骤1 数据计算
      if (this.currentActive == 0) {
        this.$http({
          method: "post",
          url: "/api/filldb",
          data: this.gform
        })
          .then(res => {
            this.currentActive++;
            this.table_1_hidden = false;
            this.table_1 = JSON.parse(res["data"]);
            this.$message({
              message: "数据生成成功",
              type: "success"
            });
            this.next();
          })
          .catch(err => {
            this.$message.error("数据生成失败" + err);
            this.loading = false;
          });
      }
      // 执行步骤2 写入日报表
      if (this.currentActive == 1) {
        this.$http({
          method: "post",
          url: "/api/toexcel",
          data: this.gform
        })
          .then(() => {
            this.currentActive++;
            this.next();
          })
          .catch(err => {
            this.$message.error(err);
            this.icon[this.currentActive] = "el-icon-error";
          });
      }
      //执行步骤3，校验
      if (this.currentActive == 2) {
        this.$http({
          methods: "get",
          url: "/api/checkout"
        })
          .then(res => {
            if (res["data"] == true) {
              this.currentActive++;
              this.next();
            } else {
              this.dialogCdfHidden = false;
              this.table_1_hidden = true;
              this.table_2_hidden = true;
              this.currentActive = 0;
              this.icon = ["", "", "", "", "", ""];
              this.$message({
                showClose: true,
                typr: "error",
                message: "校验失败，请检查填写数值是否正确",
                duration: 0
              });
            }
          })
          .catch(err => {
            this.$message.error(err);
            this.icon[this.currentActive] = "el-icon-error";
          });
      }
      //执行步骤4， 报送OMS
      if (this.currentActive == 3) {
        this.$http({
          methods: "get",
          url: "/api/tooms"
        })
          .then(res => {
            this.table_2 = res["data"];
            this.table_2_hidden = false;
            this.currentActive++;
            this.$message({
              message: "写入oms日报成功",
              type: "success"
            });
            this.next();
          })
          .catch(err => {
            this.$message.error(err);
            this.icon[this.currentActive] = "el-icon-error";
          });
      }
      //执行步骤5，写入桃园报表
      if (this.currentActive == 4) {
        this.$http({
          methods: "get",
          url: "/api/toty"
        }).then(res => {
          if (res.status == 200) {
            this.currentActive++;
            this.$message({
              message: "写入oms日报成功",
              type: "success"
            });
          }
        });
      }
    },
    init() {
      (this.form111 = {}),
        (this.form311 = {}),
        (this.form312 = {}),
        (this.form313 = {}),
        (this.form31b = {}),
        (this.form32b = {}),
        (this.form321 = {}),
        (this.form322 = {}),
        (this.form323 = {}),
        (this.form2 = {}),
        (this.form301 = {}),
        (this.form302 = {}),
        (this.ws1 = {}),
        (this.ws2 = {}),
        (this.power = {}),
        (this.gform = {}),
        (this.dialogVisible_1 = false),
        (this.currentActive = 0),
        (this.icon = [
          "el-icon-help",
          "el-icon-help",
          "el-icon-help",
          "el-icon-help",
          "el-icon-help",
          "el-icon-help"
        ]),
        (this.table_1_hidden = true),
        (this.table_2_hidden = true),
        (this.table_1 = []), //日报表数据
        (this.table_2 = []);
    }
  }
};
</script>

<style scoped>
</style>