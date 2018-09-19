// pages/announcement/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcementData:[],
    page: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '餐匠公告'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAnnouncementFunc()
  },  
  initAnnouncementFunc(){
    var self = this
    wx.request({
      url: URL.getAnnouncement,
      data: {
        user_id: app.globalData.userInfo.id,
        page: self.data.page
      },
      success(res) {
        console.log(res.data.data)
        self.setData({
          announcementData: self.data.announcementData.concat(res.data.data.announcement),
          totalPage: res.data.data.totalPage,
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
      announcementData: []
    })
    this.initAnnouncementFunc()
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
      this.initAnnouncementFunc()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  }
})