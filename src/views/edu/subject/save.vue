<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a href="https://prover-guli.oss-cn-shenzhen.aliyuncs.com/xlsx/default.xlsx">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/edu/subject/upload/xlsx'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SubjectSave",
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
      fileUploadBtnText: '上传到服务器', // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false
    }
  },
  methods: {
    // 提交上传
    submitUpload() {
      this.loading = true
      this.importBtnDisabled = true
      this.fileUploadBtnText = '正在上传'
      this.$refs.upload.submit()
    },
    // 上传成功回调
    fileUploadSuccess() {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.$router.push({name: 'SubjectIndex'})
    },
    // 上传失败回调
    fileUploadError() {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>

</style>
