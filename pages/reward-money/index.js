// pages/reward-money/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    optionsData: {},
    rewardData:[10,20,30,40,50,60]
  },
  selectReward(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    console.log(this.data.activeIndex)
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      optionsData: options
    })
  },
  onShow: function () {
    this.getMoneyData()
  },
  getMoneyData() {
    var self = this
    wx.request({
      url: URL.getGiftData,
      data: {
        type: 1
      },
      success(res) {
        self.setData({
          rewardData: res.data.data
        })
      }
    })
  },
  rewardMoneytFunc() {
    var self = this
    wx.request({
      url: URL.getPayData,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        id: app.globalData.userInfo.id,
        pid: self.data.optionsData.pid,
        goods_amount: self.data.rewardData[self.data.activeIndex].money,
        did: self.data.optionsData.did,
        types: 1
      },
      success(res) {
        var _data = res.data
        wx.requestPayment({
          timeStamp: '' + _data.timeStamp,
          nonceStr: _data.nonceStr,
          package: _data.package,
          signType: _data.signType,
          paySign: _data.paySign,
          success(res) {
            console.log(res)
          }
        })
      }
    })
  }
})