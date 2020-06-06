<template>
  <el-row :gutter="20">
    <!-- <el-col  style="margin-bottom:20px">
      <dtask-list title="日常工作"></dtask-list>
      <mtask-list title="月度工作"></mtask-list>
    </el-col> -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <wtm-list></wtm-list>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
      <pc-list></pc-list>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
      <df-card></df-card>
    </el-col>

  </el-row>
</template>
<script>
// import dtaskList from "./WorkBench/DtaskList";
// import mtaskList from "./WorkBench/MtaskList.vue";
import wtmlist from "./WorkBench/WtmList.vue";
import pclist from "./WorkBench/PowerCutList.vue";
import dfcard from "./WorkBench/DailyFormCard.vue";
export default {
  name: "workbench",
  data() {
    return {};
  },
  components: {
    // "dtask-list": dtaskList,
    // "mtask-list": mtaskList,
    "wtm-list": wtmlist,
    "pc-list": pclist,
    "df-card": dfcard
  }
};
</script>
