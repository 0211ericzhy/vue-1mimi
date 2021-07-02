<template>
  <div>
    <div>
      <div id="main2" :style="{ width: '300px', height: '300px' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: "",
      option2: {
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
            type: "pie",
            radius: [20, 80],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              //   { value: 40, name: "rose 1" },
              //   { value: 38, name: "rose 2" },
              //   { value: 32, name: "rose 3" },
              //   { value: 30, name: "rose 4" },
              //   { value: 28, name: "rose 5" },
              //   { value: 26, name: "rose 6" },
              //   { value: 22, name: "rose 7" },
              //   { value: 18, name: "rose 8" },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/ringChat")
        .then((res) => {
          //   console.log(res);
          this.list = res.data.data;
        //   console.log(this.list);
          let arr = this.list.map((item) => {
            return { value: item.data, name: item.name };
          });
          this.option2.series[0].data = arr;
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
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>