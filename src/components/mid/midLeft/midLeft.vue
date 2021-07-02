<template>
  <div>
    <div id="main1" :style="{ width: '300px', height: '300px' }"></div>
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
      newname: [],
      option: {
        legend: {
          data: [],
          top:'5%'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "" },
            { name: "" },
            { name: "" },
            { name: "" },
            { name: "" },
          ],
          center: ["50%", "50%"],
          radius: 130,
          startAngle: 90,
          splitNumber: 4,
          shape: "circle",
        },
        series: [
          {
            type: "radar",
            data: [
              {
                // value: [4200, 3000, 20000, 35000, 50000, 18000],
                value: [],
                name: "",
              },
              {
                value: [],
                name: "",
              },
              {
                value: [],
                name: "",
              },
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
        .get("/api/radarChat")
        .then((res) => {
          //   console.log(res);
          this.list = res.data.data;
        //   console.log(this.list);
          this.newname = this.list.map((item) => {
            return item.name;
          });
        //   console.log(this.newname);
          this.option.legend.data = this.newname;
          //   console.log(this.newname.join(','));
          //   this.option.series[0].name = this.newname.join(",");
          this.option.series[0].data[0].name = this.newname[0];
          this.option.series[0].data[1].name = this.newname[1];
          this.option.series[0].data[2].name = this.newname[2];
          //   let spllist= this.list[0]()
          // 拿到数组下标为1的属性名
          let arr = Object.keys(this.list[0]);
          arr.shift();
        //   console.log(arr);
          this.option.radar.indicator[0].name = arr[0];
          this.option.radar.indicator[1].name = arr[1];
          this.option.radar.indicator[2].name = arr[2];
          this.option.radar.indicator[3].name = arr[3];
          this.option.radar.indicator[4].name = arr[4];

          let arr1 = Object.values(this.list[0]);
          //   console.log(arr1);
          arr1.shift();
        //   console.log(arr1);
          this.option.series[0].data[0].value = arr1;
          console.log(this.option.series[0].data[0].value);
          let arr2 = Object.values(this.list[1]);
          //   console.log(arr1);
          arr2.shift();
        //   console.log(arr2);
          this.option.series[0].data[1].value = arr2;
          let arr3 = Object.values(this.list[2]);
          //   console.log(arr1);
          arr3.shift();
        //   console.log(arr3);
          this.option.series[0].data[2].value = arr3;

          let chartDom1 = document.getElementById("main1");
          let myChart1 = echarts.init(chartDom1);
          myChart1.setOption(this.option);
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