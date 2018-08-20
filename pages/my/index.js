const app = getApp()
import tempObj from '../../template/template'
Page({
    data:{
      tabbarData: {
        navActive: [0, 0, 0, 0, 1]
      },
    },
    onLoad:function(){
      wx.setNavigationBarTitle({
        title: ''
      })
    },
    tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc
})