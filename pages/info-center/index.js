const app = getApp()
const URL = require('../../config.js')
import tempObj from '../../template/template' // 引入模板对象
Page({
  data: {
    tabbarData: {
      navActive: [0, 0, 0, 1, 0]
    },
    announcementcontent: '',
    recommendcontent: '',
    assistantcontent: '',
    announcement:{},
    recommend:{},
    assistant:{},
    attention: 0,
    comment: 0,
    praise: 0,
    thank: 0,

  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc, // 调用模板方法
  subStrFunc(data){
    if (data &&data.content.length>12){
      return data.content.substr(0, 12) + "..."
    } else if (data && data.content.length <= 12){
      return data.content
    }else{
      return ''
    }
  },
  onShow() {
    var self = this
    wx.request({
      url: URL.getMyInfoCenter,
      data: {
        user_id: app.globalData.userInfo.id,
        token: app.globalData.userInfo.token
      },
      success(res) {
        var _data = res.data.data
        console.log(_data)
        self.setData({
          attention: _data.attention,
          comment: _data.comment,
          praise: _data.praise,
          thank: _data.thank,
          announcement: _data.announcement,
          recommend: _data.recommend,
          assistant: _data.assistant,
          announcementcontent: self.subStrFunc(_data.announcement),
          recommendcontent: self.subStrFunc(_data.recommend),
          assistantcontent: self.subStrFunc(_data.assistant),
        })
      }
    })
  }
})