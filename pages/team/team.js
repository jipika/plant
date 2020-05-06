// pages/my/myinfo/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headImg: '',
    name: '',
    pic: '',
    user: ''
  },

  chooseHead() {
    //上传头像
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        // console.log(res);
        var token = wx.getStorageSync('token')

        wx.uploadFile({
          url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=upic&app=10000&token=${token}`, //调用登录的token
          filePath: res.tempFilePaths[0],
          name: 'name',
          success: function (info) {
            console.log(info)
            that.setData({
              'myInfo.wx_avatarurl': res.tempFilePaths[0]
            })
          }
        })

        that.setData({
          headImg: res.tempFilePaths[0]
        })
      }
    })
  },
  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    wx.navigateTo({
      url: dataset.url
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name: options.name,
      user: options.user,
      headImg: options.pic
    })
  }
})
