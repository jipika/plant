const app = getApp()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    titleText: {
      type: String,
      value: 'default value'
    },
    titleUp: {
      type: Boolean,
      value: true
    },
    titleBack: {
      type: Boolean,
      value: true
    }
  },
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    gap: getApp().globalData.gap,
    rect: getApp().globalData.rect
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
        }
      })
      console.log(this.data.statusBarHeight1)
    },
    comeBack: function () {
      wx.navigateBack()
    }
  }
})
