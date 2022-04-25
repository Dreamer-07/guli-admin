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
  },
  // 删除视频资源
  deleteVideoSource(videoSourceId) {
    return request({
      url: `/vdo/file/${videoSourceId}`,
      method: 'delete'
    });
  }
}
