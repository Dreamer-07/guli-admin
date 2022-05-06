import request from '@/utils/request';

const apiName = "/sta/daily";

export default {
  createStatisticsDaily(day) {
    return request({
      url: `${apiName}/create/${day}`,
      method: 'post'
    })
  },
  getStatisticsDaily({dataType, beginDate, endDate}) {
    return request({
      url: `${apiName}/show/${dataType}/${beginDate}/${endDate}`,
      method: 'get'
    });
  }
}
