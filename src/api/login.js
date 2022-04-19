import request from '@/utils/request'

export function login(username, password) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        token: "1111"
      }
    })
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        roles: "admin",
        name: "admin",
        avatar: "https://img0.baidu.com/it/u=325674188,3280397254&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500"
      }
    })
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
