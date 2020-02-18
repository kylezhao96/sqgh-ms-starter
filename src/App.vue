<template>
  <el-container>
    <el-header>
      <el-menu :span="24" :default-active="activeIndex" class="el-menu" mode="horizontal">
        <el-menu-item index="1">我的工作台</el-menu-item>
        <el-menu-item index="2" disabled>运行分析</el-menu-item>
        <el-menu-item index="3" disabled>备件管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="3" style='margin-bottom:20px'>
          <dtask-list :title="title1"></dtask-list>
          <mtask-list :title="title2"></mtask-list>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="10" style='margin-bottom:20px'>
          <wtm-list></wtm-list>
          <pc-list></pc-list>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import dtaskList from "./components/DtaskList";
import mtaskList from "./components/MtaskList";
import wtmlist from "./components/WtmList";
import pclist from "./components/PowerCutList"
// import TodoItem from "./components/TodoItem";
export default {
  name: "app",
  data() {
    return {
      activeIndex: "1",
      title1: "日常工作",
      title2: "月度工作"
    };
  },
  components: {
    "dtask-list": dtaskList,
    "mtask-list": mtaskList,
    "wtm-list": wtmlist,
    "pc-list": pclist
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-col {
  border-radius: 4px;
}
</style>
