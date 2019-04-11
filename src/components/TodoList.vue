<template>
  <el-card id="todo-list" class="todo-card" :span="8">
    <div slot="header" class="todo-header">
      <span>今日待办：</span>
      <el-button @click="dialogVisible = true" icon="el-icon-plus" circle></el-button>
      <el-dialog title="添加任务" :visible.sync="dialogVisible">
        <el-form :model="task">
          <el-form-item label="任务名">
            <el-input v-model="task.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="每日工作">
            <el-switch v-model="task.daily"></el-switch>
          </el-form-item>
          <el-form-item label="日期">
            <el-input-number
              :disabled="task.daily"
              v-model="task.day"
              :min="1"
              :max="31"
              label="日期"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTask">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(todoitem,index) in todoitems"
        :key="index"
        :icon="todoitem.icon"
        :type="todoitem.type"
        :color="todoitem.color"
      >
        <todo-item :todoitem="todoitem"></todo-item>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>
<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: {
    "todo-item": TodoItem
  },
  data() {
    return {  
      dialogVisible:false,
      task:{
        name:'',
        daily:false,
        day:1
      }
    };  
  },
  props: {
    todoitems: {
      type: Array,
    }
  },
  methods:{
    addTask(){
      if task.daily==true:

      this.$http.post('localhost:5000/tasks', {
    name: task.name,
    day: task.
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
};
</script> 
<style scoped>
.todo-card {
  height: 500rpx;
}
</style>