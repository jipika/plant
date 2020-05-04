// pages/my/myinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: "../../images/txtx.png"
  },

  chooseHead() {  //上传头像
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        // console.log(res);

        wx.uploadFile({
          url: 'https://qingchun.hongquelin.com/zhinenghuajiang/api.php?act=upic&app=10000&token=adcf619f199ff6a9e2e7ba8209644101',//调用登录的token
          filePath: res.tempFilePaths[0],
          name: 'name',
          success: function (info) {
            console.log(info);
            that.setData({
              'myInfo.wx_avatarurl': res.tempFilePaths[0]
            });
          }
        })



        that.setData({
          headImg: res.tempFilePaths[0]
        })
      }
    })
  },
  pageTo({ currentTarget: { dataset } }) {
    // console.log(dataset);
    wx.navigateTo({
      url: dataset.url
    })
  },


})

