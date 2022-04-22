<template>
  <div class="app-container">
    教师列表
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
      <el-button type="default" @click="resetSearchForm()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>
      <el-table-column label="序号" width="70" align="center" type="index"/>
      <el-table-column prop="name" label="名称" width="80"/>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历"/>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="sort" label="排序" width="60"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'

export default {
  name: "TeacherSaveOrUpdate",
  data() {
    return {
      listLoading: false,
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      searchObj: {}
    }
  },
  methods: {
    // 获取列表数据
    async getList(page = 1) {
      this.page = page
      const {limit, searchObj} = this
      this.listLoading = true;
      const {data} = await teacherApi.getList(this.page, limit, searchObj)
      this.list = data.records
      this.total = data.total
      this.listLoading = false
    },
    // 重置搜索表单
    resetSearchForm() {
      this.searchObj = {}
      this.getList()
    },
    // 根据 id 删除教师信息
    removeDataById({id, name}) {
      // 提示框
      this.$confirm(`此操作将删除${name}教师, 是否继续?`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await teacherApi.removeDataById(id)
        this.getList()
      })
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>

</style>
