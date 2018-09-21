// pages/fans/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fansData:[],
      page: 1,
      totalPage: 1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '粉丝'
    })
  },
  initFans(){
    var self = this
    wx.request({
      url: URL.getMyFansList,
      data:{
        user_id: app.globalData.userInfo.id,
        token: app.globalData.userInfo.token,
        page: self.data.page
      },
      success(res){
        console.log(res.data.data)
        self.setData({
          fansData: self.data.fansData.concat(res.data.data.info),
          totalPage: res.data.data.totalPage
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },

  onShow: function () {
    this.initFans()
  },
  attentionFunc(e){
    var self = this
    var _event = e.currentTarget.dataset
    wx.request({
      url: URL.setUserAttention,
      data: {
        id: app.globalData.userInfo.id,
        pid: _event.pid
      },
      success(res){
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
        var _obj = self.data.fansData
        if (res.data.info.includes('关注成功')){
          _obj[_event.index].is_mutual = 1
        }else{
          _obj[_event.index].is_mutual = 0
        }
        
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
      fansData: []
    })
    this.initFans()
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
      this.initFans()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
})