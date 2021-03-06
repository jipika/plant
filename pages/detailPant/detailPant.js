// pages/detailPant/detailPant.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getList: '',
    height: '',
    pid: '',
    show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      var options = this.data.options
      var that = this
      console.log(options.pid)
      if (options.pid) {
        wx.request({
          url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=zhiwuxiangqing&app=10000&pid=${options.pid}`,
          data: {},
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            console.log(res)
            that.setData({
              getList: res.data.msg[0]
            })
          }
        })
      }

      this.setData({
        show: false
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
  onHide: function () {
    this.setData({
      getList: null
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      getList: null
    })
  },

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
