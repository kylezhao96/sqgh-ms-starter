<template>
  <el-card class="todo-item" :body-style="{padding :'0px'}">
    <el-row>
      <el-col :style="{padding : '20px'}" :span='22' @click.native="clickTask">{{name}}</el-col>
      <el-col :style="{padding : '20px'}" :span='2'>
        <el-button type='success' circle icon="el-icon-check" size='mini'></el-button>
      </el-col>


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
        if (this.name == "发出力至诸城风电场") {
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