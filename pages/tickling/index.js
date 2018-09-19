// pages/tickling/index.js
const app = getApp()
const URL = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textareaVal:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我要反馈',
    })
  },
  // 获取textarea值变化
  textareaFunc(e){
    this.setData({
      textareaVal: e.detail.value
    })
  },
  // 提交反馈事件
  myTicklingFunc(){
      var self = this
      // 判断反馈内容是否为空
      if (self.data.textareaVal.length<1){
        wx.showToast({
          title: '请输入反馈内容',
          icon: 'none'
        })
        return;
      }
      wx.request({
        url: URL.postMyTickling,
        data:{
          content: self.data.textareaVal,
          user_id: app.globalData.userInfo.id,
          token: app.globalData.userInfo.token,
        },
        success(res){
          self.setData({
            textareaVal: ''
          })
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          })

        }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.authorizationFunc()
  },
})