<template>
  <div>
    <div>
      <div class="box-img">
        <img
          src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
          alt=""
        />
      </div>
      <!-- <div><el-progress :percentage= 'list.progress' :format="list.name"></el-progress></div> -->
      <template>
        <el-table :data="lists" style="width: 100%">
          <el-table-column prop="progress" width="180">
            <template slot-scope="scope">
              <el-progress
                :percentage="scope.row.progress"
                :format="list.name"
              ></el-progress>
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
      list: "",
      lists: [],
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/progress")
        .then((res) => {
          //   console.log(res);
          this.list = res.data.data;
          console.log(this.list);
          this.lists=this.list
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
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