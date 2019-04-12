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
          <el-form-item label="时间">
            <el-time-select
              v-model="task.time"
              value-format
          :picker-options="{
          start: '08:00',
          step: '1:00',
          end: '24:00'
          }"
           placeholder="选择时间">
          </el-time-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTask">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-timeline>
      <el-timeline-item  placement = 'top'
        v-for="(todoitem,index) in todoitems"
        :key="index"
        :timestamp="todoitem.time+':00'"
        @click="sendTask(todoitem)"
      >
        <el-card shadow='hover'>
          {{todoitem.name}}
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>
<script>

export default {
  name: "TodoList",
  components: {
  },
  data() {
    return {  
      dialogVisible:false,
      task:{
        name:'',
        daily:false,
        day:1,
        time:''
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
      //  this.$alert(this.task,'查看task的值')
      var task = this.task
      if (task.daily == true){
        task.day = 0
      }
      this.$http({
        method:'post',
        url:'/api/tasks',  
        data:{
          name:task.name,
          day:task.day,
          time:task.time
        },
      }).then(()=>{
        this.$message({
          message:'添加成功！',
          type:'success'
        });
        
      }).catch(err=>{
        this.$message.error(err)
      })
      this.dialogVisible=false
     },
     sendTask(todoitem){ 
          this.$message({
            message:todoitem
          })
     }
  }
}
</script> 

<style scoped>
.todo-card {
  height: 500rpx;
}
</style>