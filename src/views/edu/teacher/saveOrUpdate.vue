<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
          数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar ? teacher.avatar : 'https://prover-guli.oss-cn-shenzhen.aliyuncs.com/default.jpg'"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/oss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="btnDisabled" type="primary" @click="saveOrUpdate">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import teacherApi from '@/api/edu/teacher'

export default {
  name: 'TeacherSave',
  components: {
    ImageCropper,
    PanThumb
  },
  data() {
    return {
      tId: '',
      teacher: {},
      btnDisabled: false,
      // 接口 API 地址
      BASE_API: process.env.BASE_API,
      // 是否显示上传组件
      imagecropperShow: false,
      // 上传组件 id
      imagecropperKey: 0
    }
  },
  methods: {
    async saveOrUpdate() {
      const {tId, teacher} = this
      this.btnDisabled = true
      if (tId) {
        await teacherApi.editTeacher(tId, teacher)
      } else {
        await teacherApi.saveTeacher(teacher)
      }
      this.$message({
        type: 'success',
        message: `${tId ? '修改' : '保存'}成功!`
      })
      this.$router.push({name: 'TeacherIndex'})
    },
    async getTeacherDetail() {
      const {data} = await teacherApi.getTeacherDetail(this.tId);
      this.teacher = data
    },
    init() {
      if (this.$route.params.id) {
        this.tId = this.$route.params.id
        this.getTeacherDetail()
      } else {
        this.teacher = {}
        this.tId = ''
      }
    },
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.teacher.avatar = data
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
