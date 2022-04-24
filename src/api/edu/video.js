import request from '@/utils/request'

const apiName = '/edu/video'
export default {
  saveVideoInfo(videoInfo) {
    return request({
      url: `${apiName}/save`,
      method: 'post',
      data: videoInfo
    });
  },
  deleteVideoInfo(videoId) {
    return request({
      url: `${apiName}/${videoId}`,
      method: 'delete'
    });
  }
}
