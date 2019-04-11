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
        <el-submenu index="2" disabled>
          <template slot="title">自动化功能</template>
          <el-menu-item index="2-1">发送出力</el-menu-item>
          <el-menu-item index="2-2">上报集团公司日报</el-menu-item>
          <el-menu-item index="2-3">上报电网考核</el-menu-item>
        </el-submenu>

        <el-menu-item index="3" disabled>备件管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <todo-list></todo-list>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: "app",
  data(){
    return{
        activeIndex:"1"
    }
  },
  components: {
    "todo-list": TodoList
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
</style>
