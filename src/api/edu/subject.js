import request from '@/utils/request'

const apiName = '/edu/subject'
export default {
  getAllInTree() {
    return request({
      url: `${apiName}/tree`,
      method: 'get'
    })
  }
}
