// pages/detailPant/detailPant.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getList: '',
    height: '',
    pid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    const getList = getApp().globalData.detailPant
    console.log(getList)

    this.setData({
      getList
    })
  },

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
