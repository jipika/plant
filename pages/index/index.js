//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slideButtons: '',
    token: '5a219217b508118ce2f9f809ff09cde5',
    equipment: ''
  },
  // 事件处理函数
  goSurvey: function (e) {
    console.log(e)
    var iot = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/survey/survey?iot=${iot}`
    })
  },
  onLoad: function () {
    var that = this
    console.log(this.data.token)

    this.setData({
      slideButtons: [
        {
          src: '/pages/image/aixin.svg'
        },
        {
          src: '/pages/image/shoucang.svg'
        },
        {
          src: '/pages/image/shanchu.svg'
        }
      ]
    })
    wx.request({
      url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=geren_liebiao&app=10000&token=${that.data.token}`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        that.setData({
          equipment: res.data.msg
        })
      }
    })
  }
})
