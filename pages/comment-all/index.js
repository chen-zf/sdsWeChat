// pages/comment-all/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsData: {},
    page: 1,
    totalPage: 1,
    indexData: {},
    commentData: [],
    sendVal: '',
    zanCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      optionsData: options
    })
  },
  getCommentData() {
    var self = this
    wx.request({
      url: URL.getPlDetails,
      data: {
        pid: self.data.optionsData.pid,
        page: self.data.page,
        heat: 1
      },
      success(res) {
        var _resData = res.data.data
        console.log(_resData)
        self.setData({
          commentData: self.data.commentData.concat(_resData.ping_in),
          totalPage: _resData.totalPage,
          indexData: _resData.index.index,
          zanCount: _resData.count
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCommentData()
  },
  // 获取输入值
  bindinputFunc(e) {
    this.setData({
      sendVal: e.detail.value
    })
  },
  // 发送评论
  sendplFunc() {
    var self = this
    var sendVal = self.data.sendVal
    if (sendVal.length < 1) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: URL.setUserComment,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        content: sendVal,
        id: app.globalData.userInfo.id,
        act_id: self.data.indexData.act_id, // uidt 被评论视频id
        pid: self.data.indexData.id, // uidt 被评论id
        npingre: self.data.indexData.pingre, // uidt 被评论人名字
        uidt: self.data.indexData.uid // uidt 被评论人id

      },
      success(res) {
        self.getCommentData()
        self.setData({
          sendVal: ''
        })
        wx.showToast({
          title: res.data.info,
          icon: 'none' 
        })
        self.getCommentData()
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
      listData: []
    })
    this.getCommentData()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = ++this.data.page
    if (this.data.page <= this.data.totalPage) {
      this.setData({
        page: page
      })
      this.getCommentData()
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