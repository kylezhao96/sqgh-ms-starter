<template>
  <div class="container">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>运行分析</el-breadcrumb-item>
        <el-breadcrumb-item>生产总结分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="selecter">
      <el-date-picker
              class = 'datePicker'
              v-model="monthVal"
              type="month"
              placeholder="请选择月份">
      </el-date-picker>
      <el-button type="primary"  v-show="showSearchBtn"  size="medium" @click="handleBtnClick">生成分析报告</el-button>
      <!--    <el-button type="primary" v-show="showDownloadBtn" @click="handleDownloadBtnClick">下载</el-button>-->
    </div>
    <div class="main">
      <h2>一、生产指标完成情况</h2>
      <h3>（一）指标完成情况</h3>
      <h4>1、本月发电量情况：</h4>
      <p>{{monthData.month}}月份，石桥子风电场发电量{{monthData.gp}}万kWh，同比增加{{monthData.gptb1}}万kWh，涨幅{{monthData.gptb2}}%，完成月发电计划（{{monthData.mp}}万kWh）的{{monthData.mp1}}%，比月计划欠发电量{{monthData.mp2}}万kWh。</p>
      <p>{{monthData.month}}月份，公司平均风速{{monthData.ws}}m/s，同比增加{{monthData.wstb}}m/s。</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "sczjfx",
  data() {
    return {
      monthData: {
        month: 5,
        gp: 100,
        gptb1: 50,
        gptb2: 20,
        mp1: 40,
        mp2: 50,
        ws: 5,
        wstb: 2
      },
      // showSearchBtn:true,
      showDownloadBtn:true,
      monthVal:''
    };
  },
  computed:{
    showSearchBtn:function () {
      if(this.monthVal){
        return true
      }else {
        return false
      }
    }
  },
  methods:{
    handleBtnClick(){
      // this.$alert(this.monthVal)
      let today = new Date()
      if(this.monthVal >=today){
        this.$alert('非法月份')
      }else {
        this.$http({
          method:'post',
          data:{
            year:this.monthVal.getFullYear(),
            month:this.monthVal.getMonth()+1
          },
          url:"/api/getscdata"
        }).then(res=>{
          res
        })
      }

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
.selecter{
  padding-left: 20px;
  border-bottom: 1px inset #f0f0f0
}
.main {
  margin-left: 20px;
}
  .datePicker /deep/.el-input__inner {
    border: 0px;
    background-color: #fff;
  }
</style>