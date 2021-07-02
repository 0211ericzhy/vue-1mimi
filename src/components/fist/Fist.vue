<template>
  <div>
    <div class="box1">
      <div id="main" :style="{ width: '1200px', height: '500px' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import lodash from "lodash";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: "",
      newnum: [],
      newnum1:[],
      olddate: [],
      option: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["actual", "expected"],
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          //   data: this.newdate,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "actual",
            type: "line",
            stack: "总量",
            data: [],
            smooth:true
          },
          {
            name: "expected",
            type: "line",
            stack: "总量",
            data: [],
            smooth:true
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          //   console.log(res);
          (this.list = res.data.data),
        //    console.log(this.list);
          this.olddate = this.list.map((item) => {
            return item.date;
          });
          this.option.xAxis.data = this.olddate;
        //   console.log(this.olddate);
          this.newnum=this.list.map((item)=>{
              return item.actual
          })
        //   console.log(this.newnum);
          this.option.series[0].data = this.newnum;
           this.newnum1=this.list.map((item)=>{
              return item.expected
          })
        //   console.log(this.newnum1);
          this.option.series[1].data = this.newnum1;

          let chartDom = document.getElementById("main");
          let myChart = echarts.init(chartDom);
          myChart.setOption(this.option);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box1 {
  margin-top: 20px;
  background-color: #fff;
}
</style>