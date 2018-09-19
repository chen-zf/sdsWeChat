// pages/hotlists/index.js
const URL = require('../../config.js')
import tempObj from '../../template/template'
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
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的视频'
    })
  },
  initMyVideo(){
    var self = this
    wx.request({
      url: URL.getMyVideo,
      data: {
        user_id: app.globalData.userInfo.id,
        page: self.data.page
      }
    })
  },
  initHotlistsData() {
    var self = this
    wx.request({
      url: URL.getMyVideo,
      data: {
        user_id: app.globalData.userInfo.id,
        page: this.data.page
      },
      success(res) {
        var _data = res.data.data
        self.setData({
          listData: self.data.listData.concat(_data.info),
          totalPage: _data.totalPage

        })
        wx.hideNavigationBarLoading() //完成停止加载
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
    this.initHotlistsData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  delMyVideoFunc(e){
    var self = this
    wx.showModal({
      // title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: URL.delMyVideo,
            data: {
              did: e.currentTarget.dataset.id
            },
            success(res) {
              wx.showToast({
                title: res.data.info,
              })
              self.setData({
                listData:[]
              })
              self.initHotlistsData()
            }
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
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
  onReachBottom: function () {
    console.log(" 下拉刷新" + this.data.totalPage)
    var page = ++this.data.page
    console.log(this.data.page)
    if (this.data.page <= this.data.totalPage) {
      this.initHotlistsData()
      this.setData({
        page: page
      })
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
  onShareAppMessage: function () {

  }
})