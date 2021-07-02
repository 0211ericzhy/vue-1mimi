<template>
  <div>
    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          fixed
          prop="list.length"
          label="#"
          width="50"
          type="index"
        >
        </el-table-column>
        <el-table-column
          fixed
          prop="title"
          label="标题"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="author"
          label="作者"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="类目" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.category === 'vue'" type="success">{{
              scope.row.category
            }}</el-tag>
            <el-tag v-else-if="scope.row.category === 'React'" type="info">{{
              scope.row.category
            }}</el-tag>
            <el-tag
              v-else-if="scope.row.category === 'Node.js'"
              type="warning"
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === 'JavaScrip'"
              type="danger"
              >{{ scope.row.category }}</el-tag
            >
            <el-tag v-else>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="source"
          label="来源"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="star"
          label="重要"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-rate v-model="scope.row.starNum" disabled> </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          label="发布时间"
          width="120"
          prop="date"
          align="center"
        >
          <template slot-scope="scope">
            {{ timer(scope.row.date) }}
            <!-- {{scope.row.data}}  -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="changed(scope.row._id)"
              >编辑</el-button
            >
            <el-button type="danger" plain @click="dele(scope.row._id)"
              >删除</el-button
            >
            <el-button type="success" plain @click="looking(scope.row._id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.list.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
      // 永久储存
      permanent: [],
      pagesize: 10,
      click_id: "",
      del_id: "",
      look_id: "",
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.list = res.data.data;
            // this.permanent = res.data.data;
            this.list.map((item) => {
              return this.$set(item, "starNum", Number(item.star));
            });
          }
          console.log(this.list);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    handleSizeChange(row) {
      // console.log(row);
    },
    handleCurrentChange() {},
    changed(val) {
      // this.$router.push('/Edit')
      // console.log(val);
      console.log(val);
      this.click_id = val;
      this.$router.push({
        path: "/Edit",
        query: {
          ids: this.click_id,
        },
      });
    },
    dele(val) {
      console.log(val);
      this.del_id = val;
      axios
        .post("/api/article/delete", {
          _id: this.del_id,
        })
        .then((res) => {
          console.log(res);
          // this.list=this.list.filter((item) =>{
          //   return item.id !== this.del_id
          this.getDate();
          // })
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    timer(row) {
      // console.log(row);
      if (row === "") {
        return row;
      } else {
        return dayjs(r ow).format("YYYY年MM月DD日");
      }
      //
    },
    looking(val) {
      // console.log(val);
      this.look_id = val;
      // console.log(this.look_id);
      this.$router.push({
        path: "/Looking",
        query: {
          look: this.look_id,
        },
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
.box11 {
  display: flex;
}
</style>