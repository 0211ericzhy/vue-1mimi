<template>
  <div>
    <el-container>
      <el-header class="header-out">
        <div class="header">
          <div>欢迎{{ username.username }}来到小米后台系统管理</div>
          <div>
            {{hallo()}}{{ username.username }}上次登陆时间{{ timer }}
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div>
            <el-col :span="12">
              <el-menu
                :default-active="$route.meta.index"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
              >
                <el-menu-item index="/">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Published">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>已发布</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Statistics">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>统计</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Release">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>发表文章</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Lebel">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>标签页</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Form">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导出Excel</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Updata">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>图片上传</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/Outnter">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>退出系统</span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-col>
          </div>
        </el-aside>

        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      timer: "",
      nowtime: "",
    };
  },
  components: {},
  methods: {
    hallo() {
      if (this.nowtime < 12 && this.nowtime > 6) {
        return "宝，早上好！";
      } else if (this.nowtime >= 12 && this.nowtime <= 14) {
        return "宝，中午好！";
      } else if (this.nowtime > 14 && this.nowtime <= 18) {
        return "宝，下午好！";
      } else if (this.nowtime > 18 && this.nowtime <= 24) {
        return "宝，晚上好！";
      } else {
        return "宝，该睡觉了！";
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user1");
    // 字符串转对象
    this.username = JSON.parse(user);
    // console.log(this.username);
    this.timer = dayjs(this.username.date).format("YYYY年MM月DD日hh时mm分ss秒");
    console.log(this.timer);
    this.nowtime = dayjs().format("HH");
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.header-out {
  padding: 0px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #305f83;
  color: #fff;
  font-size: 14px;
  padding: 0px 10px;
}
.el-col {
  width: 200px;
}
</style>