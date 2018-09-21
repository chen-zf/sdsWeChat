// pages/reward-gift/index.js
const URL = require('../../config.js')
const app = getApp()
Page({
  data: {
    activeIndex:0,
    optionsData: {},
    gifts: []
  },
  selectGift(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    console.log(this.data.activeIndex)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      optionsData: options
    })
  },
  onShow: function () {
    this.getGifData()
  },
  getGifData(){
    var self = this
    wx.request({
      url: URL.getGiftData,
      data: {
        type: 0
      },
      success(res){
        self.setData({
          gifts: res.data.data
        })
      }
    })
  },
  rewardGiftFunc(){
    var self = this
    wx.request({
      url: URL.getPayData,
      method:"POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        id: app.globalData.userInfo.id,
        pid: self.data.optionsData.pid,
        goods_amount: 0.01,
        did: self.data.optionsData.did,
        goods_id: self.data.gifts[self.data.activeIndex].id,
        goods_name: self.data.gifts[self.data.activeIndex].name,
        types: 0
      },
      success(res){
        var _data = res.data
        wx.requestPayment({
          timeStamp: '' + _data.timeStamp,
          nonceStr: _data.nonceStr,
          package: _data.package,
          signType: _data.signType,
          paySign: _data.paySign,
          success(res){
            console.log(res)
          }
        })
      }
    })
  }
})