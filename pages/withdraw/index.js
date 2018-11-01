// pages/withdraw/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardId: '',
    selectBankCard: '',
    handling: 0.06,
    isTodayOne: 0,
    userData: {},
    txExplain: [],
    theFinalAmount: 0
  },
  bankAccountFilter(val) {
    if (val) {
      var _valArr = ("" + val).split("-");
      return  "("+_valArr[_valArr.length - 1]+")";
    }
  },
  initData() {
    var self = this
    wx.request({
      url: URL.getMyWallet,
      method: 'get',
      data: {
        user_id: app.globalData.userInfo.id
      },
      success(res) {
        if (res.data.error == 0) {
          var _data = res.data.data.card
          var selectBankCard = ''
          for (let i = 0, len = _data.length; i < len; i++) {
            if (_data[i].id == self.data.cardId ){
              selectBankCard = _data[i].bank_name + self.bankAccountFilter(_data[i].bank_account)
            }
            _data[i].bank_account = self.bankAccountFilter(_data[i].bank_account)
          }
          self.setData({
            userData: res.data.data.user,
            selectBankCard: selectBankCard,
            handling: res.data.data.handling,
            isTodayOne: res.data.data.yi,
            txExplain: res.data.data.description
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options){
      this.setData({
        cardId: options.card_id || 0
      })
    }
    
    wx.setNavigationBarTitle({
      title: '提现',
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
  onShow: function (options) {
    this.initData()
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
  theFinalAmountHandle(withdrawMoney) {
    if (withdrawMoney == "" || withdrawMoney < 0) {
      withdrawMoney = 0;
    } else {
      withdrawMoney = (withdrawMoney * ((1 - this.data.handling/100) * 1000000)) / 1000000;
    }
    return Math.floor(withdrawMoney * 100) / 100;
  },
  theFinalAmountFun(e){
    var theFinalAmount = this.theFinalAmountHandle(e.detail.value)
    this.setData({
      withdrawMoney: e.detail.value,
      theFinalAmount: theFinalAmount
    })
  },
  mySubmitFunc() {
    var self = this
    var txRmb = self.data.withdrawMoney - 0
    if (txRmb < 10 || txRmb > 5000) {
      wx.showToast({
        title: '每笔最低提现50，最高5000',
        icon: 'none'
      })
      return
    }
    if (txRmb > self.data.userData.ke) {
      wx.showToast({
        title: '可提现金额不足',
        icon: 'none'
      })
      return
    }
    if (self.data.isTodayOne) {
      wx.showToast({
        title: '您今天已经提现过一次了，每日只能提现一次！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: URL.postMyWithdraw,
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        user_id: app.globalData.userInfo.id,
        token: app.globalData.userInfo.token,
        money: txRmb,
        bank_id: self.data.cardId,
        actual_money: self.data.theFinalAmount
      },
      success(res){
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
      }
    })
  },
})