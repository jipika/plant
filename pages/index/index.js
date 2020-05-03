//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slideButtons: '',
    token: '5a219217b508118ce2f9f809ff09cde5',
    equipment: '',
    show: false,
    inputValue: '',
    iot: '',
    loading: ''
  },
  // 事件处理函数
  goSurvey: function (e) {
    console.log(e)
    var iot = e.currentTarget.dataset.id
    var pid = e.currentTarget.dataset.pid
    console.log(pid)

    wx.navigateTo({
      url: `/pages/survey/survey?iot=${iot}&pid=${pid}`
    })
  },
  // 获得键盘内容
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  namePut() {
    var token = this.data.token
    var value = this.data.inputValue
    console.log(value)
    var that = this
    var iot = this.data.iot
    wx.request({
      url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=genggai_zhiwunicheng&iot=${iot}&name=${value}&token=${token}&app=10000`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '名称修改成功~',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (res) => {
            console.log(res)
            that.setData({
              show: false
            })
            that.getList()
          }
        })
      }
    })
  },
  // 拉起菜单
  onCancel() {
    this.setData({
      show: false
    })
    console.log(this.data.show)
  },
  slideButtonTap(e) {
    var that = this
    var token = this.data.token
    var iot = e.currentTarget.dataset.iot
    this.setData({
      iot
    })
    console.log(e.detail.index)

    if (e.detail.index == 0) {
      this.setData({
        show: true
      })
      console.log(this.data.show)
    }
    if (e.detail.index == 2) {
      wx.showModal({
        title: '确认删除',
        content: '确认删除此设备?',
        showCancel: true,
        confirmText: '取消',
        confirmColor: '#000000',
        cancelText: '确认',
        cancelColor: '#3CC51F',
        success: (res) => {
          if (res.cancel) {
            wx.request({
              url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=jiechu_shebei&app=10000&token=${token}&iot=${iot}`,
              data: {},
              header: { 'content-type': 'application/json' },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: (res) => {
                console.log(res)
                wx.showToast({
                  title: '删除设备成功',
                  icon: 'none',
                  image: '',
                  duration: 1500,
                  mask: false,
                  success: (res) => {
                    console.log(res)
                    that.getList()
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  onPullDownRefresh() {
    var that = this
    that.getList()
    this.setData({
      loading: true
    })
    console.log(1)
  },

  getList() {
    var that = this
    wx.request({
      url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=geren_liebiao&app=10000&token=${that.data.token}`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        wx.stopPullDownRefresh({
          success: (res) => {
            this.setData({
              loading: false
            })
          }
        })
        that.setData({
          equipment: res.data.msg
        })
      }
    })
  },
  onLoad: function () {
    console.log(this.data.token)
    app.globalData.token = this.data.token
    this.setData({
      slideButtons: [
        {
          src: '/pages/image/bianji.svg'
        },
        {
          src: '/pages/image/shezhi.svg'
        },
        {
          src: '/pages/image/shanchu.svg'
        }
      ]
    })
    this.getList()
  }
})
