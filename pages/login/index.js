// pages/login/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getAuthorizationFunc: function (e) {
    if (!e.detail.iv || !e.detail.encryptedData) {
      return
    }
    wx.request({
      url: URL.getAuthorization,
      data: {
        'code': app.globalData.code,
        'iv': e.detail.iv,
        'encryptedData': e.detail.encryptedData
      },
      success: function (res) {
        app.globalData.userInfo = res.data.data
        console.log(app)
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})