// pages/switch/switch.js
import tool from '../../utils/tool'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    timer: null,
    searchData: '',
    searchResultDatas: '',
    pantTop: '',
    iot: '',
    inputIot: ''
  },
  onChange: tool.debounce(function (e) {
    console.log(e[0].detail)
    let value = e[0].detail
    var that = this
    this.setData({
      value
    })
    if (value.length == 0) {
      this.setData({
        searchResultDatas: []
      })
      return
    }

    wx.request({
      url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=huacao&app=10000&name=%${this.data.value}%`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        var searchData = res.data.msg.map((item) => {
          return {
            key: that.data.value,
            name: item.name,
            image: item.image,
            xuem: item.xueming
          }
        })
        console.log(searchData)
        console.log(res.data.msg)

        that.setData({
          searchData,
          searchResultDatas: res.data.msg
        })
      }
    })
  }),
  chooseSearchResultAction(e) {
    console.log(e.currentTarget.dataset.id)
    var iot = this.data.iot
    console.log(iot)
    var inputIot = this.data.inputIot
    var that = this
    if (iot) {
      wx.navigateTo({
        url: `../switchDetail/switchDetail?pid=${e.currentTarget.dataset.id}&iot=${iot}`,
        success: (res) => {
          console.log(res)
        }
      })
    } else {
      wx.navigateTo({
        url: `../switchDetail/switchDetail?pid=${e.currentTarget.dataset.id}&inputIot=${inputIot}`,
        success: (res) => {
          console.log(res)
        }
      })
    }
  },
  gotoDetail() {
    wx.switchTab({
      url: '/pages/discern/discern',
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.iot)
    this.setData({
      iot: options.iot,
      inputIot: options.inputIot
    })

    var that = this
    wx.request({
      url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=renqi&app=10000`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        that.setData({
          pantTop: res.data.msg
        })
      }
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
