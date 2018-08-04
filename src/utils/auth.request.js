/*
 * @Author: 罗圈圈
 * @Date: 2018-07-26 14:09:17
 * @Last Modified by: 罗圈圈
 * @Last Modified time: 2018-07-30 11:42:45
 */

import wepy from 'wepy'
import {
  baseUrl
} from '../config'
//  url 查询函数
const checkUrl = () => {
  throw new Error('url 不能为空')
}

export const request = ({
  url = checkUrl(),
  method = 'GET',
  header = wx.getStorageSync('Authorization'),
  data = {}
} = {}) => new Promise((resolve, reject) => {
  wx.request({
    url,
    method,
    header,
    data,
    success: resolve,
    fail: reject
  })
})

// 用户登陆
// 前端调用 wx.login
// 后端执行用户注册功能
export const logIn = async (canUpdate = false) => {
  const {
    code
  } = await wepy.login()
  try {
    const {
      token,
      needUpdate
    } = await request({
      method: 'PUT',
      data: {
        code,
        canUpdate
      }
    }, `${baseUrl}/user/login`)
    Set({
      token
    })
    return Promise.resolve({
      needUpdate
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

// 用户授权
// 前端调用用户授权弹窗
// 后端执行刷新用户信息
export const refreshUserInfo = async (option) => {
  let code
  const {
    iv,
    encryptedData
  } = option
  try {
    await wepy.checkSession()
  } catch (error) {
    code = await logIn()
  }
  try {
    await request({
      method: 'POST',
      data: {
        iv,
        encryptedData,
        code
      }
    }, `${baseUrl}/user`)
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
