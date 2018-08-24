// pages/reward-gift/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    gifts: [
      { img: '../../image/reward-gift/gift01@2x.png', price: 10, name: '鲜花' },
      { img: '../../image/reward-gift/gift02@2x.png', price: 20, name: '勺子' },
      { img: '../../image/reward-gift/gift03@2x.png', price: 30, name: '披萨' },
      { img: '../../image/reward-gift/gift04@2x.png', price: 50, name: '汉堡' },
      { img: '../../image/reward-gift/gift05@2x.png', price: 80, name: '咖啡' },
      { img: '../../image/reward-gift/gift06@2x.png', price: 100, name: '喜道茶' }
    ]
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