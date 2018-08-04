/*
 * @Author: 罗圈圈
 * @Date: 2018-07-30 10:25:40
 * @Last Modified by: 罗圈圈
 * @Last Modified time: 2018-08-05 01:12:35
 */

 /**
  * 弹窗组件封装类
  */
export const Tip = class {
  static isLoading = false;
  static pause = false;

  /**
   * 显示成功弹窗
   * @param {String} title 弹窗标题
   * @param {Number} duration 弹窗显示的时间
   */
  static success(title, duration = 500) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    })
  }

  /**
   * 用户确认提示弹窗 <===> web 端 window.confirm
   * @param {String} text 弹窗提示内容
   * @param {String} title 弹窗标题
   */
  static confirm(text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }

  /**
   * 提示窗口
   * @param {String} title toastTitle
   * @param {Function|null} onHide 弹窗隐藏时的回调函数
   * @param {String} icon icon 品种
   */
  static toast(title, onHide, icon = 'success') {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: 500
    })
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static alert(title) {
    wx.showToast({
      title: title,
      image: '/images/icons/alert.png',
      mask: true,
      duration: 500
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  static error(title, onHide) {
    wx.showToast({
      title: title,
      image: '/images/icons/error.png',
      mask: true,
      duration: 500
    })
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  /**
   * 弹出加载中弹窗
   * @param {String} title 加载中弹窗标题
   * @param {Boolean} force 是否为强制弹窗
   */
  static loading(title = '加载中', force = false) {
    if (this.isLoading && !force) {
      return
    }
    this.isLoading = true
    if (wx.showLoading) {
      wx.showLoading({
        title: title,
        mask: true
      })
    } else {
      wx.showNavigationBarLoading()
    }
  }
  /**
   * 加载中弹窗隐藏
   */
  static loaded() {
    if (this.isLoading) {
      this.isLoading = false
      if (wx.hideLoading) {
        wx.hideLoading()
      } else {
        wx.hideNavigationBarLoading()
      }
    }
  }

  /**
   * 弹出下拉动作栏
   */
  static action(...items) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: items,
        success: function(res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          }
          resolve(result)
        },
        fail: function(res) {
          reject(res.errMsg)
        }
      })
    })
  }

  /**
   * 弹出下拉动作栏，同时绑定回调函数
   */
  static actionWithFunc(items, ...functions) {
    wx.showActionSheet({
      itemList: items,
      success: function(res) {
        const index = res.tapIndex
        if (index >= 0 && index < functions.length) {
          functions[index]()
        }
      }
    })
  }

  /**
   * 设置为加载中状态
   */
  static setLoading() {
    this.isLoading = true
  }
}
