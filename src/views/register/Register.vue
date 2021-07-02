<template>
  <div class="bodys">
    <div class="log_form">
      <div class="log_form_head">欢迎来到小米后台管理系统</div>
      <div class="log_from_insi">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username1">
            <el-input
              v-model="ruleForm.username1"
              placeholder="请输入账号名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password1">
            <el-input
              v-model="ruleForm.password1"
              placeholder="请输入账号"
              show-password
            ></el-input>
          </el-form-item>
          <div class="log_button">
            <el-form-item>
              <el-button type="primary" @click="clickpost">立即注册</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="click_loggin">立即登陆</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    let checkuserName1 = (rule, value, callback) => {
      let regex = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regx.tesr(value)) {
        return callback(new Error("用户名不能为中文"));
      } else {
        return callback;
      }
    };
    return {
      // 表单数据
      ruleForm: {
        username1: "",
        password1: "",
      },
      // 验证规则  填入的属性就prop值
      rules: {
        username1: [
          {
            required: true,
            message: "用户名不能为空",
            // 触发事件 blur change
            trigger: "blur",
          },
          {
            min: 6,
            max: 8,
            message: "用户名在6-8位",
            // 触发事件 blur change
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "密码为6-12位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    clickpost() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message.success("注册成功");
          axios
            .post("/api/user/register", {
              username: this.ruleForm.username1,
              password: this.ruleForm.password1,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("请求失败", err);
            });  
             this.$router.push('/Loggin')   
        } else {
          this.$message.error("用户名和密码错误");
        }
      });
    },
    click_loggin(){
      this.$router.push('/Loggin')
    }
  },
  // getDate(){

  // },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bodys {
  padding-top: 1px;
  background-color: #d4f1f1;
  height: 1000px;
  width: 100%;
}
.log_form {
  // padding-top: 1px;
  height: 350px;
  width: 500px;
  margin: 256px auto;
  background-color: #fff;
}
.log_from_insi {
  margin-top: 20px;
  width: 400px;
}
.log_form_head {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #ebeef5;
}
.log_button {
  display: flex;
}
</style>