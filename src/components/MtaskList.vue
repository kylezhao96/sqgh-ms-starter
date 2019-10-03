<template>
        <el-card id="todo-list" class="todo-card">
          <div slot="header" class="todo-headedr">
            <!-- 增加任务弹窗 -->
            <el-dialog title="添加任务" :visible.sync="taskDialogVisible">
              <el-form :model="task">
                <el-form-item label="任务名">
                  <el-input v-model="task.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="每日工作">
                  <el-switch v-model="task.daily"></el-switch>
                </el-form-item>
                <el-form-item label="日期">
                  <el-input-number :disabled="task.daily" v-model="task.day" :min="1" :max="31" label="日期"></el-input-number>
                </el-form-item>
                <el-form-item label="时间">
                  <el-time-select v-model="task.time" :picker-options="{
                      start: '08:00',
                      step: '00:30',
                      end: '24:00',
                    }" placeholder="选择时间"></el-time-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelTask">取 消</el-button>
                <el-button type="primary" @click="addTask">确 定</el-button>
              </div>
            </el-dialog>
      
          
      
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
          <div v-for="(todoitem,index) in todoitems" :key="index" :style="{margin:'10px'}">
            <todo-item :todoitem="todoitem" @itemEmit1="showInfoDialog"></todo-item>
      
      
          </div>
      
      
        </el-card>
      </template>
      
      <script>
        import todoItem from "./TodoItem";
        export default {
          name: "mtaskList",
          components: {
            "todo-item": todoItem
          },
          data() {
            return {
              listTitle:'',
              taskDialogVisible: false,
              infoDialogVisible: false,
              todoitems: {},
              task: {},
              status: {
                todoNum: 0,
                num1: 0,
                num2: 0,
                num3: 0,
                windir: '东风'
              },
            };
          },
          props: ['title'],
          mounted() {
            this.listTitle = this.title
            var day = new Date().getDate();
            // 缓存处理
            if (this.$ls.get("tasksLoc") == undefined || this.$ls.get("today") != day) {
              this.$http
                .get("/api/monthlytasks")
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
      
            //与todoitem通信,这是典型的子父组件通信!!
            showInfoDialog(info) {
              this.infoDialogVisible = true
              this.$message(info.name)
              this.status.name = info.name
              this.status.hour = info.hour
              this.status.minute = info.minute
            },
          
    
          }
        };
      </script>
      
      <style scoped>
      
      </style>