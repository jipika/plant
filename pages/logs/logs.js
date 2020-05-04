var ptserviceUrl = getApp().globalData.ptserviceUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    code: '',
    newPassword: '',
    sendTime: '发送验证码',
    sendColor: '#363636',
    snsMsgWait: 60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  inputTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  inputNewpassword: function (e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  //判断微信是否注册,没注册显示注册界面。否则直接进入程序
  onShow: function () {
    //登录获取code

    wx.request({
      url:
        'http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=wx_login&app=10000&openid=1234', //获取微信openid唯一ID登录这里用测试的
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.msg)

        var jsonstr = JSON.stringify(res.data.msg)

        if (jsonstr.indexOf('token') >= 0) {
          //进入主程序
          console.log(res.data.msg.info.name) //从数据库读取获取到的微信名称
          console.log(res.data.msg.token) //用户token数据
          console.log(res.data.msg.info.pic) //用户头像地址
        } else {
          //进入注册界面
        }
      }
    })
  },

  // 获取验证码
  sendCode: function () {
    var that = this

    if (this.data.tel == '') {
      this.toast('请输入手机号')
      return
    }

    if (!/^1[3|4|5|8][0-9]\d{8}$/.test(this.data.tel)) {
      this.toast('手机号输入错误')
      return
    }

    // 60秒后重新获取验证码
    var inter = setInterval(
      function () {
        this.setData({
          smsFlag: true,
          sendColor: '#cccccc',
          sendTime: this.data.snsMsgWait + 's后重发',
          snsMsgWait: this.data.snsMsgWait - 1
        })
        if (this.data.snsMsgWait < 0) {
          clearInterval(inter)
          this.setData({
            sendColor: '#363636',
            sendTime: '发送验证码',
            snsMsgWait: 60,
            smsFlag: false
          })
        }
      }.bind(this),
      1000
    )

    // 获取验证码接口
    wx.request({
      url:
        'http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=yanzhengma&app=10000&phone=' +
        this.data.tel,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        //console.log(res);
        that.toast(res.data.msg)
      }
    })
  },

  // 提交信息
  saveClick: function () {
    var that = this
    if (that.data.tel == '') {
      that.toast('手机号不可为空')
      return
    }
    if (that.data.code == '') {
      that.toast('验证码不可为空')
      return
    }

    // 登录服务器接口
    wx.request({
      url:
        'http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=shouji_reg&app=10000&phone=' +
        this.data.tel +
        '&crc=' +
        this.data.code +
        '&openid=获取到的微信openid&name=获取到的微信昵称&images=微信头像地址',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data.msg)

        var jsonstr = JSON.stringify(res.data.msg)

        if (jsonstr.indexOf('token') >= 0) {
          console.log(res.data.msg.info.name) //从数据库读取获取到的微信名称
          console.log(res.data.msg.token) //用户token数据
          console.log(res.data.msg.info.pic) //用户头像地址

          that.toast('登录成功') //成功自动进入页面
        } else {
          that.toast(res.data.msg)
        }
      }
    })
  },

  // toast方法抽取
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },

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
