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
      
            <!-- 发送出力弹窗 -->
            <el-dialog title="生产信息" :visible.sync='infoDialogVisible'>
              <el-form :model="status" label-position="left" label-width="80px">
                <el-form-item label="出力">
                  <el-input v-model="status.power" placeholder="MW"></el-input>
                </el-form-item>
                <el-form-item label="风速">
                  <el-input v-model="status.windspeed" placeholder="m/s"></el-input>
                </el-form-item>
                <el-form-item label="风向">
                  <el-select v-model="status.windir" placeholder="北风" :maxlength="255">
                    <el-option label="东风" value="东"></el-option>
                    <el-option label="南风" value="南"></el-option>
                    <el-option label="西风" value="西"></el-option>
                    <el-option label="北风" value="北"></el-option>
                    <el-option label="东南风" value="东南"></el-option>
                    <el-option label="西南风" value="西南"></el-option>
                    <el-option label="东北风" value="东北"></el-option>
                    <el-option label="西北风" value="西北"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="维护">
                  <el-input-number v-model="status.num1" controls-position="right" :min="0" :max="40"></el-input-number>
                </el-form-item>
                <el-form-item label="故障">
                  <el-input-number v-model="status.num2" controls-position="right" :min="0" :max="40"></el-input-number>
                </el-form-item>
                <el-form-item label="无通讯">
                  <el-input-number v-model="status.num3" controls-position="right" :min="0" :max="40"></el-input-number>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="infoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmStatus">确 定</el-button>
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
          <div class="todoitem" v-for="(todoitem,index) in todoitems" :key="index" :style="{margin:'2px'}">
            <todo-item :todoitem="todoitem" @itemEmit1="showInfoDialog"></todo-item>
      
      
          </div>
      
      
        </el-card>
      </template>
      
      <script>
        import todoItem from "./TodoItem";
        export default {
          name: "dtaskList",
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
      
            //与todoitem通信,这是典型的子父组件通信!!
            showInfoDialog(info) {
              this.infoDialogVisible = true
              this.$message(info.name)
              this.status.name = info.name
              this.status.hour = info.hour
              this.status.minute = info.minute
            },
      
            //确认出力填写
            confirmStatus() {
              // if(this.status.windir == east){
              //   this.
              // }
              this.$http({
                method: "post",
                url: "/api/dotask",
                data: {
                  hour: (Array(2).join(0) + this.status.hour).slice(-2),
                  windspeed: this.status.windspeed,
                  power: this.status.power,
                  windir: this.status.windir,
                  num1: this.status.num1,
                  num2: this.status.num2,
                  num3: this.status.num3
                }
              })
                .then(res => {
                  this.infoDialogVisible = false
                  this.$notify({
                    title: '已经复制到粘贴板',
                    message: res['data'],
                    type: 'success',
                    // duration: 0,
                    onClick: () => {
                      this.fixInfo(res['data'])
                    }
                  });
                })
                .catch(err => {
                  this.$message.error(err);
                });
            },
      
            // 修改文档
            fixInfo(info) {
              this.$prompt('请在下方修改', '修改出力', {
                inputValue: info,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                inputType: 'textarea'
              }).then(({ value }) => {
                this.$http({
                  method: "post",
                  url: "/api/fixclip",
                  data: {
                    info: value
                  }
                })
                  .then(res => {
                    this.$notify({
                      title: '已经复制到粘贴板',
                      message: res['data'],
                      type: 'success',
                      // duration: 0,
                      onClick: () => {
                        this.fixInfo(res['data'])
                      }
                    });
      
                  })
                  .catch(err => {
                    this.$message.error(err);
                  });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });
              });
      
            }
          }
        };
      </script>
      
      <style scoped>
        .todoitem{

        }
      
      </style>