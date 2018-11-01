// pages/addbankcard/index.js
const app = getApp()
const bankCardAttribution = require('../../utils/bankCardAttribution.js')
const URL = require('../../config.js')
const jsanntq = require('../../utils/annt.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDefault:false,
    ibankcard: '',
    bankName:'',
    userName: "",
    tel: "",
    bank_code: '',
  },
  binduserName(e){
    this.setData({
      userName: e.detail.value
    })
  },
  blurBankCard(e){
    var _cardNumber = e.detail.value
    if (_cardNumber > 1e15) {
      var _data = bankCardAttribution(_cardNumber);
      this.setData({
        ibankcard: _cardNumber,
        bankName: _data.bankName,
        bank_code: _data.bankCode
      })
    }
  },
  bindbankName(e){
    this.setData({
      bankName: e.detail.value
    })
  },
  bindMobilePhoneInput(e){
    this.setData({
      tel: e.detail.value
    })
  },
  addbankcardFunc(){
    var self = this
    if (
      jsanntq.checkUserName(self.data.userName) ||
      jsanntq.checkBankCard(self.data.ibankcard) ||
      jsanntq.checkBankName(self.data.bankName) ||
      jsanntq.checkTel(self.data.tel)
    ) {
      return;
    }
    var isDefault = self.data.isDefault ? 1 : 0;
    wx.request({
      url: URL.setAddCard,
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        if_default: isDefault,
        member_id: app.globalData.userInfo.id,
        bank_name: self.data.bankName,
        bank_account: self.data.ibankcard,
        user_name: self.data.userName,
        phone: self.data.tel,
        bank_child: self.data.bank_code
      },
      success(res) {
        var _data = res.data
        if (_data.error == 0) {
          self.setData({
            isDefault: false,
            ibankcard: '',
            bankName: '',
            userName: "",
            tel: "",
            bank_code: '',
          })
          wx.navigateTo({
            url: '/pages/mybankcard/index'
          })
        } else {
          wx.showToast({
            title: _data.info,
            icon: 'none'
          })
        }
      }
    })
  },
  switchChange: function (e) {
    this.setData({
      isDefault: e.detail.value
    })
    console.log(this.data.isDefault)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

})