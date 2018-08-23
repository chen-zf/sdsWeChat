// pages/redact/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexIndex:'',
    feelInex:'',
    redactDate:'2018-09-01',
    regionNow: ['广东省', '广州市', '海珠区'],
    regionHome: ['广东省', '梅州市', '丰顺县'],
    sexPicker:['男','女'],
    feelPicker:['单身','热恋','已婚','离异']
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