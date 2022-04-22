<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"
    />
    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import SubjectApi from '@/api/edu/subject'

export default {
  name: "SubjectIndex",
  data() {
    return {
      filterText: '',
      subjectList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    // 当输入框的值发生改变以后，调用 tree 组件的 filter() 方法过滤
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },
  methods: {
    async getSubjectList() {
      const {data} = await SubjectApi.getAllInTree();
      this.subjectList = data
    },
    /**
     * 过滤节点
     * @param value 输入的值
     * @param data  节点，可以通过 `label` 属性访问
     * @returns {boolean}
     */
    filterNode(value, data) {
      if (!value) return true
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  },
  mounted() {
    this.getSubjectList()
  }
}
</script>

<style scoped>

</style>
