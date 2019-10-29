<template>
  <!--  表码值填写 -->
  <el-dialog title="表码值填写" :visible.sync="cdialogVisible" fullscreen="true" :before-close="shutDialog">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
            <span>#1接地变开关</span>
          </div>
          <el-form label-width="80px" :model="form31b">
            <el-form-item label="正向有功">
              <el-input v-model="form31b.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form31b.ba" placeholder="KWH" :disabled="true" ></el-input>
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
          <div slot="header" >
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
    <el-row>
      <el-col :span="12"> 
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sendForm">上报</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "calformDialog",
    components: {
    },
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
        gform:{}
      };
    },
    props: ["cdialogVisible"],

    methods: {
      // 报表上报
      sendForm() {
        this.gform = {
          fka312: this.form312.fa,
          bka312: this.form312.ba,
          fka313: this.form313.fa,
          bka313: this.form313.ba,
          fka322: this.form322.fa,
          bka322: this.form322.ba,
          fka323: this.form323.fa,
          bka323: this.form323.ba,
          fka31b: this.form31b.fa,
          bka311: this.form311.fa,
          bkr311: this.form311.fr,
          bka321: this.form321.fa,
          bkr321: this.form321.fr,
          fka111: this.form111.fa,
          bka111: this.form111.ba
        }
        this.$http({
          method: "post",
          url: "/api/fillcdf",
          data: this.gform
        }).then(res => {
            this.$message(res)
          })
          .catch(err => {
            this.$message.error(err);
          });
        this.shutDialog()
        
      },
      // 关闭dialog
      shutDialog() {
        this.$emit('changeCdv', false)

      },
    }
  };
</script>

<style scoped>

</style>