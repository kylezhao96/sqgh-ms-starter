<template>
  <el-container>
    <el-header>
      <el-menu
        :span="24"
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="1" :route="{path:'/workbench'}">我的工作台</el-menu-item>
        <el-menu-item index="2" :route="{path:'/analysis'}">运行分析</el-menu-item>
        <!-- <el-menu-item index="3" disabled>备件管理</el-menu-item> -->
      </el-menu>
    </el-header>
    <el-main>
      <router-view keep-alive transition="fade" transition-mode="out-in"></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
// import WorkBench from "./components/WorkBench"
// import TodoItem from "./components/TodoItem";
export default {
  name: "app",
  data() {
    return {
      activeIndex: "1"
    };
  },
  components: {
    // "work-bench":WorkBench,
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
