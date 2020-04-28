// pages/detailPant/detailPant.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getList: '',
    height: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const getList = getApp().globalData.detailPant
    console.log(getList)
    var that = this
    this.setData({
      getList
    })
    let query = wx.createSelectorQuery()
    var a = query
      .selectAll('#ht')
      .boundingClientRect(function (rect) {
        return rect.height
        console.log(rect.height)
      })
      .exec()
    console.log(a)
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
