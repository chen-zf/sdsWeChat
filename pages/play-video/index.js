// pages/play-video/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsData:{},
    getPlayVideoData: [],
    isAttention: 0,
    selectTyp: 2,
    plData:[1,2,3,4,5,6]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getTheVideoDetails(options.did, options.pid,1)
    this.setData({
      optionsData: options
    })
  },

  getTheVideoDetails(did, pid, page) {
    var self = this
    wx.request({
      url: URL.getTheVideoDetails,
      data: {
        did: did,
        id: app.globalData.userInfo.id,
        page: page,
        pid: pid
      },
      success(res){
        console.log(res.data.data)
        self.setData({
          getPlayVideoData: res.data.data,
          isAttention: res.data.data.guanzhu
        })
      }
    })
  },
  followFunc(){
     var self = this
    console.log(self.data.optionsData)
      wx.request({
        url: URL.setUserAttention,
        data: {
          id: app.globalData.userInfo.id,
          pid: self.data.optionsData.pid
        },
        success(res){
          console.log(res.data.info)
          var isAttention = 0
          res.data.info&&res.data.info.indexOf("关注成功") > -1 ?isAttention = 1 : isAttention = 0
          self.setData({
            isAttention: isAttention
          })
        }
      })
  },  
  selectFunc(e){
    this.setData({
      selectTyp: e.currentTarget.dataset.typ
    })
  }
})