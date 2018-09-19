// pages/comment/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentData: [],
    page: 1,
    totalPage: 1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '评论',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initComment()
  },
  initComment(){
    var self = this
    wx.request({
      url: URL.getMyComment,
      data:{
        user_id: app.globalData.userInfo.id,
        page:  self.data.page
      },
      success(res){
        self.setData({
          commentData: self.data.commentData.concat(res.data.data.comment),
          totalPage: res.data.data.totalPage
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      commentData: []
    })
    this.initComment()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = ++this.data.page
    if (this.data.page <= this.data.totalPage) {
      this.setData({
        page: page,
      })
      this.initComment()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
})