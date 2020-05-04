// pages/survey/survey.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animationMain: null, //正面
    animationMain1: null, //正面
    animationMain2: null, //正面
    animationMain3: null, //正面
    animationMain4: null, //正面
    animationBack: null, //背面
    animationBack1: null, //背面
    animationBack2: null, //背面
    animationBack3: null, //背面
    animationBack4: null, //背面
    surveyList: '',
    detail: '',
    num: 0
  },
  // 反转动画
  rotateFn(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step()
      this.animation_back.rotateX(0).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export()
      })
    }
    // 点击背面
    else if (id == 2) {
      this.animation_main.rotateX(0).step()
      this.animation_back.rotateX(-180).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export()
      })
    }
  },
  // 反转动画
  rotateFn1(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step()
      this.animation_back.rotateX(0).step()
      this.setData({
        animationMain1: this.animation_main.export(),
        animationBack1: this.animation_back.export()
      })
    }
    // 点击背面
    else if (id == 2) {
      this.animation_main.rotateX(0).step()
      this.animation_back.rotateX(-180).step()
      this.setData({
        animationMain1: this.animation_main.export(),
        animationBack1: this.animation_back.export()
      })
    }
  },
  // 反转动画
  rotateFn2(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step()
      this.animation_back.rotateX(0).step()
      this.setData({
        animationMain2: this.animation_main.export(),
        animationBack2: this.animation_back.export()
      })
    }
    // 点击背面
    else if (id == 2) {
      this.animation_main.rotateX(0).step()
      this.animation_back.rotateX(-180).step()
      this.setData({
        animationMain2: this.animation_main.export(),
        animationBack2: this.animation_back.export()
      })
    }
  },
  // 反转动画
  rotateFn3(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step()
      this.animation_back.rotateX(0).step()
      this.setData({
        animationMain3: this.animation_main.export(),
        animationBack3: this.animation_back.export()
      })
    }
    // 点击背面
    else if (id == 2) {
      this.animation_main.rotateX(0).step()
      this.animation_back.rotateX(-180).step()
      this.setData({
        animationMain3: this.animation_main.export(),
        animationBack3: this.animation_back.export()
      })
    }
  },
  // 反转动画
  rotateFn4(e) {
    var id = e.currentTarget.dataset.id
    this.animation_main = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    })
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step()
      this.animation_back.rotateX(0).step()
      this.setData({
        animationMain4: this.animation_main.export(),
        animationBack4: this.animation_back.export()
      })
    }
    // 点击背面
    else if (id == 2) {
      this.animation_main.rotateX(0).step()
      this.animation_back.rotateX(-180).step()
      this.setData({
        animationMain4: this.animation_main.export(),
        animationBack4: this.animation_back.export()
      })
    }
  },
  bindback() {
    console.log(1)
    this.setData({
      num: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    console.log(options.pid)
    console.log(options.uid)
    var iot = options.iot
    var pid = options.pid
    var uid = options.uid
    console.log(iot)

    // 个人设备植物详细
    wx.request({
      url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=zhiwuxiangqing&app=10000&pid=${pid}`,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        that.setData({
          detail: res.data.msg[0]
        })
      }
    })

    wx.request({
      url: `http://iot.hongquelin.com/service/page/node/sensor/list/special.json`,
      data: {
        scene_id: '2',
        node_data_type: '0',
        device_code: iot
      },
      header: {
        'content-type': 'application/json',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'USER-KEY': '426aad8a150a4d85a8fa7221085edca3'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data.data[0].iotSensorList)
        that.setData({
          surveyList: res.data.data[0].iotSensorList
        })
      }
    })
    updated()
    function updated() {
      wx.request({
        url: 'http://iot.hongquelin.com/service/sensor/param/down.json',
        data: { sdata: '1', id: uid },
        header: { 'content-type': 'application/json' },
        method: 'PUT',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
        }
      })

      wx.request({
        url: `https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=zhiwuxiangqing&app=10000&pid=${pid}`,
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res)
          that.setData({
            detail: res.data.msg[0]
          })
        }
      })

      wx.request({
        url: `http://iot.hongquelin.com/service/page/node/sensor/list/special.json`,
        data: {
          scene_id: '2',
          node_data_type: '0',
          device_code: iot
        },
        header: {
          'content-type': 'application/json',
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'USER-KEY': '426aad8a150a4d85a8fa7221085edca3'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data.data[0].iotSensorList)
          that.setData({
            surveyList: res.data.data[0].iotSensorList
          })
        }
      })

      clearTimeout(timer)
      var timer = setTimeout(() => {
        if (that.data.num == 0) {
          updated()
        }
      }, 5000)
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
