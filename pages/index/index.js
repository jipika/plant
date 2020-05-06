//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slideButtons: '',
    equipment: '',
    show: false,
    inputIot: '',
    iot: '',
    loading: '',
    showTwo: false,
    loadProgress: 0
  },
  confirm: function () {
    this.setData({
      showTwo: false
    })
  },
  // 扫描添加设备
  scanning() {
    var that = this
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: (res) => {
        console.log(res)
        that.setData({
          inputIot: res.result
        })
        that.iotPut()
        console.log(this.data.inputIot)
      }
    })
  },
  // 添加设备
  clickAdd() {
    this.setData({
      showTwo: true
    })
  },
  iotPut() {
    this.setData({
      showTwo: false
    })

    var inputIot = this.data.inputIot
    console.log(inputIot)
    wx.request({
      url: `http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=iot_find
      &iot=${inputIot}&app=10000
      `,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.code == 200) {
          wx.navigateTo({
            url: `/pages/switch/switch?inputIot=${inputIot}`,
            success: (res) => {}
          })
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (res) => {
              console.log(res)
            }
          })
        }
      }
    })
  },
  // 事件处理函数
  goSurvey: function (e) {
    console.log(e)
    var iot = e.currentTarget.dataset.id
    var pid = e.currentTarget.dataset.pid
    var uid = e.currentTarget.dataset.uid
    var name = e.currentTarget.dataset.name
    var days = e.currentTarget.dataset.days
    console.log(pid)

    wx.navigateTo({
      url: `/pages/survey/survey?iot=${iot}&pid=${pid}&uid=${uid}&name=${name}&days=${days}`
    })
  },
  // 获得键盘内容
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 获得弹起键盘内容
  bindIotInput(e) {
    this.setData({
      inputIot: e.detail.value
    })
  },
  namePut() {
    var token = wx.getStorageSync('token')

    var value = this.data.inputValue
    console.log(value)
    var that = this
    var iot = this.data.iot
    wx.request({
      url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=genggai_zhiwunicheng&iot=${iot}&name=${value}&token=${token}&app=10000`,
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
      show: false,
      showTwo: false,
      inputIot: null
    })
    console.log(this.data.show)
  },
  slideButtonTap(e) {
    var that = this
    var token = wx.getStorageSync('koken')
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
    if (e.detail.index == 1) {
      wx.navigateTo({
        url: `/pages/switch/switch?iot=${iot}`,
        success: (res) => {
          console.log(res)
        }
      })
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
              url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=jiechu_shebei&app=10000&token=${token}&iot=${iot}`,
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
    var token = wx.getStorageSync('token')

    console.log('token', token)

    wx.request({
      url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=geren_liebiao&app=10000&token=${token}`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data)

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
      ],
      showTwo: false
    })
    this.getList()
  },
  onShow() {
    this.getList()
  },
  loadModal() {
    this.setData({
      loadModal: true
    })
    setTimeout(() => {
      this.setData({
        loadModal: false
      })
    }, 2000)
  }
})
