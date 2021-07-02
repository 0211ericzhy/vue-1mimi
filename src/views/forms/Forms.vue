<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="请输入你想输入的商品"
        class="forms_ipt"
        v-model="ipto"
      />
    </div>
    <div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column label="名称" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.GOODS_SERIAL_NUMBER
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="原价" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ORI_PRICE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现价" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.PRESENT_PRICE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="" :visible.sync="dialogVisible" width="30%">
        <div class="box1">名称：<el-input v-model="uuname" class="box" /></div>
        <div class="box1">
          原价：<el-input v-model="ori_pprice" class="box" />
        </div>
        <div class="box1">
          名称：<el-input v-model="now_price" class="box" />
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <div class="flex">
      <JsonExcel :data='tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)' type="xls" name="内容">
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </JsonExcel>
      <JsonExcel :data='tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)'  type="csv" name="内容">
        <el-button type="primary" size="small">导出csv</el-button>
      </JsonExcel>
    </div>
  </div>
</template>

<script>
import JsonExcel from "vue-json-excel";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      pagesize: 10, //每页的数据条数
      currentPage: 1,
      tableData: [],
      dialogVisible: false,
      uuname: "",
      ori_pprice: "",
      now_price: "",
      ipto: "",
      permanent: [],
    };
  },
  components: {
    JsonExcel,
  },
  methods: {
    getDate() {
      axios
        .get("/api/tableData")
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.permanent = res.data.data;
            console.log(this.tableData);
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(row) {
      console.log(row);
      this.tableData.splice(row, 1);
    },
    handleEdit(row) {
      this.dialogVisible = true;
      // console.log(row);
      this.uuname = row.NAME;
      this.ori_pprice = row.ORI_PRICE;
      this.now_price = row.PRESENT_PRICE;
    },
  },
  mounted() {
    this.getDate();
  },
  computed: {},
  watch: {
    ipto(val, val1) {
      console.log(val, val1);
      if (val !== "") {
        this.tableData = this.tableData.filter((item) => {
          return item.NAME.includes(val);
        });
      } else {
        this.tableData = this.permanent;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.forms_ipt {
  width: 200px;
  height: 40px;
}
.box {
  width: 250px;
}
.box1 {
  margin-bottom: 10px;
}
</style>