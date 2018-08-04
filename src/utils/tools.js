/*
 * @Author: 罗圈圈
 * @Date: 2018-07-26 14:04:44
 * @Last Modified by: 罗圈圈
 * @Last Modified time: 2018-08-01 16:15:38
 */

// 防抖
export const debounce = (fn, wait = 1e3) => {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      // 清除计时器记录
      timer = null
    }, wait)
  }
}

// 节流
export const throttle = (fn, wait = 1000) => {
  let last = null
  return function() {
    const now = Date.now()
    if (!last || now - last > wait) {
      fn.apply(this, arguments)
    }
    // 刷新上一次点击的时间
    last = now
  }
}

// 延迟函数
export const sleep = (wait = 1e3) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, wait)
})
