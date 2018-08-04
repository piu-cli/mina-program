/*
 * @Author: 罗圈圈
 * @Date: 2018-07-26 14:32:30
 * @Last Modified by:   罗圈圈
 * @Last Modified time: 2018-07-26 14:32:30
 */

import { env } from '../config'

// 环境前缀
const preFix = `Storage.${env}.`

export const SET = async obj => {
  if (typeof obj !== 'object') throw Error('the param must be a object')
  try {
    for (const key in obj) {
      await wx.setStorage({
        key: `${preFix}${key}`,
        data: obj[key]
      })
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
export const GET = key => wx.getStorageSync(`${preFix}${key}`)
export const REMOVE = key => wx.removeStorageSync(`${preFix}${key}`)
export const CLEAR = () => wx.clearStorageSync()
