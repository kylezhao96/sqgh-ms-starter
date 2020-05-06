<template>
  <el-row>
    <el-col :span="16" offset="4">
      <analysis-body></analysis-body>
    </el-col>
  </el-row>
</template>
<script>
import AnalysisBody from "./AnalysisBody.vue";
export default {
  name: "analysis",
  data() {
    return {};
  },
  components: {
    "analysis-body": AnalysisBody
  }
};
</script>