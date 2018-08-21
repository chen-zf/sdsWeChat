const app = getApp()
import tempObj from '../../template/template'   // 引入模板对象
Page({
  data: {
    tabbarData: {
      navActive: [0, 0, 0, 1, 0]
    },
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc   // 调用模板方法
})