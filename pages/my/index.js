const app = getApp()
import tempObj from '../../template/template'
Page({
    data:{
      tabbarData: {
        userInfo:{},
        navActive: [0, 0, 0, 0, 1]
      },
    },
    onLoad:function(){
      console.log(app)
      this.setData({
        userInfo: app.globalData.userInfo
      })
      wx.setNavigationBarTitle({
        title: ''
      })
    },
    tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc
})