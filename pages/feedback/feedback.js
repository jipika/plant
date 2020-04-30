// pages/my/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '',
    imgUrl: []
  },
  innerText(e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  submit() {
    wx.switchTab({ url: '../index/index' });
  },
  chooseImg(e) {
    let that = this
    wx.chooseImage({
      count: 3 - that.data.imgUrl.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths, '图片数组');
        let arr = that.data.imgUrl.concat(tempFilePaths)
        that.setData({
          imgUrl: arr
        })
      }
    })
  },
  del(e) {
    const currentIndex = e.currentTarget.dataset.index;
    var currentIcon = this.data.imgUrl.splice(currentIndex, 1)
    this.setData({
      imgUrl: this.data.imgUrl
    })

  },
  preview(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imgUrl[index], // 当前显示图片的http链接
      urls: this.data.imgUrl // 需要预览的图片http链接列表
    })
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