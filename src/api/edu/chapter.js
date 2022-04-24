import request from '@/utils/request';

const apiName = '/edu/chapter'
export default {
  getChapterByCourseId(courseId) {
    return request({
      url: `${apiName}/findAll/${courseId}`,
      method: 'get'
    });
  },
  getChapterDetail(chapterId) {
    return request({
      url: `${apiName}/${chapterId}`,
      method: 'get'
    })
  },
  saveChapterInfo(chapterInfo) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: chapterInfo
    })
  },
  updateChapterInfo(chapterId, chapterInfo) {
    return request({
      url: `${apiName}/${chapterId}`,
      method: 'put',
      data: chapterInfo
    })
  },
  deleteChapterInfo(chapterId) {
    return request({
      url: `${apiName}/${chapterId}`,
      method: 'delete'
    })
  }
}
