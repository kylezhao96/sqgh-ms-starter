<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin-bottom:20px">
      <dtask-list title="日常工作"></dtask-list>
      <mtask-list title="月度工作"></mtask-list>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" style="margin-bottom:20px">
      <wtm-list></wtm-list>
      <pc-list></pc-list>
      <df-card></df-card>
    </el-col>
  </el-row>
</template>
<script>
import dtaskList from "./WorkBench/DtaskList";
import mtaskList from "./WorkBench/MtaskList.vue";
import wtmlist from "./WorkBench/WtmList.vue";
import pclist from "./WorkBench/PowerCutList.vue";
import dfcard from "./WorkBench/DailyFormCard.vue";
export default {
  name: "workbench",
  data() {
    return {};
  },
  components: {
    "dtask-list": dtaskList,
    "mtask-list": mtaskList,
    "wtm-list": wtmlist,
    "pc-list": pclist,
    "df-card": dfcard
  }
};
</script>
