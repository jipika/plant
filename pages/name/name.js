// pages/my/changeName/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  // 提交信息
  saveClick: function () {
    var that = this;
    if (that.data.name == "") {
  //    that.toast("昵称不能为空");
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }


    // 登录服务器接口 
    wx.request({
      url: 'http://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=alter_name&app=10000&name=' + that.data.name + '&token=9632e6785f453856cce3c223bb366e16',//调用全局登录的token
      data: {
      },
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data.msg);

        var jsonstr = JSON.stringify(res.data.msg)

        if (jsonstr.indexOf("修改成功") >= 0) {
          
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
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
  },
})
