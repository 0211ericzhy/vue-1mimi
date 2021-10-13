<template>
  <div class="bodys">
    <div>111111dasd asdd</div>
    <div>dingqihui</div>
    <div>dingqihui22测试</div>
    <div class="log_form">
      <div class="log_form_head">欢迎来到小米后台管理系统</div>
      <div class="log_from_insi">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入账号名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入账号"
              show-password
            ></el-input>
          </el-form-item>
          <div class="erwema">
            <el-form-item
              label="请输入验证码"
              prop="VerificationCode"
              class="flex"
            >
              <div class="input-erw">
                <el-input
                  v-model="ruleForm.VerificationCode"
                  placeholder="请输入验证码"
                  class="box1"
                ></el-input>
              </div>

              <div v-html="codde" class="erwe" @click="erwai"></div>
            </el-form-item>
          </div>
          <div class="log_button">
            <el-form-item>
              <el-button type="primary" @click="click_logging"
                >立即登陆</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="enter_regis"
                >立即注册</el-button
              >
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
      codde: "",
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        VerificationCode: "",
      },
      // 验证规则  填入的属性就prop值
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            // 触发事件 blur change
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "用户名在2-8位",
            // 触发事件 blur change
            trigger: "blur",
          },
        ],
        password: [
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
        VerificationCode: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    click_logging() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.VerificationCode,
            })
            .then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("登陆成功");
                localStorage.setItem("user1", JSON.stringify(res.data.data[0]));
                // console.log(res.data.data[0]);
                this.$router.push("/");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          this.$message.error("用户名和密码错误");
        }
      });
    },
    enter_regis() {
      this.$router.push("/Register");
    },
    // getDate()
    getDate() {
      axios
        .get("/api/captcha")
        .then((res) => {
          console.log(res);
          this.codde = res.data;
        })
        .catch((err) => {
          "请求失败", err;
        });
    },
    erwai() {
      this.getDate();
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
.bodys {
  padding-top: 1px;
  background-color: #d4f1f1;
  height: 1000px;
  width: 100%;
}
.log_form {
  // padding-top: 1px;
  height: 400px;
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
.erwema {
  width: 500px;
  margin-left: 10px;
}
.erwe {
  margin-left: 89px;
}
</style>