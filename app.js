//app.js
App({
  onLaunch: function () {
    let that = this
    let systemInfo = wx.getSystemInfoSync()
    let rect = wx.getMenuButtonBoundingClientRect
      ? wx.getMenuButtonBoundingClientRect()
      : null //胶囊按钮位置信息
    wx.getMenuButtonBoundingClientRect()
    let navBarHeight = (function () {
      //导航栏高度
      let gap = rect.top - systemInfo.statusBarHeight //动态计算每台手机状态栏到胶囊按钮间距
      that.globalData.gap = gap
      return 2 * gap + rect.height
    })()
    this.globalData.rect = rect.top
    console.log(navBarHeight)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    gap: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    rect: null,
    detail: null,
    imgPath: null,
    detailPant: null,
    token: null
  }
})
