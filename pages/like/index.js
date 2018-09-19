// pages/like/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objA:{"a":1,"b":2},
    likeData: {},
    page: 1,
    totalPage: 1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '给我点赞'
    })
  },
  initLike(){
    var self = this
    wx.request({
      url: URL.getGiveLikeList,
      data: {
        user_id: 10009,
        page: self.data.page
      },
      success(res){
        self.setData({
          fansData: self.data.fansData.concat(res.data.data.info),
          totalPage: res.data.data.totalPage
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  finsDataHandle(data){
    //  for(){

    //  }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initLike()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      fansData: []
    })
    this.initLike()
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
      this.initLike()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
})