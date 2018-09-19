const URL = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    explainsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '餐匠助手'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this
    wx.request({
      url: URL.getAssistant,
      success(res) {
        console.log(res.data.data)
        self.setData({
          explainsData: res.data.data
        })
      }
    })
  },
})