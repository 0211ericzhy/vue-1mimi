<template>
  <div>
    <div>
      <template>
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="num" label="Order_No" width="180">
          </el-table-column>
          <el-table-column prop="price" label="price" width="180">
          </el-table-column>
          <el-table-column prop="status" label="status" width="180">
          </el-table-column>
          <el-table-column prop="status" label="status" width="180">
            <template slot-scope="scope">
                  <div v-if="scope.row.status===0"><el-tag type="danger">padding</el-tag></div>
                  <div v-if="scope.row.status===1"><el-tag type="success">padding</el-tag></div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      list:[],
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/orderData")
        .then((res) => {
          //   console.log(res);
          this.list = res.data.data;
        //   console.log(this.list);
        })
        .catch((res) => {
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