

<template>
  <div>
    <h2>客户地区分布</h2>
    <div id="chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
export default {
  data() {
    return {};
  },
  mounted() {
    axios.get("http://localhost:8080//report//getCustomerRegion").then(res => {
      // console.log(res);
      // var obj = JSON(res.data);
      // console.log(obj);
      //this.list = obj
      console.log(res.data.x);
      console.log("-----------------------" + res.data.d);

      var tableData = res.data.d;

      console.log("=====================" + typeof tableData);

      let this_ = this;
      console.log("-------------------" + this);
      let myChart = echarts.init(document.getElementById("chart"));
      //div中要有id mounted中要利用div的id来返回图形

      let option = {
        angleAxis: {
          type: "category",
          data: [res.data.x[0], res.data.x[1], res.data.x[2], res.data.x[3]],
          z: 10
        },
        radiusAxis: {},
        polar: {},
        series: [
          {
            type: "bar",
            data: [res.data.d[0], res.data.d[1], res.data.d[2], res.data.d[3]],
            coordinateSystem: "polar",
            name: "A",
            stack: "a"
          }
        ],
        legend: {
          show: true,
          data: ["A"]
        }
      };

      myChart.setOption(option);

      // 这句是把图像加载到option中

      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    });
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart {
  width: 50%;
  height: 500px;
  margin: 0 auto;
}
</style>
