<template>
  <!--  表码值填写 -->
  <el-dialog title="表码值填写" :visible.sync="visible" width="95%">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>110kV电度表</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form111">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>主变高压侧</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form2">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH" :disabled="true"></el-input>
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
          <div slot="header" class="clearfix">
            <span>301开关</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form301">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH" :disabled="true"></el-input>
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
          <div slot="header" class="clearfix">
            <span>302开关</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form302">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH" :disabled="true"></el-input>
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
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#1集电线电度表</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form312">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#2集电线</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form313">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#1SVG</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form311">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#1接地变开关</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form31B">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH" :disabled="true"></el-input>
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
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#3集电线</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form322">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#4集电线</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form323">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#2SVG</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form321">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH"></el-input>
            </el-form-item>
            <el-form-item label="正向无功">
              <el-input v-model="form111.fr" placeholder="KVarH"></el-input>
            </el-form-item>
            <el-form-item label="反向无功">
              <el-input v-model="form111.br" placeholder="KVarH" ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>#2接地变</span>
          </div>
          <el-form :label-position="left" label-width="80px" :model="form302">
            <el-form-item label="正向有功">
              <el-input v-model="form111.fa" placeholder="KWH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="反向有功">
              <el-input v-model="form111.ba" placeholder="KWH" :disabled="true"></el-input>
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
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    name: "calformDialog",
    components: {
    },
    data() {
      return {
        visible: true,
        form111: {}
      };
    },
    props: [],
    mounted() {

    },
    watch: {

    },
    methods: {
    }
  };
</script>

<style scoped>

</style>