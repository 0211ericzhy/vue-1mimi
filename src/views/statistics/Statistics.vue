<template>
  <div>
    <div>
      <div class="header">
        <div class="box11">
          今日发布
          <div class="lengths">{{ list.length }}</div>
          <i class="el-icon-check"></i>
        </div>
        <div class="box2">
          原创文章
          <div class="lengths">{{ cate }}</div>
          <i class="el-icon-s-order"></i>
        </div>
        <div class="box3">
          新留言
          <div class="lengths">0</div>
          <i class="el-icon-bell"></i>
        </div>
        <div class="box4">
          新消息
          <div class="lengths">0</div>
          <i class="el-icon-phone"></i>
        </div>
      </div>
      <div class="box0">
        <div id="main" :style="{ width: '500px', height: '500px' }"></div>
        <div id="main1" :style="{ width: '500px', height: '500px' }"></div>
      </div>
      <div id="main2" :style="{ width: '1000px', height: '500px' }"></div>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
import axios from "axios";
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      option: {
        legend: {},
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      option1: {
        legend: {},
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [50, 110],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [],
          },
        ],
      },
      option2: {
        title: {
          subtext: "数量",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: function (params) {
          //   var tar = params[1];
          //   return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          // },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [],
          // 时间
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              borderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                borderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [],
            // 每个阶段的占地篇数的剩余量
          },
          {
            name: "篇数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [],
            // 第一个值为总数 ，剩下为每一个时间对应的发布数量
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          console.log(res);
          this.list = res.data.data;
          // console.log(this.list);
          let arr = lodash.groupBy(this.list, "category");
          for (let i in arr) {
            this.option.series[0].data.push({ value: arr[i].length, name: i });
          }
          // console.log(arr);

          let arr1 = lodash.groupBy(this.list, "source");
          for (let g in arr1) {
            this.option1.series[0].data.push({
              value: arr1[g].length,
              name: g,
            });
          }
          let arr2 = lodash.groupBy(this.list, "date");
          console.log(this.list.length);
          console.log(arr2);
          this.option2.series[1].data.push(this.list.length);
          this.option2.xAxis.data.push("总计");
          this.option2.series[0].data.push(0);
          for (let e in arr2) {
            console.log(this.list.length - arr2[e].length);
            this.option2.series[1].data.push(arr2[e].length);
            this.option2.xAxis.data.push(
              dayjs(arr2[e].date).format("YYYY年MM月DD日")
            );
            this.option2.series[0].data.push(this.list.length - arr2[e].length);
            this.option2.series[0].data.push();
            // console.log(arr[e].length);
            // console.log(dayjs(arr2[e].date).format("YYYY年MM月DD日"));
          }
          console.log(this.option2.xAxis.data);

          var chartDom = document.getElementById("main");
          var myChart = echarts.init(chartDom);
          myChart.setOption(this.option);

          var chartDom1 = document.getElementById("main1");
          var myChart1 = echarts.init(chartDom1);
          myChart1.setOption(this.option1);

          var chartDom2 = document.getElementById("main2");
          var myChart2 = echarts.init(chartDom2);
          myChart2.setOption(this.option2);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getDate();
  },
  computed: {
    cate() {
      let cate = 0;
      this.list.map((item) => {
        if (item.source === "原创") {
          cate++;
        }
      });
      return cate;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.header {
  margin: auto;
  width: 1181px;
  height: 60px;
  background-color: pink;
  display: flex;
  .box1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 60px;
  }
  .box11 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 60px;
    background-color: #7fcabf;
    color: #fff;
    .el-icon-check {
      position: absolute;
      top: 16px;
      right: 28px;
      font-size: 24px;
    }
  }
  .box2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 60px;
    background-color: #e68a89;
    color: #fff;
    .el-icon-s-order {
      position: absolute;
      top: 16px;
      right: 28px;
      font-size: 24px;
    }
  }
  .box3 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 60px;
    background-color: #8376a2;
    color: #fff;
    .el-icon-bell {
      position: absolute;
      top: 16px;
      right: 28px;
      font-size: 24px;
    }
  }
  .box4 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 295px;
    height: 60px;
    background-color: #a0cec1;
    color: #fff;
    .el-icon-phone {
      position: absolute;
      top: 16px;
      right: 28px;
      font-size: 24px;
    }
  }
}
.lengths {
  position: absolute;
  top: 36px;
  left: 134px;
}
.box0 {
  margin-top: 50px;
}
.box0 {
  display: flex;
}
</style>