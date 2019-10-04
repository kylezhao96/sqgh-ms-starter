<template>
  <el-card class="todo-item" :body-style="{padding :'0px', border:'0'}" shadow="hover">
    <el-row :style="{padding : '15px'}">
      <el-col  :span='2' @click.native="clickTask"><i class="el-icon-chat-line-square"></i></el-col>
      <el-col  :span='20' >{{name}}</el-col>
      <!-- <el-col :style="{padding : '20px'}" :span='2'>
        <el-button type='success' circle icon="el-icon-check" size='mini'></el-button>
      </el-col> -->


    </el-row>

  </el-card>
</template>
<script>
  export default {
    name: "todoItem",
    data() {
      return {
        name: '',
        hour: '',
        minute: ""
      }
    },
    mounted() {
      // 初始化操作
      this.name = this.todoitem.name
      this.hour = this.todoitem.hour
      this.minute = this.todoitem.minute
      this.type = this.todoitem.type
    },
    props: ['todoitem'],
    methods: {
        //  执行任务函数
        clickTask() {
          // this.$http({
          //   method:'post',
          //   url:'/api/dotask',  
          //   data:{
          //     name:this.name,
          //     time:this.time
          //   },
          // })
          if (this.type == "sendPower") {
            this.$emit('itemEmit1', this.todoitem)
          }
        },
    }
  };
</script>
<style>
  #todo-item {
    margin-bottom: 20px
  }
</style>