<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="20"><b>石桥子风电场办公管理系统</b></el-col>
<!--        <el-col :span="4">欢迎您，值班员！</el-col>-->
      </el-row>
    </el-header>
    <el-container style="height:100%">
      <el-aside width="200px" class="aside">
        <el-menu :span="24"  :router="true" :collapse="false" style='border:0;'>
          <el-menu-item index="1" :route="{path:'/workbench'}">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot='title'>
               <i class="el-icon-data-line"></i>
              <span slot="title">运行分析</span>
            </template>
            <el-menu-item index="2-1" :route="{path:'/gzp-analysis'}">工作票统计</el-menu-item>
            <el-menu-item index="2-2" :route="{path:'/sc-analysis'}">生产总结分析</el-menu-item>
            <el-menu-item index="2-3" >数据对比</el-menu-item>
          </el-submenu>

          <!-- <el-menu-item index="3" disabled>
             <i class="el-icon-box"></i>
            <span slot="title">备件管理</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main >
        <router-view keep-alive transition="fade" transition-mode="out-in"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import WorkBench from "./components/WorkBench"
// import TodoItem from "./components/TodoItem";
import "./assets/font/font.css"
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
}
.el-col {
  border-radius: 4px;
}
.header{
  background-color: #409eff;
  font-size: 20px;
  line-height: 60px;
  color:#fff;
}
body{
  padding: 0;
  margin: 0;
  background-color: #f0f0f0;
  font-family: OppoSans;
}
.container{
  min-height: 100vh;
}
.aside{
  background-color: #fff;
  margin-right: 1px;
}
.container /deep/ .el-main{
  padding:0px
}
</style>
