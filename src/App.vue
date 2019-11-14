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
        <el-col :xs="24" :sm="18" :md="12" :lg="6" :xl="3">
          <dtask-list :title="title1"></dtask-list>
          <mtask-list :title="title2"></mtask-list>
        </el-col>
        <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">
          <wtm-list></wtm-list>
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
    "wtm-list": wtmlist
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
