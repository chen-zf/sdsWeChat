// pages/hotlists/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    page: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '精彩推荐'
    })
  },
  initHotlistsData() {
    var self = this
    wx.request({
      url: URL.getRecommend,
      data: {
        user_id: app.globalData.userInfo.id,
        page: this.data.page
      },
      success(res) {
        var _data = res.data.data
        self.setData({
          listData: self.data.listData.concat(_data.followList),
          totalPage: _data.totalPage
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.initHotlistsData()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      listData: []
    })
    this.initHotlistsData()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var page = ++this.data.page
    if (this.data.page <= this.data.totalPage) {
      this.setData({
        page: page
      })
      this.initHotlistsData()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})