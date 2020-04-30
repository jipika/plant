// pages/my/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isProup: false
  },

  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    wx.navigateTo({
      url: dataset.url
    })
  },
  Invitation() {
    this.setData({
      isProup: !this.data.isProup
    })
  },
  aboutUs() {
    wx.navigateTo({ url: '../aboutOurs/aboutOurs' });
  },
  feedback() {
    wx.navigateTo({ url: '../feedback/feedback' });
  },
  helpCenter() {
    wx.navigateTo({ url: '../Help/help' });
  },
  Mycollected() {
    wx.navigateTo({ url: '../xieyi/xieyi' });
  },
  myTeam() {
    wx.navigateTo({ url: '../team/team' });
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
