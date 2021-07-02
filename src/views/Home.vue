<template>
  <div>
    <div class="header">
      <div class="box">
        <i class="iconfont icon-yonghu if1"></i>
        <div class="box2">
          <div class="head_font">New Vistis</div>
          <div>
            <countTo :startVal="0" :endVal="2017" :duration="3000">{{
              list.visits
            }}</countTo>
          </div>
        </div>
      </div>
      <div class="box">
        <i class="iconfont icon-xiaoxi if2"></i>
        <div class="box2">
          <div class="head_font">Messages</div>
          <div>
             <countTo :startVal="0" :endVal="2017" :duration="3000">{{
              list.messages
            }}</countTo>
          </div>
        </div>
      </div>
      <div class="box">
        <i class="iconfont icon-qian if3"></i>
        <div class="box2">
          <div class="head_font">Purchases</div>
          <div>
             <countTo :startVal="0" :endVal="2017" :duration="3000">{{
              list.Purchases
            }}</countTo>
          </div>
        </div>
      </div>
      <div class="box">
        <i class="iconfont icon-gouwuche if4"></i>
        <div class="box2">
          <div head_font>Shopping</div>
          <div>
             <countTo :startVal="0" :endVal="2017" :duration="3000">{{
              list.Shopping
            }}</countTo>
          </div>
        </div>
      </div>
    </div>
    <fist></fist>
    <mid></mid>
    <last></last>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import axios from "axios";
import fist from '../components/fist/Fist'
import mid from '../components/mid/Mid'
import Last from '../components/last/Last.vue';
export default {
  name: "",
  props: {},
  data() {
    return {
      list: "",
    };
  },
  components: {
    countTo,
    fist,
    mid,
    Last
  },
  methods: {
    getDate() {
      axios
        .get("/api/homeData")
        .then((res) => {
          this.list = res.data.data;
          // console.log(this.list);
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
.header {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .box {
    width: 250px;
    height: 100px;
    background-color: #fff;
    position: relative;
    .iconfont {
      font-size: 46px;
      position: absolute;
      top: 27px;
      left: 15px;
    }
    .if1{
      color: #45c6c2;
    }
    .if2{
      color: #42a4f1;
    }
    .if3{
      color: #f05972;
    }
    .if4{
      color: #fcb47c;
    }
  }
  .box2 {
    float: right;
    margin-right: 20px;
    margin-top: 20px;
    .head_font {
      font-size: 18px;
      color: #aac0d4;
    }
  }
}
</style>