<template>
  <div class="container">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >运行分析</el-breadcrumb-item>
        <el-breadcrumb-item>工作票统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <!-- <div class="menu">
        <el-menu default-active="1" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">时间段</el-menu-item>
          <el-menu-item index="2">人员</el-menu-item>
        </el-menu>
      </div>-->
      <div class="selecter" v-if="timeSelect">
        <el-select v-model="selectValue" @change="handleChange" style="margin-right:20px">
          <el-option label="本月" value="month"></el-option>
          <el-option label="本季" value="season"></el-option>
          <el-option label="本年" value="year"></el-option>
          <el-option label="自定义" value="user_defined"></el-option>
        </el-select>
        <el-date-picker
          v-if="selectValue=='user_defined'"
          v-model="dateRangeVal"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-right:20px"
        ></el-date-picker>
        <el-select
          v-model="selectedUsers"
          @change="handleChangeSelectedUsers"
          style="margin-right:20px"
          multiple
          collapse-tags
          clearable="true"
        >
          <el-option-group key="0" label>
            <el-option key="0" label="全选" value="all"></el-option>
            <el-option key="1" label="全选-石桥子风电场" value="allSq"></el-option>
          </el-option-group>
          <el-option-group v-for="group in users" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </el-select>

        <el-button type="primary" v-show="showSearchBtn" @click="handleBtnClick">搜索</el-button>
        <el-button type="primary" v-show="showDownloadBtn" @click="handleDownloadBtnClick">下载</el-button>
      </div>
      <div class="table" v-show="showTable">
        <el-table
          :data="tableData"
          :default-sort="{prop: 'gzp_id', order: 'descending'}"
          ref="filterTable"
        >
          <el-table-column prop="gzp_id" label="票号" sortable column-key="gzp_id"></el-table-column>
          <el-table-column prop="wt" label="风机号" sortable column-key="wt"></el-table-column>
          <el-table-column prop="date" label="日期" sortable column-key="date"></el-table-column>
          <el-table-column prop="task" label="工作任务" sortable column-key="task"></el-table-column>
          <el-table-column
            prop="manage_person"
            label="工作负责人"
            :filters="tableFilters"
            :filter-method="handleTableFilter"
            @filter-change="handleFilterChange"
          ></el-table-column>
          <el-table-column prop="member" label="工作班成员"></el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "gzp-analysis",
  data() {
    return {
      dateRangeVal: [],
      showTable: false,
      tableData: "",
      selectValue: "",
      periodOptions: [
        {
          value: "month",
          label: "本月"
        },
        {
          value: "season",
          label: "本季度"
        },
        {
          value: "year",
          label: "本年"
        },
        {
          value: "user-defined",
          label: "自定义"
        }
      ],
      timeSelect: true,
      users: [],
      selectedUsers: [],
      tableFilters: [],
      changedTable: [],
      showDownloadBtn: false
    };
  },
  components: {},
  computed: {
    showSearchBtn: function() {
      if (this.selectedUsers.length == 0) {
        return false;
      } else {
        if (this.selectValue == "") {
          return false;
        } else if (this.selectValue == "user_defined") {
          if (this.dateRangeVal == "") {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http.get("/api/getusers").then(res => {
        this.users = res["data"];
        var filters = [];

        for (var array of res["data"]) {
          for (var option of array.options) {
            filters.push({
              text: option.label,
              value: option.label
            });
          }
        }
        this.tableFilters = filters;
      });
    },
    handleSelect(index) {
      if (index == 1) {
        this.timeSelect = true;
      } else {
        this.timeSelect = false;
      }
    },
    handleBtnClick() {
      Date.prototype.Format = function(fmt) {
        //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      var endTime = "";
      var startTime = "";
      var now = new Date();
      switch (this.selectValue) {
        case "user_defined":
          endTime = this.dateRangeVal[1];
          startTime = this.dateRangeVal[0];
          break;
        case "month":
          endTime = now.Format("yyyy-MM-dd");
          startTime = new Date(now.getFullYear(), now.getMonth()).Format(
            "yyyy-MM-dd"
          );
          break;
        case "season":
          endTime = now.Format("yyyy-MM-dd");
          startTime = new Date(
            now.getFullYear(),
            now.getMonth() - (now.getMonth() % 3)
          ).Format("yyyy-MM-dd");
          break;
        case "year":
          endTime = now.Format("yyyy-MM-dd");
          startTime = new Date(now.getFullYear(), 0).Format("yyyy-MM-dd");
          break;
      }
      this.$http({
        method: "post",
        data: {
          startTime: startTime,
          endTime: endTime,
          users: this.selectedUsers
        },
        url: "/api/gzp_by_days"
      }).then(res => {
        this.showTable = true;
        this.showDownloadBtn = true;
        this.tableData = res["data"];
      });
    },
    handleChangeSelectedUsers() {
      let res = [];
      //若全选
      if (this.selectedUsers.includes("all")) {
        for (var userArray of this.users) {
          for (var userItem of userArray.options) {
            res.push(userItem.value);
          }
        }
        this.selectedUsers = res;
      } else if (this.selectedUsers.includes("allSq")) {
        for (var userArray2 of this.users) {
          if (userArray2.label == "石桥子风电场") {
            for (var userItem2 of userArray2.options) {
              res.push(userItem2.value);
            }
          }
        }
        this.selectedUsers = res;
      }
    },
    handleTableFilter(value, row) {
      return row.manage_person === value;
    },
    handleFilterChange(val) {
      this.changedTable = val;
      // 调用API
    },
    handleDownloadBtnClick() {
      this.$http({
        method: "post",
        url: "/api/getGzpAnalysisExcel",
        data: this.tableData,
        responseType: "blob"
      }).then(res => {
        let now = new Date();
        const blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const fileName = "工作票统计" + this.formatDate(now) + ".xlsx";
        const linkNode = document.createElement("a");

        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = "none";
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click(); //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      });
    },
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + m + d + h + minute + second;
    }
  }
};
</script>
<style scoped>
.container {
  background-color: #fff;
  margin: 0;
  padding: 0;
}
.header {
  background-color: #fff;
  line-height: 60px;
  border-bottom: 1px inset #f0f0f0;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 40px;
  padding-left: 18px;
}

.selecter {
  background-color: #fff;
  margin-top: 2px;
  height: 52px;
  line-height: 50px;
}
.selecter > .el-select {
  /* width: 100px; */
}
.selecter > .el-select /deep/.el-input__inner {
  border: 0px;
  background-color: #fff;
}
.table {
  margin-top: 2px;
}
</style>