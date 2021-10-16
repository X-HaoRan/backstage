<template>
  <el-card class="box-card">
    <mianbao mydb="数据统计" mydb2="数据报表"></mianbao>
    <div id="main" style="width: 600px; height: 400px; margin-top:15px"></div>
  </el-card>
</template>
  


<script>
var echarts = require("echarts");
import instance from "../axios/axios";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.useEchart();
  },
  methods: {
    useEchart() {
        let option = {
     title: {
        text: '堆叠区域图'
     },
     tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
     },
     toolbox: {
        feature: {
            saveAsImage: {}
        }
     },
     grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true 
    }        
    };
      let mychart = echarts.init(document.getElementById("main"));
      instance.get(`reports/type/1`).then((res) => {
          console.log(res,'32333')
        var option2 = res.data.data;    
        let option3={...option,...option2}
      mychart.setOption(option3);
      });
      
    //   instance.get(`reports/type/1`).then((res) => {
    //     let option2 = res.data.data;
    //   });


    },
  },
};
</script>

<style  scoped>
</style>