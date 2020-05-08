// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    imgPath: '',
    activeName: 0,
    imgDetail: '',
    imgDetail1: '',
    imgDetail2: '',
    imgDetail3: '',
    show: true,
    pid: '',
    pid1: '',
    pid2: '',
    pid3: ''
  },
  goDetail() {
    var pid = this.data.pid
    wx.navigateTo({
      url: `../detailPant/detailPant?pid=${pid}`,
      success: (result) => {
        console.log(result)
      }
    })
  },
  onChange(e) {
    console.log(e.detail)
    this.setData({
      activeName: e.detail
    })

    if (e.detail == 0) {
      this.setData({
        imgDetail: this.data.imgDetail1,
        pid: this.data.pid1
      })
    }
    if (e.detail == 1) {
      this.setData({
        imgDetail: this.data.imgDetail2,
        pid: this.data.pid2
      })
    }
    if (e.detail == 2) {
      this.setData({
        imgDetail: this.data.imgDetail3,
        pid: this.data.pid3
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      var that = this
      const detail = getApp().globalData.detail
      const imgPath = getApp().globalData.imgPath
      console.log(detail)
      if (detail.length == 1) {
        that.setData({
          show: false
        })
      }
      this.setData({
        detail,
        imgPath
      })
      console.log(detail)

      var name = detail[0].name
      var name1 = detail[1].name
      var name2 = detail[2].name

      // 图片1
      wx.request({
        url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=shibie&app=10000&name=${name}`,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data.msg)
          that.setData({
            imgDetail: res.data.msg[0].image,
            imgDetail1: res.data.msg[0].image,
            pid: res.data.msg[0].pid,

            pid1: res.data.msg[0].pid,
            show: false
          })
          if (res.data.code == 200) {
          } else {
            wx.showToast({
              title: `没有该植物的信息哦~`,
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
      // 图片2
      wx.request({
        url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=shibie&app=10000&name=${name1}`,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          that.setData({
            imgDetail2: res.data.msg[0].image,

            pid2: res.data.msg[0].pid,
            show: false
          })
          if (res.data.code == 200) {
          } else {
            wx.showToast({
              title: `没有该植物的信息哦~`,
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
      // 图片3
      wx.request({
        url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=shibie&app=10000&name=${name2}`,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          that.setData({
            imgDetail3: res.data.msg[0].image,
            pid3: res.data.msg[0].pid,
            show: false
          })
          if (res.data.code == 200) {
          } else {
            wx.showToast({
              title: `没有该植物的信息哦~`,
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
    }, 1000)
  },

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
