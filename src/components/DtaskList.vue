<template>
  <el-card id="todo-list" class="todo-card">
    <div slot="header" class="todo-headedr">
      <status-dialog :shour="shour" :sdialogVisible='sdialogVisible' @changeSdv='changeSdv'></status-dialog>
      <calform-dialog :cdialogVisible ='cdialogVisible' @changeCdv='changeCdv'></calform-dialog>
      <!-- 标题 -->
      <el-row>
        <el-col :span="6">
          <el-badge :value="todoNum" class="item">{{listTitle}}</el-badge>
        </el-col>
        <!-- <el-col :span="2">
                <el-button class='addbutton' @click="taskDialogVisible = true" icon="el-icon-plus" circle></el-button>
              </el-col> -->
      </el-row>
    </div>
    <!-- todoitem -->
    <div class="todoitem" v-for="(todoitem,index) in todoitems" :key="index" :style="{margin:'2px'}">
      <!-- <todo-item :todoitem="todoitem" @itemEmit1="showInfoDialog"></todo-item> -->
      <el-card class="todo-item" :body-style="{padding :'0px'}" shadow="hover" @click.native="clickTask(todoitem)">
        <el-row :style="{padding : '15px'}">
          <el-col :span='2'><i class="el-icon-chat-line-square"></i></el-col>
          <el-col :span='20'>{{todoitem.name}}</el-col>
          <!-- <el-col :style="{padding : '20px'}" :span='2'>
                  <el-button type='success' circle icon="el-icon-check" size='mini'></el-button>
                </el-col> -->
        </el-row>

      </el-card>

    </div>


  </el-card>
</template>

<script>
  import statusDialog from "./StatusDialog.vue"
  import calformDialog from "./CalFormDialog.vue"
  export default {
    name: "dtaskList",
    components: {
      "status-dialog": statusDialog,
      "calform-dialog": calformDialog
    },
    data() {
      return {
        shour: '',
        sdialogVisible: false,
        cdialogVisible: false,
        listTitle: '',
        taskDialogVisible: false,
        todoitems: {},
        task: {},
      };
    },
    props: ['title'],
    mounted() {
      this.listTitle = this.title
      var day = new Date().getDate();
      // 缓存处理
      if (this.$ls.get("tasksLoc") == undefined || this.$ls.get("today") != day) {
        this.$http
          .get("/api/dailytasks")
          .then(res => {
            this.$ls.set("tasksyLoc", JSON.stringify(res["data"]["items"]));
            // this.$ls.set("today", day);
            this.todoitems = res["data"]["items"];
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
      // 缓存数据传递给实例
      this.todoitems = JSON.parse(this.$ls.get("tasksLoc"));
    },
    methods: {
      // 初始化taskDialog
      initTask() {
        this.task = {
        }
      },
      //取消任务添加
      cancelTask() {
        this.taskDialogVisible = false
        this.initTask()
      },
      //添加任务函数
      addTask() {
        //  this.$alert(this.task,'查看task的值')
        var task = this.task
        if (task.daily == true) {
          task.day = 0;
        }
        this.$http({
          method: "post",
          url: "/api/tasks",
          data: {
            name: task.name,
            day: task.day,
            time: task.time
          }
        })
          .then(() => {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.initTask()
            // 此处增加todolist
            // this.todoitems = this.todoitems.push({
            //   name:task.name,
            //   day:task.day,
            //   time:task.time.substring(0,task.time.length-3)
            // })
          })
          .catch(err => {
            this.$message.error(err);
          });
        this.taskDialogVisible = false;
      },

      // 点击事件
      clickTask(e) {
        if (e.type == "sendPower") {
          this.shour = e.hour
          this.sdialogVisible = true
        }
        if(e.name == '表码值录入'){
          this.cdialogVisible = true
        }
      },
      // sdialog发生状态改变时传值
      changeSdv(e) {
        this.sdialogVisible = e
      },
      // cdialog状态传递
      changeCdv(e){
        this.cdialogVisible =e
      }
    }
  };
</script>

<style scoped>

</style>