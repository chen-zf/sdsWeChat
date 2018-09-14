// pages/redact/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'../../image/my/header.png',
    sexIndex:'',
    feelInex:'',
    redactDate:'2018-09-01',
    regionNow: ['广东省', '广州市', '海珠区'],
    regionHome: ['广东省', '梅州市', '丰顺县'],
    sexPicker:['男','女'],
    feelPicker:['单身','热恋','已婚','离异']
  },
  setMyheadFunc(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        var imageSrc = res.tempFilePaths[0]
        that.setData({
          imageSrc: imageSrc
        })
        console.log("****************"+imageSrc)
        var uploadTask = wx.uploadFile({
          url: "http://upload.qiniup.com/?a=1&b=2",
          filePath: imageSrc,
          name: 'uploadfile_ant',
          formData: {
            'imgIndex': 1
          },
          header: {
            "Content-Type": "multipart/form-data"
          },  
          success(res){
            console.log(res)
            wx.showToast({
              title: '上传成功',
              icon:'success',
              duration: 1000
            })
          },
          fail({errMsg}){
            console.log(errMsg)
            wx.showToast({
              title: '上传失败',
              icon: 'fail',
              duration: 1000
            })
          }
        })
      },
    })  
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      redactDate: e.detail.value
    })
  },
  bindRegionNowChange: function (e) {
    this.setData({
      regionNow: e.detail.value
    })
  },
  bindRegionHomeChange: function (e) {
    this.setData({
      regionHome: e.detail.value
    })
  },
  bindPickerSexChange(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindPickerFeelChange(e) {
    this.setData({
      feelIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo()
  },
  // 获取用户数据
  initUserInfo(){
    var self = this
    console.log(app.globalData.userInfo)
    wx.request({
      url: URL.getUserInfo,
      data: {
        user_id: app.globalData.userInfo.id
      },
      success(res) {
        console.log(res)
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