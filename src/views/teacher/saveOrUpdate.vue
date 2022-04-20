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
      <el-form-item>
        <el-button :disabled="btnDisabled" type="primary" @click="saveOrUpdate">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'

export default {
  name: 'TeacherSave',
  data() {
    return {
      tId: '',
      teacher: {},
      btnDisabled: false
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
      this.$router.push({ name: 'TeacherIndex' })
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
