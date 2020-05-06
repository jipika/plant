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
  onShow: function () {},

  // 获取验证码
  sendCode: function () {
    var that = this

    if (this.data.tel == '') {
      wx.showToast({
        title: '请输入新手机号码',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (!/^1[3|4|5|8][0-9]\d{8}$/.test(this.data.tel)) {
      wx.showToast({
        title: '手机号码输入错误',
        icon: 'none',
        duration: 1500
      })
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
        'https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=yanzhengma&app=10000&type=seek&phone=' +
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
      wx.showToast({
        title: '手机号不可为空',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (that.data.code == '') {
      wx.showToast({
        title: '验证码不可为空',
        icon: 'none',
        duration: 1500
      })
      return
    }

    // 登录服务器接口
    wx.request({
      url:
        'http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=seek_phone&app=10000&newphone=' +
        this.data.tel +
        '&crc=' +
        this.data.code +
        '&token=adcf619f199ff6a9e2e7ba8209644101', //调用全局登录获取到的token这里只是测试的
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data.msg)

        var jsonstr = JSON.stringify(res.data.msg)

        if (jsonstr.indexOf('换绑手机成功') >= 0) {
          //换绑成功记得更新一下个人中心界面的手机号信息
          wx.showToast({
            title: '换绑成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.switchTab({
              url: `/pages/member/member`,
              success: (res) => {
                console.log(res)
              }
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  }
})
