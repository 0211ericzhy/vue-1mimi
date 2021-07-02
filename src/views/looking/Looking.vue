<template>
  <div>
    <div>
      <el-button @click="btn">返回</el-button>
      <el-form
        ref="ruleForm"
        label-width="80px"
        size="mini"
        :rules="rules"
        :model="ruleForm"
      >
        <div class="title">{{ ruleForm.title }}</div>
        <div class="abstract">{{ ruleForm.abstract }}</div>
        <div class="author">发表于：{{ ruleForm.author }}</div>
        <div class="text">{{ ruleForm.text }}</div>
        <!-- <mavon-editor
          v-model="ruleForm.text"
          placeholder="请开始你的表演"
          prop="text"
        /> -->
      </el-form>
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
      ids: "",
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        text: "",
        date: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "用户名不能为空",
            // 触发事件 blur change
            trigger: "blur",
          },
        ],
        abstract: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "blur",
          },
        ],
        author: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "change",
          },
        ],
        source: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "change",
          },
        ],
        star: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "change",
          },
        ],
        text: [
          {
            required: true,
            message: "不能为空",
            // 触发事件 blur change
            trigger: "",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getDate() {
      axios
        .post("/api/article/article", {
          _id: this.ids,
        })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.data;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    btn(){
      this.$router.push('/Published')
    }
  },
  mounted() {
    this.ids = this.$route.query.look;
    this.getDate();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.title {
  text-align: center;
  font-size: 30px;
}
.abstract {
  font-size: 16px;
  text-align: center;
  margin-top: 15px;
}
.author {
  text-align: center;
  color: #cfced1;
  font-size: 12px;
}
.text {
  width: 1182px;
  height: 541px;
  background-color: pink;
  margin: auto;
}
</style>