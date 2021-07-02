<template>
  <div>
    <div class="">
      <div class="out_font">期待您下次光临</div>
      <div class="out_btn" @click="onout">确认退出</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    onout(){
      axios.get('/api//user/logout').then((res) =>{
        console.log(res); //status
        if(res.data.code ===0){
          localStorage.removeItem('user1')
          this.$router.push('/Loggin')
        }
      }).catch((err) =>{
        console.log('请求失败',err);
      })
    }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.out_font{
  margin-top: 40px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
}
.out_btn{
  width: 90px;
  height: 50px;
  margin: auto;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 50px;
  background-color: #46a0fc;
  color: #fff;
  cursor: pointer;
}
</style>