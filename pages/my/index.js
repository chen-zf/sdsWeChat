const app = getApp()
import tempObj from '../../template/template'
const URL = require('../../config.js')
Page({
    data:{
      tabbarData: {
        userInfo:{},
        navActive: [0, 0, 0, 0, 1]
      },
    },
    onLoad:function(){
      wx.setNavigationBarTitle({
        title: ''
      })
      var self = this
      wx.request({
        url: URL.getMyData,
        data:{
          id: app.globalData.userInfo.id,
          token: app.globalData.userInfo.token
        },
        success(res){
          console.log(res.data.data)
          self.setData({
            userInfo:res.data.data
          }) 
        }
      })
    },
    tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc
})