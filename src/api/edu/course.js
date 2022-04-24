import request from '@/utils/request'

const apiName = '/edu/course'
export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: courseInfo
    });
  },
  getCourseInfo(courseId) {
    return request({
      url: `${apiName}/${courseId}`,
      method: 'get'
    });
  },
  getList(page, limit, searchObj) {
    return request({
      url: `${apiName}/findAll/${page}/${limit}`,
      method: 'post',
      data: searchObj
    });
  },
  updateCourseInfo(courseId, courseInfo) {
    return request({
      url: `${apiName}/${courseId}`,
      method: 'put',
      data: courseInfo
    })
  },
  getCoursePublishInfo(courseId) {
    return request({
      url: `${apiName}/publish-info/${courseId}`,
      method: 'get'
    });
  },
  updateCoursePublishInfo(courseId) {
    return request({
      url: `${apiName}/publish-info/normal/${courseId}`,
      method: 'put'
    });
  },
  deleteCourseInfo(courseId) {
    return request({
      url: `${apiName}/${courseId}`,
      method: 'delete'
    });
  }
}
