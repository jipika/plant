//app.js
App({
  onLaunch: function () {
    let that = this
    let systemInfo = wx.getSystemInfoSync()
    let rect = wx.getMenuButtonBoundingClientRect
      ? wx.getMenuButtonBoundingClientRect()
      : null //胶囊按钮位置信息
    wx.getMenuButtonBoundingClientRect()

    this.globalData.rect = rect.top

    // 登录
    wx.login({
      timeout: 10000,
      success: (res) => {
        console.log(res)
        wx.request({
          url: `http://qingchun.hongquelin.com/zhinenghuajiang/test.php`,
          data: { code: res.code },
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            console.log(res)
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('session_key', res.data.session_key)
          }
        })
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
