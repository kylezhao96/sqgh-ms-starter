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
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>110kV电度表</span>
              </div>
              <el-form label-width="80px" :model="form111">
                <el-form-item label="正向有功">
                  <el-input v-model="form111.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form111.ba" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form111.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form111.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>主变高压侧</span>
              </div>
              <el-form label-width="80px" :model="form2">
                <el-form-item label="正向有功">
                  <el-input v-model="form2.fa" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form2.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form2.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form2.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>301开关</span>
              </div>
              <el-form label-width="80px" :model="form301">
                <el-form-item label="正向有功">
                  <el-input v-model="form301.fa" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form301.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form301.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form301.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>302开关</span>
              </div>
              <el-form label-width="80px" :model="form302">
                <el-form-item label="正向有功">
                  <el-input v-model="form302.fa" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form302.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form302.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form302.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#1集电线电度表</span>
              </div>
              <el-form label-width="80px" :model="form312">
                <el-form-item label="正向有功">
                  <el-input v-model="form312.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form312.ba" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form312.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form312.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#2集电线</span>
              </div>
              <el-form label-width="80px" :model="form313">
                <el-form-item label="正向有功">
                  <el-input v-model="form313.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form313.ba" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form313.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form313.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#1SVG</span>
              </div>
              <el-form label-width="80px" :model="form311">
                <el-form-item label="正向有功">
                  <el-input v-model="form311.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form311.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form311.fr" placeholder="KVarH"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form311.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#1接地变开关</span>
              </div>
              <el-form label-width="80px" :model="form31b">
                <el-form-item label="正向有功">
                  <el-input v-model="form31b.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form31b.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form31b.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form31b.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#3集电线</span>
              </div>
              <el-form label-width="80px" :model="form322">
                <el-form-item label="正向有功">
                  <el-input v-model="form322.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form322.ba" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form322.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form322.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#4集电线</span>
              </div>
              <el-form label-width="80px" :model="form323">
                <el-form-item label="正向有功">
                  <el-input v-model="form323.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form323.ba" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form323.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form323.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#2SVG</span>
              </div>
              <el-form label-width="80px" :model="form321">
                <el-form-item label="正向有功">
                  <el-input v-model="form321.fa" placeholder="KWH"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form321.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form321.fr" placeholder="KVarH"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form321.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>#2接地变</span>
              </div>
              <el-form label-width="80px" :model="form32b">
                <el-form-item label="正向有功">
                  <el-input v-model="form32b.fa" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向有功">
                  <el-input v-model="form32b.ba" placeholder="KWH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="正向无功">
                  <el-input v-model="form32b.fr" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="反向无功">
                  <el-input v-model="form32b.br" placeholder="KVarH" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
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
              <el-form label-width="80px" :model="ws1">
                <el-form-item label="最大风速">
                  <el-input v-model="ws1.max" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="平均风速">
                  <el-input v-model="ws1.avg" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="最小风速">
                  <el-input v-model="ws1.min" placeholder="m/s"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- 二期风速 -->
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>二期风速</span>
              </div>
              <el-form label-width="80px" :model="ws2">
                <el-form-item label="最大风速">
                  <el-input v-model="ws2.max" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="平均风速">
                  <el-input v-model="ws2.avg" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="最小风速">
                  <el-input v-model="ws2.min" placeholder="m/s"></el-input>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- 负荷 -->
          <el-col :span="6">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>负荷</span>
              </div>
              <el-form label-width="80px" :model="power">
                <el-form-item label="最大负荷">
                  <el-input v-model="power.max" placeholder="MW"></el-input>
                </el-form-item>
                <el-form-item label="最小负荷">
                  <el-input v-model="power.min" placeholder="MW"></el-input>
                </el-form-item>
              </el-form>
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
      form111: {},
      form311: {},
      form312: {},
      form313: {},
      form31b: {},
      form32b: {},
      form321: {},
      form322: {},
      form323: {},
      form2: {},
      form301: {},
      form302: {},
      ws1: {},
      ws2: {},
      power: {},
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

  methods: {
    // 报表上报
    sendForm() {
      // 赋值
      // this.gform = {
      //   fka312: this.form312.fa,
      //   bka312: this.form312.ba,
      //   fka313: this.form313.fa,
      //   bka313: this.form313.ba,
      //   fka322: this.form322.fa,
      //   bka322: this.form322.ba,
      //   fka323: this.form323.fa,
      //   bka323: this.form323.ba,
      //   fka31b: this.form31b.fa,
      //   fka21b: 838.64,
      //   bka311: this.form311.fa,
      //   bkr311: this.form311.fr,
      //   bka321: this.form321.fa,
      //   bkr321: this.form321.fr,
      //   fka111: this.form111.fa,
      //   bka111: this.form111.ba,
      //   dmaxs1: this.ws1.max,
      //   dmins1: this.ws1.min,
      //   davgs1: this.ws1.avg,
      //   dmaxs2: this.ws2.max,
      //   dmins2: this.ws2.min,
      //   davgs2: this.ws2.avg,
      //   dmaxl: this.power.max,
      //   dminl: this.power.min,
      // };
      this.gform = {
        fka312: 2709.2,
        bka312: 5.42,
        fka313: 2631.8,
        bka313: 5.64,
        fka322: 2840.8,
        bka322: 5.19,
        fka323: 2628.85,
        bka323: 5.19,
        fka31b: 127.4,
        fka21b: 838.64,
        bka311: 34.04,
        bkr311: 2235.3,
        bka321: 29.82,
        bkr321: 1826.37,
        fka111: 7.57,
        bka111: 2459.0,
        dmaxs1: 10,
        dmins1: 0,
        davgs1: 5,
        dmaxs2: 12,
        dmins2: 2,
        davgs2: 6,
        dmaxl: 99,
        dminl: 0
      };
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
            this.table_2 = res['data']
            this.table_2_hidden = false
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