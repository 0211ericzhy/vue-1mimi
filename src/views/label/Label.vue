<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="未读消息" name="first">
        <div>
          <el-table :data="unread11()" style="width: 100%" :show-header="false">
            <el-table-column width="800">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div @click="godialog(scope.row)">标签已读</div>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="all_target()">全部已读</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已读消息">
        <div>
          <el-table :data="unread22()" style="width: 100%" :show-header="false">
            <el-table-column width="800">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div @click="godialog1(scope.row)">标签已读</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button type="primary" @click="all_target1()">全部已读</el-button>
      </el-tab-pane>

      <el-tab-pane label="回收占">
        <el-table :data="unread33()" style="width: 100%" :show-header="false">
          <el-table-column width="800">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div @click="godialog(scope.row)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      unread: [
        {
          title: "系统通知 该系统将于今晚凌晨跟新",
          time: "2018年4月19日 20:00:00",
          read: false,
          delete: false,
        },
        {
          title: "系统通知 该系统将于今晚凌晨跟新",
          time: "2018年4月19日 20:00:00",
          read: false,
          delete: false,
        },
        {
          title: "系统通知 该系统将于今晚凌晨跟新",
          time: "2018年4月19日 20:00:00",
          read: true,
          delete: false,
        },
        {
          title: "系统通知 该系统将于今晚凌晨跟新",
          time: "2018年4月19日 20:00:00",
          read: true,
          delete: true,
        },
      ],
    };
  },
  components: {},
  methods: {
    godialog(row) {
      // console.log(row);
      row.read = true;
    },
    godialog1(row) {
      // console.log(row);
      row.delete = true;
    },

    unread11() {
      let list = this.unread.filter((item) => {
        return item.read === false && item.delete === false;
      });
      return list;
    },
    unread22() {
      let list1 = this.unread.filter((item) => {
        return item.read === true && item.delete === false;
      });
      return list1;
    },
    unread33() {
      let list2 = this.unread.filter((item) => {
        return item.read === true && item.delete === true;
      });
      return list2;
    },
    godialog(row) {
      // this.unread
      // let list2 = this.unread.filter((item) => {
      //   return item !==row
      // });
      console.log(row.index);
      // this.$delete(row,row.title)
      row={}
      
    },
    all_target() {
      this.unread.map((item) => {
        return (item.read = true);
      });
    },
    all_target1() {
      this.unread.map((item) => {
        return (item.delete = true);
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.tag_readed {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #eee;
}
.tag_allreaded {
  margin-top: 10px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #46a0fc;
  color: #eee;
}
</style>