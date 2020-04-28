// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: [
      { score: '80%', name: '常春藤' },
      { score: '7%', name: '洋常春藤' }
    ],
    imgPath: '',
    activeName: '',
    imgDetail: ''
  },
  onChange(e) {
    wx.request({
      url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=shibie&app=10000&name=${e.currentTarget.dataset.name}`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res.data.msg[0])
          this.setData({
            activeName: e.detail,
            imgDetail: res.data.msg[0]
          })
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const detail = getApp().globalData.detail
    const imgPath = getApp().globalData.imgPath
    console.log(detail)
    this.setData({
      detail,
      imgPath
    })
    console.log(this.data.detail)
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
