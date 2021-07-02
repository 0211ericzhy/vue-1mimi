<template>
  <div>
    <div class="bbodys">
      <div class="box">支持拖拽</div>
      <div class="box1">Eliment UI 自带上传组件</div>

      <el-upload class="upload-demo" drag action="/api//upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

      <!--HTML部分-->
      <div id="image">
        <!--上传图片的按钮-->
        <a class="btn" @click="toggleShow">上传头像</a>
        <!--组件主体-->
        <myUpload
          field="img"
          @crop-success="cropSuccess"
          v-model="show"
          :width="400"
          :height="200"
          img-format="jpg"
          :size="size"
        ></myUpload>
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false, //剪切框显示和隐藏的flag
      size: 2.1,
    };
  },
  components: {
     myUpload,
  },
  methods: {
//控制剪切框的显示和隐藏
      toggleShow() {
        this.show = !this.show;
      },
      //剪切成功后的回调函数
      cropSuccess(imgDataUrl) {
        //  imgDataUrl其实就是图片的base64data码
        this.avatar = imgDataUrl;
        console.log(imgDataUrl)//这里打印出来的是base64格式的资源
        this.show = !this.show;
      }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bbodys {
  background-color: pink;
}
.box {
  width: 100px;
  height: 50px;
  font-size: 25px;
}
.box1 {
  line-height: 50px;
  padding: 10px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #eeeeee;
}
#image {
  padding-top: 200px;
}
.btn {
  background-color: indianred;
  padding: 7px 12px;
  color: white;
}
</style>