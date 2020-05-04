// pages/switchDetail/switchDetail.js
let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    getList: '',
    height: '',
    pid: '',
    iot: '',
    inputIot: ''
  },
  wancheng() {
    var pid = this.data.pid
    var iot = this.data.iot
    var inputIot = this.data.inputIot
    var image = this.data.getList.image
    var name = this.data.getList.name
    var token = app.globalData.token
    console.log(name)
    console.log(pid)

    if (iot) {
      wx.request({
        url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=qiehuan
        &pid=${pid}&iot=${iot}&image=${image}&app=10000&name=${name}
       `,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          wx.showToast({
            title: '修改成功哦~',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (res) => {
              console.log(res)
              wx.switchTab({
                url: '/pages/index/index',
                success: (res) => {
                  console.log(res)
                }
              })
            }
          })
        }
      })
    } else {
      wx.request({
        url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=tianjia_shebei
        &pid=${pid}&iot=${inputIot}&image=${image}&app=10000&name=${name}&token=${token}
       `,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          wx.showToast({
            title: '添加设备成功~',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (res) => {
              console.log(res)
              wx.switchTab({
                url: '/pages/index/index',
                success: (res) => {
                  console.log(res)
                }
              })
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.pid)
    console.log(options.iot)
    console.log(options.inputIot)
    this.setData({
      iot: options.iot,
      pid: options.pid,
      inputIot: options.inputIot
    })
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
