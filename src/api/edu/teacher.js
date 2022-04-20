import request from '@/utils/request'

const apiName = '/edu/teacher'
export default {

  getList(page, limit, searchObj) {
    return request({
      url: `${apiName}/findAll/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  removeDataById(id) {
    return request({
      url: `${apiName}/${id}`,
      method: 'delete'
    })
  },
  saveTeacher(teacher) {
    return request({
      url: `${apiName}/add`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherDetail(id) {
    return request({
      url: `${apiName}/${id}`,
      method: 'get'
    })
  },
  editTeacher(id, teacher) {
    return request({
      url: `${apiName}/${id}`,
      method: 'put',
      data: teacher
    });
  }

}
