// pages/discern/discern.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  // 这里是一个自定义方法
  customMethod: function () {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success(res) {
        const app = getApp()
        app.globalData.imgPath = res.tempFilePaths[0]
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式

          success: (res) => {
            // 成功的回调获取到本地图片的base64编码
            var image = res.data
            // 发送百度api获取到token令牌
            wx.request({
              url:
                'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=DT4x3kljV3G61BxdvPKXqe0E&client_secret=MNnCEEZmd6wqdf6m4OXKp2PcBU3k6WZ6',
              data: {},
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              method: 'POST',
              dataType: 'json',
              success: (res) => {
                // 获取到令牌后在发送请求
                if (res.statusCode == 200) {
                  // 使用token令牌并携带图片参数
                  wx.request({
                    url: `https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=${res.data.access_token}`,
                    data: {
                      image,
                      baike_num: 5
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: (res) => {
                      console.log(res.data.result)
                      // 保存到全局变量中
                      res.data.result.forEach((item) => {
                        item.score = (item.score * 100).toFixed(2) + '%'
                      })

                      app.globalData.detail = res.data.result
                      wx.navigateTo({
                        url: `../detail/detail`,
                        success: (result) => {
                          console.log(result)
                        }
                      })
                    }
                  })
                } else {
                  wx.showToast({
                    title: `信息获取失败啦~`,
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {
                      console.log(result)
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
