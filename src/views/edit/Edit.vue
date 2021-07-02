<template>
  <div>
    <div class="box1">
      <el-row class="box2">
        <el-button type="danger" plain @click="backer"> 返回</el-button>
        <el-button type="primary" plain @click="putagain">发布</el-button>
      </el-row>
    </div>
    <div>
      <el-form
        ref="ruleForm"
        label-width="80px"
        size="mini"
        :rules="rules"
        :model="ruleForm"
      >
        <el-form-item label="文章标题" required prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" required prop="abstract">
          <el-input v-model="ruleForm.abstract"></el-input>
        </el-form-item>
        <div class="flex">
          <el-form-item label="作者" required prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" required prop="category">
            <el-select placeholder="请选择" v-model="ruleForm.category">
              <el-option label="vue" value="vue"></el-option>
              <el-option label="React" value="React"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="JavaScript" value="JavaScript"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" required prop="source">
            <el-select placeholder="请选择" v-model="ruleForm.source">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与其他人合作" value="与其他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" required prop="star">
            <el-select placeholder="请选择" v-model="ruleForm.star">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
              required
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
       <mavon-editor placeholder="请开始你的表演" prop="text" v-model="ruleForm.text" />
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
      list: [],
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
          this.list = res.data.data;
          console.log(this.list);
          this.ruleForm = this.list;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    putagain() {
      axios.post("/api//article/update", {
        id: this.ids,
        title: this.ruleForm.title,
        abstract: this.ruleForm.abstract,
        author: this.ruleForm.author,
        category: this.ruleForm.category,
        source: this.ruleForm.source,
        star: this.ruleForm.star,
        text: this.ruleForm.text,
        date: this.ruleForm.date,
      }).then((res) =>{
        console.log(res);
        this.$router.push('/Published')
      }).catch((err)=>{
        console.log('请求失败',err);
      });
    },
    backer(){
      this.$router.push('/Published')
    }
  },
  mounted() {
    this.ids = this.$route.query.ids;
    this.getDate();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>