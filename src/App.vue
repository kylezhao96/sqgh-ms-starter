<template>
  <el-container>
    <el-header>
      <el-menu
        :span="24"
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
      >
        <el-menu-item index="1">我的工作台</el-menu-item>
        <el-menu-item index="2" disabled>运行分析</el-menu-item>
        <el-menu-item index="3" disabled>备件管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
            <dtask-list :title="title1"></dtask-list>
        </el-col>
        <el-col :span="12">
            <mtask-list :title="title2"></mtask-list>
        </el-col>
      </el-row>
      
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import dtaskList from "./components/DtaskList";
import mtaskList from "./components/MtaskList";
// import TodoItem from "./components/TodoItem";
export default {
  name: "app",
  data(){
    return{
        activeIndex:"1",
        title1:"日常工作",
        title2:"月度工作"
    }
  },
  components: {
    "dtask-list": dtaskList,
    "mtask-list": mtaskList
  },
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
</style>
