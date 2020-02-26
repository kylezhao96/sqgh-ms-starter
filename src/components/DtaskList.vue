<template>
  <el-card id="todo-list" class="todo-card" v-loading = loading>
    <div slot="header" class="todo-headedr">
      <!-- 用于填写出力的对话框 -->
      <status-dialog :shour="shour" :sdialogVisible="dialogVisible_1" @changeSdv="changeSdv"></status-dialog>
      <!-- 标题 -->
      <el-row>
        <el-col :span="6">
          <el-badge :value="todoNum" class="item">{{listTitle}}</el-badge>
        </el-col>
        <!-- <el-col :span="2">
                <el-button class='addbutton' @click="taskDialogVisible = true" icon="el-icon-plus" circle></el-button>
        </el-col>-->
      </el-row>
    </div>
    <!-- todoitem -->
    <div
      class="todoitem"
      v-for="(todoitem,index) in todoitems"
      :key="index"
      :style="{margin:'2px'}"
    >
      <!-- <todo-item :todoitem="todoitem" @itemEmit1="showInfoDialog"></todo-item> -->
      <el-card
        class="todo-item"
        :body-style="{padding :'0px'}"
        shadow="hover"
        @click.native="clickTask(todoitem)"
      >
        <el-row :style="{padding : '15px'}">
          <el-col :span="2">
            <i class="el-icon-chat-line-square"></i>
          </el-col>
          <el-col :span="20">{{todoitem.name}}</el-col>
          <!-- <el-col :style="{padding : '20px'}" :span='2'>
                  <el-button type='success' circle icon="el-icon-check" size='mini'></el-button>
          </el-col>-->
        </el-row>
      </el-card>
    </div>
  </el-card>
</template>

<script>
import statusDialog from "./StatusDialog.vue";
export default {
  name: "dtaskList",
  components: {
    "status-dialog": statusDialog,
  },
  data() {
    return {
      shour: "",
      // 填写出力对话框
      dialogVisible_1: false,

      listTitle: "",
      taskDialogVisible: false,
      todoitems: {},
      task: {},
      loading: false,
    };
  },
  props: ["title"],
  mounted() {
    this.listTitle = this.title;
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
      this.task = {};
    },
    //取消任务添加
    cancelTask() {
      this.taskDialogVisible = false;
      this.initTask();
    },
    //添加任务函数
    addTask() {
      //  this.$alert(this.task,'查看task的值')
      var task = this.task;
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
          this.initTask();
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
      if (e.type == "发出力") {
        this.shour = e.hour;
        this.dialogVisible_1 = true;
      }
      if (e.name == "报送集团公司日报") {
        this.loading = true
        this.$message("开始执行！");
        this.$http({
          method:'get',
          url:"/api/submitjtrb"
        }).then(res=>{
          this.loading = false
          if(res.status == 200){
            this.$message("填写已完成，请自行检验");
          }else{
            this.$message.error("发生未知错误！");
          }
        })
      }
    },
    // sdialog发生状态改变时传值
    changeSdv(e) {
      this.dialogVisible_1 = e;
    },

    
  }
};
</script>

<style scoped>
.todo-card {
  margin-bottom: 20px;
}
</style>