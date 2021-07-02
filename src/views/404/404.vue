<template>
  <div class="bodys">
      <div class="imgbox">
          <img src="../../assets/404.jpeg" alt="">
      </div>
      <div class="font">返回主页</div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.bodys{
    background-color:#f9fbfa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.font{
    text-align: center;
    line-height: 60px;
    border-radius: 15px;
    width: 100px;
    height: 60px;
    background-color: skyblue;
    font-size: 25px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
}
</style>