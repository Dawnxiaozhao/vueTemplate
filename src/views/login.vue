<template>
  <div class="wrapper">
    <p>登录页面</p>
    <router-link :to="'home'">Home</router-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {
    this.imageShow();
  },
  methods: {
    imageShow() {
      this.$http.get("/imageValidate/imageShow", {}).then((res) => {
        //console.log(res)
      });
    },
    post() {
      this.$http
        .post("/order/updateOrderChek", sendData, {
          //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((res) => {
          if (res.respCode == "0000") {
            this.$message.success(res.respMsg);
          } else {
            this.$message.error(res.respMsg);
          }
        });
    },
    downloadGet(filePath) {
        // filePath 下载地址链接
      this.$http
        .downloadGet(this.urlPrefix + "/orderArchive/downloadArchive", {
          url: filePath,
          fileName: filePath.substring(
            filePath.lastIndexOf("\\") + 1,
            filePath.length
          ),
        })
        .then((res) => {});
    },
    handleImport(params) {
      var formData = new FormData();
      formData.append("file", params.file);
      this.$http
        .upload("post", this.urlPrefix + "/upload", formData)
        .then((res) => {
          if (res.respCode == "0000" || res.code == 0) {
            this.$message.success(res.message || res.respMsg);
          } else {
            this.$message.info(res.message || res.respMsg);
          }
        });
    },
    
    downloadM() {
      this.$http.download("get", "/biz/bdzl/policy/downloadModel");
    },

  },
  mounted() {},
};
</script>
<style  scoped>
</style>