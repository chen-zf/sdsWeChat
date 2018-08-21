const app = getApp()
import tempObj from '../../template/template'
Page({
  data: {
    tabbarData: {
      navActive: [0, 1, 0, 0, 0]
    },
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关注'
    })
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc
})