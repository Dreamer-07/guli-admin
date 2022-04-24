<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openAddVideo(chapter.id)">添加课时</el-button>
            <el-button style="" type="text" @click="openUpdateChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="deleteChapterInfo(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.videoSaveVos"
            :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text" @click="deleteVideoInfo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controlsposition="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controlsposition="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapterApi from '@/api/edu/chapter'
import videoApi from '@/api/edu/video'

export default {
  name: 'CourseChapter',
  data() {
    return {
      courseId: this.$route.params.courseId,
      chapter: {},
      dialogChapterFormVisible: false,
      saveBtnDisabled: false, // 保存按钮是否禁用
      chapterList: [],
      video: {
        free: false
      }, // 小节信息
      dialogVideoFormVisible: false, // 是否显示小节的弹出框
      saveVideoBtnDisabled: false // 是否禁用保存小节按钮
    }
  },
  mounted() {
    this.getChapterByCourseId()
  },
  methods: {
    previous() {
      this.$router.push({path: `/edu/course/info/${this.courseId}`})
    },
    next() {
      this.$router.push({path: `/edu/course/publish/${this.courseId}`})
    },
    // 根据 courseId 获取所有 chapter
    async getChapterByCourseId() {
      const {data} = await chapterApi.getChapterByCourseId(this.courseId);
      this.chapterList = data;
    },

    // 章节管理
    // 根据上下文环境 s/u chapter
    async saveOrUpdateChapter() {
      const hasId = this.chapter.id
      this.saveBtnDisabled = false;
      try {
        if (hasId) {
          await this.updateChapterInfo()
        } else {
          await this.saveChapterInfo()
        }
        this.$message.success(`${hasId ? '修改' : '添加'}成功`)
        await this.getChapterByCourseId()
      } finally {
        this.saveBtnDisabled = true
        this.dialogChapterFormVisible = false;
        this.chapter = {}
      }
    },
    // 保存 chapter
    async saveChapterInfo() {
      const {chapter, courseId} = this
      await chapterApi.saveChapterInfo({...chapter, courseId})
    },
    // 修改 chaoter
    async updateChapterInfo() {
      const {title, sort, id} = this.chapter
      await chapterApi.updateChapterInfo(id, {id, title, sort})
    },
    // 打开 updater chapter 的弹窗
    openUpdateChapter(chapterId) {
      this.chapter.id = chapterId
      this.dialogChapterFormVisible = true
      this.getChapterDetail()
    },
    // 获取 chapter detail 信息
    async getChapterDetail() {
      const {data} = await chapterApi.getChapterDetail(this.chapter.id)
      this.chapter = data
    },
    // 删除 chapter
    async deleteChapterInfo(chapterId) {
      try {
        await this.$confirm('确定删除该章节吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await chapterApi.deleteChapterInfo(chapterId)
        this.getChapterByCourseId()
      } catch (e) {

      }
    },

    // 小节管理
    // 打开添加小节的弹出框
    openAddVideo(chapterId) {
      this.video.chapterId = chapterId
      this.video.courseId = this.courseId
      this.dialogVideoFormVisible = true
    },
    // 保存或修改小节信息
    async saveOrUpdateVideo() {
      try {
        this.saveBtnDisabled = true
        const {vId} = this.video
        if (vId) {
          // TODO-修改
        } else {
          await this.saveVideoInfo()
        }
        this.$message.success(`${vId ? '修改' : '保存'}课时小节成功`)
        await this.getChapterByCourseId()
      } finally {
        this.dialogVideoFormVisible = false
        this.saveBtnDisabled = false
      }
    },
    // 保存小节信息
    async saveVideoInfo() {
      await videoApi.saveVideoInfo(this.video);
    },
    async deleteVideoInfo(videoId) {
      this.$confirm('确定删除该课时小节吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await videoApi.deleteVideoInfo(videoId)
        await this.getChapterByCourseId()
      })
    }
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
