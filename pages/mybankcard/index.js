// pages/mybankcard/index.js
const URL = require('../../config.js')
const app = getApp()
const jsanntq = require('../../utils/annt.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBankCard: [],
    defaultNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.initData()
    console.log(this.getBankIcon('ICBC'))
  },
  getBankIcon(val) {
    return jsanntq.getBankIconUrl(val);
  },
  bankAccountFilter(val) {
    if (val) {
      var _valArr = ("" + val).split("-");
      return ("************"+_valArr[_valArr.length - 1]);
    }
  },
  initData(){
    var self = this
    wx.request({
      url: URL.getMyWallet,
      method: 'get',
      data: {
        user_id: app.globalData.userInfo.id
      },
      success(res) {
        if(res.data.error == 0){
          var _data = res.data.data.card
          for(let i=0,len = _data.length; i<len; i++){
            _data[i].bank_icon = self.getBankIcon(_data[i].bank_child)
            _data[i].bank_account = self.bankAccountFilter(_data[i].bank_account)
          }
          self.setData({
            myBankCard: _data
          })
        }
      }
    })
  },
  delBankCardFunc(e) {
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var _data = e.currentTarget.dataset
          wx.request({
            url: URL.delBankCard,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              member_id: app.globalData.userInfo.id,
              bank_id: _data.id
            },
            success(res) {
                if(res.data.error == 0){
                  self.data.myBankCard.splice(_data.index, 1);
                  self.setData({
                    myBankCard: self.data.myBankCard
                  })
                }
                wx.showTabBar({
                  title: res.data.info,
                  icon: 'none'
                })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})