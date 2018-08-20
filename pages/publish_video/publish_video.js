// pages/publish_video/publish_video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioTypeItem:[
      { name: 'cooking', value: '厨艺', checked: 'true'},
      {name: 'food',value: '秀美食'},
      {name: 'equipment',value: '设备' },
      {name: 'brand',value: '品牌' },
    ],
    radioIntentItem:[
      { name: 'show', value:'秀一秀'},
      { name: 'work', value: '找工作' },
    ],
    radioEquipmentItem:[
      { name: 'show', value: '秀设备' },
      { name: 'sell', value: '卖设备' },
      { name: 'benefit', value: '专利让利' },
    ],
    radiobrandItem: [
      { name: 'show', value: '秀一秀' },
      { name: 'add', value: '招商加盟' },
    ],
    TypeStr:'food',
    starItem:[1,1,1,1,0]
  },
  radioChange:function(e){
    this.setData({
      TypeStr: e.detail.value
    })
  },
  starClickFunc:function(e){
    var index = e.currentTarget.dataset.index;
    var starArray = [0, 0, 0, 0, 0];
    for (var z = 0; z < starArray.length; z++) {
      if (z <= index) {
        starArray[z] = 1;
      }
    }
    this.setData({
      starItem: starArray
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