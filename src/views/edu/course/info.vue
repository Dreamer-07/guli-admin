<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="示例：机器学习项目课：从基础到搭建项目视"/>
      </el-form-item>
      <!-- 所属分类 -->
      <el-form-item label="课程类别">
        <!-- 一级分类 -->
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="selectParentSubject">
          <el-option
            v-for="subject in subjectParentList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"/>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectChildrenList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"/>
        </el-select>
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"/>
      </el-form-item>
      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/oss/file/upload'"
          class="avatar-uploader">
          <img :src="courseInfo.cover" alt="请选择封面"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
import subjectApi from '@/api/edu/subject'
import teacherApi from '@/api/edu/teacher'

import Tinymce from '@/components/Tinymce'

export default {
  name: "CourseInfo",
  components: {
    Tinymce
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: { // 课程信息
        id: this.$route.params.courseId,
        subjectParentId: '',
        subjectId: '',
        teacherId: '',
        cover: 'https://prover-guli.oss-cn-shenzhen.aliyuncs.com/default.jpg',
        price: 0,
        lessonNum: 0
      },
      teacherList: [], // 教师信息
      subjectParentList: [], // 一级分类列表
      subjectChildrenList: [], // 二级分类列表
    }
  },
  async mounted() {
    this.getAllTeacher()
    await this.getAllSubject()
    if (this.courseInfo.id) {
      // 回显数据
      await this.getCourseInfo()
      // 回显二级分类数据
      await this.selectParentSubject(this.courseInfo.subjectParentId, true)
    }
  },
  methods: {
    async next() {
      this.saveBtnDisabled = true
      try {
        let courseId;
        if (this.courseInfo.id) {
          await courseApi.updateCourseInfo(this.courseInfo.id, this.courseInfo);
          courseId = this.courseInfo.id;
        } else {
          const {data} = await courseApi.saveCourseInfo(this.courseInfo);
          courseId = data;
        }

        this.$message({
          type: 'success',
          message: '保存成功! 接下来请添加章节信息'
        })
        this.$router.push({
          name: 'CourseChapter',
          params: {
            courseId
          }
        })
      } catch (e) {
        this.saveBtnDisabled = false
        this.$message({
          type: 'warning',
          message: '保存失败啦! 要不重新试试?'
        })
      }
    },
    async getAllTeacher() {
      const {data} = await teacherApi.getAllTeacher();
      this.teacherList = data;
    },
    async getAllSubject() {
      const {data} = await subjectApi.getAllInTree();
      this.subjectParentList = data;
    },
    async getCourseInfo() {
      const {data} = await courseApi.getCourseInfo(this.courseInfo.id)
      this.courseInfo = data;
    },
    // 选择父分类后需要切换对应的子分类
    selectParentSubject(parentSubjectId, isUpdate = false) {
      this.subjectParentList.forEach(subject => {
        if (subject.id === parentSubjectId) {
          this.subjectChildrenList = subject.children;
          !isUpdate && (this.courseInfo.subjectId = '')
          return false;
        }
      })
    },
    // 封面上传成功
    handleAvatarSuccess({data}) {
      this.courseInfo.cover = data
    },
    // 封面上传之前可以通过该方法进行一个校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
